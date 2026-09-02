import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Parse .env.local manually
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

async function auditDatabase() {
  console.log('🔍 Đang kiểm tra và lọc sạch các câu hỏi ngớ ngẩn trên Supabase database...')

  let totalScanned = 0
  let totalDeleted = 0

  const { data: questions, error } = await supabaseAdmin
    .from('question_cache')
    .select('id, question, option_left, option_right')

  if (error) {
    console.error('Lỗi đọc database:', error)
    return
  }

  totalScanned = questions.length
  console.log(`📊 Tổng số câu hỏi hiện có trên DB: ${totalScanned.toLocaleString('vi-VN')} câu.`)

  const badIds = []

  for (const q of questions) {
    const left = (q.option_left || '').trim().toLowerCase()
    const right = (q.option_right || '').trim().toLowerCase()
    const text = (q.question || '').trim()

    // Rule 1: Duplicate options (option_left === option_right)
    if (left === right) {
      badIds.push(q.id)
      continue
    }

    // Rule 2: Empty or broken options
    if (!left || !right || !text) {
      badIds.push(q.id)
      continue
    }

    // Rule 3: Nonsensical length or placeholder text
    if (text.includes('undefined') || text.includes('null') || left === 'null' || right === 'null') {
      badIds.push(q.id)
      continue
    }
  }

  console.log(`⚠️ Tìm thấy ${badIds.length.toLocaleString('vi-VN')} câu hỏi lỗi / trùng lặp / ngớ ngẩn.`)

  if (badIds.length > 0) {
    console.log('🧹 Đang xóa các câu hỏi lỗi khỏi database...')
    const batchSize = 500
    for (let i = 0; i < badIds.length; i += batchSize) {
      const batch = badIds.slice(i, i + batchSize)
      const { error: delErr } = await supabaseAdmin
        .from('question_cache')
        .delete()
        .in('id', batch)

      if (delErr) {
        console.error('Lỗi khi xóa batch:', delErr)
      } else {
        totalDeleted += batch.length
      }
    }
  }

  console.log(`\n🎉 HOÀN THÀNH AUDIT DATABASE!`)
  console.log(`✅ Đã rà soát ${totalScanned.toLocaleString('vi-VN')} câu hỏi.`)
  console.log(`🗑️ Đã xóa sạch ${totalDeleted.toLocaleString('vi-VN')} câu hỏi lỗi / ngớ ngẩn.`)
}

auditDatabase()
