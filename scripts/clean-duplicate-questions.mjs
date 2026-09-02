import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Manually parse .env.local
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

try {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    for (const line of envContent.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let value = match[2] || ''
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
        if (!process.env[key]) process.env[key] = value
      }
    }
  }
} catch (e) {}

supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

async function cleanDuplicates() {
  console.log('🔍 Đang rà soát và lọc sạch các câu hỏi trùng lặp trên Supabase database...')

  const { data: questions, error } = await supabaseAdmin
    .from('question_cache')
    .select('id, language, level, question, option_left, option_right')

  if (error) {
    console.error('Lỗi đọc database:', error)
    return
  }

  console.log(`📊 Tổng số câu hỏi hiện có trong DB: ${questions.length.toLocaleString('vi-VN')} câu.`)

  const seenKeys = new Set()
  const duplicateIds = []

  for (const q of questions) {
    const normText = (q.question || '').trim().toLowerCase()
    const normLeft = (q.option_left || '').trim().toLowerCase()
    const normRight = (q.option_right || '').trim().toLowerCase()

    // Deduplication Key combining language, level, question text and option pair
    const key = `${q.language}_${q.level}_${normText}`

    if (seenKeys.has(key)) {
      duplicateIds.push(q.id)
    } else {
      seenKeys.add(key)
    }
  }

  console.log(`⚠️ Tìm thấy ${duplicateIds.length.toLocaleString('vi-VN')} câu hỏi bị trùng lặp trên DB.`)

  if (duplicateIds.length > 0) {
    console.log('🧹 Đang xóa các câu hỏi trùng lặp khỏi Supabase...')
    const batchSize = 500
    let deletedCount = 0

    for (let i = 0; i < duplicateIds.length; i += batchSize) {
      const batch = duplicateIds.slice(i, i + batchSize)
      const { error: delErr } = await supabaseAdmin
        .from('question_cache')
        .delete()
        .in('id', batch)

      if (delErr) {
        console.error('Lỗi xóa batch:', delErr)
      } else {
        deletedCount += batch.length
      }
    }
    console.log(`✅ Đã xóa sạch ${deletedCount.toLocaleString('vi-VN')} câu hỏi trùng lặp!`)
  } else {
    console.log('✨ Không tìm thấy câu hỏi trùng lặp nào trên database!')
  }
}

cleanDuplicates()
