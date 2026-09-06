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

async function auditAndPurgeInvalidQuestions() {
  console.log('🔍 Đang kiểm tra toàn bộ câu hỏi trên Supabase database...')

  let allQuestions = []
  let from = 0
  const limit = 1000
  let fetchMore = true

  while (fetchMore) {
    const { data, error } = await supabaseAdmin
      .from('question_cache')
      .select('id, language, level, question, option_left, option_right, correct_option')
      .range(from, from + limit - 1)

    if (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      break
    }

    if (data && data.length > 0) {
      allQuestions = allQuestions.concat(data)
      from += limit
      if (data.length < limit) fetchMore = false
    } else {
      fetchMore = false
    }
  }

  console.log(`📊 Tổng số câu hỏi kiểm tra: ${allQuestions.length.toLocaleString('vi-VN')} câu.`)

  const invalidIds = []

  for (const q of allQuestions) {
    const text = (q.question || '').trim()
    const optL = (q.option_left || '').trim()
    const optR = (q.option_right || '').trim()

    let isInvalid = false

    // 1. Check English questions
    if (q.language === 'en') {
      // Asking for Vietnamese meaning (e.g. "trong tiếng Việt có nghĩa là gì?", "Nghĩa của từ...")
      const isAskingVnMeaning = text.includes('tiếng Việt') || text.includes('Nghĩa của từ') || text.includes('nghĩa là gì')

      if (isAskingVnMeaning) {
        // Options MUST be in Vietnamese (should NOT look like ASCII English single words without spaces/accents)
        const optLIsEn = /^[A-Za-z\s_'-]+$/.test(optL) && !/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(optL)
        const optRIsEn = /^[A-Za-z\s_'-]+$/.test(optR) && !/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(optR)
        if (optLIsEn || optRIsEn || optL.includes('_color') || optR.includes('_color')) {
          isInvalid = true
        }
      }

      if (optL.includes('_color') || optR.includes('_color')) {
        isInvalid = true
      }
    }

    // 2. Check Chinese questions
    if (q.language === 'zh') {
      const isAskingVnMeaning = text.includes('tiếng Việt') || text.includes('nghĩa là gì')
      if (isAskingVnMeaning) {
        // Options should be Vietnamese, if they contain Pinyin or Hanzi it's invalid
        const hasHanziOrPinyin = /[\u4e00-\u9fa5]|\(.*\)/.test(optL) || /[\u4e00-\u9fa5]|\(.*\)/.test(optR)
        if (hasHanziOrPinyin) {
          isInvalid = true
        }
      }
    }

    if (isInvalid) {
      invalidIds.push(q.id)
    }
  }

  console.log(`⚠️ Phát hiện ${invalidIds.length.toLocaleString('vi-VN')} câu hỏi lỗi / không đạt chất lượng.`)

  if (invalidIds.length > 0) {
    console.log('🧹 Đang xóa các câu hỏi lỗi khỏi Supabase...')
    const batchSize = 500
    let deletedCount = 0

    for (let i = 0; i < invalidIds.length; i += batchSize) {
      const batch = invalidIds.slice(i, i + batchSize)
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
    console.log(`✅ Đã loại bỏ sạch ${deletedCount.toLocaleString('vi-VN')} câu hỏi lỗi!`)
  } else {
    console.log('✨ Tất cả câu hỏi trên database đều đạt chuẩn chất lượng!')
  }
}

auditAndPurgeInvalidQuestions()
