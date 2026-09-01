import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { generateGrade1Questions, generateGrade2Questions, generateGrade3Questions, generateGrade4Questions, generateGrade5Questions } from './data/math-generator.mjs'
import { generateEnglishQuestions } from './data/english-data.mjs'
import { generateChineseQuestions } from './data/chinese-data.mjs'

// 1. Manually parse .env.local if not present in process.env
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx !== -1) {
      const key = trimmed.substring(0, eqIdx).trim()
      const val = trimmed.substring(eqIdx + 1).trim()
      if (!process.env[key]) {
        process.env[key] = val
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Lỗi: Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
})

async function insertBatch(batch, label) {
  const { data, error } = await supabase.from('question_cache').insert(batch)
  if (error) {
    console.error(`\n⚠️ Lỗi khi nạp gói câu hỏi ${label}:`, error.message)
    return 0
  }
  return batch.length
}

async function seedAll() {
  const TARGET_PER_LEVEL = 2000
  console.log('🚀 Bắt đầu quá trình sinh và nạp 2.000 CÂU HỎI CHO MỖI CHỦ ĐỀ vào Supabase...')
  console.log(`🔗 Supabase URL: ${supabaseUrl}`)

  const allQuestions = []

  // 1. Tiếng Anh (7 levels x 2000 = 14,000 câu)
  const enLevels = ['starters', 'movers', 'flyers', 'a1', 'a2', 'b1', 'b2']
  console.log('\n📚 Đang tạo ngân hàng câu hỏi Tiếng Anh (2.000 câu/cấp độ)...')
  for (const lvl of enLevels) {
    const list = generateEnglishQuestions(lvl, TARGET_PER_LEVEL)
    for (const q of list) {
      allQuestions.push({
        language: 'en',
        level: lvl,
        question: q.question,
        option_left: q.option_left,
        option_right: q.option_right,
        correct_option: q.correct_option,
        explanation: q.explanation
      })
    }
    console.log(`   ✓ Tiếng Anh [${lvl.toUpperCase()}]: Tạo thành công ${list.length} câu`)
  }

  // 2. Tiếng Trung (8 levels x 2000 = 16,000 câu)
  const zhLevels = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'life', 'office', 'factory']
  console.log('\n🏮 Đang tạo ngân hàng câu hỏi Tiếng Trung (2.000 câu/cấp độ)...')
  for (const lvl of zhLevels) {
    const list = generateChineseQuestions(lvl, TARGET_PER_LEVEL)
    for (const q of list) {
      allQuestions.push({
        language: 'zh',
        level: lvl,
        question: q.question,
        option_left: q.option_left,
        option_right: q.option_right,
        correct_option: q.correct_option,
        explanation: q.explanation
      })
    }
    console.log(`   ✓ Tiếng Trung [${lvl.toUpperCase()}]: Tạo thành công ${list.length} câu`)
  }

  // 3. Toán học (5 levels x 2000 = 10,000 câu)
  console.log('\n🔢 Đang tạo ngân hàng câu hỏi Toán học (2.000 câu/lớp)...')
  const mathGenerators = [
    { lvl: 'grade1', name: 'Lớp 1', fn: generateGrade1Questions },
    { lvl: 'grade2', name: 'Lớp 2', fn: generateGrade2Questions },
    { lvl: 'grade3', name: 'Lớp 3', fn: generateGrade3Questions },
    { lvl: 'grade4', name: 'Lớp 4', fn: generateGrade4Questions },
    { lvl: 'grade5', name: 'Lớp 5', fn: generateGrade5Questions },
  ]

  for (const item of mathGenerators) {
    const list = item.fn(TARGET_PER_LEVEL)
    for (const q of list) {
      allQuestions.push({
        language: 'math',
        level: item.lvl,
        question: q.question,
        option_left: q.option_left,
        option_right: q.option_right,
        correct_option: q.correct_option,
        explanation: q.explanation
      })
    }
    console.log(`   ✓ Toán học [${item.name}]: Tạo thành công ${list.length} câu`)
  }

  console.log(`\n📦 TỔNG CỘNG ĐÃ SINH: ${allQuestions.length.toLocaleString('vi-VN')} CÂU HỎI (0 token tốn kém).`)
  console.log('⏳ Đang ghi vào Supabase database theo từng gói 500 câu...')

  const BATCH_SIZE = 500
  let insertedCount = 0
  const startTime = Date.now()

  for (let i = 0; i < allQuestions.length; i += BATCH_SIZE) {
    const chunk = allQuestions.slice(i, i + BATCH_SIZE)
    const successCount = await insertBatch(chunk, `Gói ${Math.floor(i / BATCH_SIZE) + 1}`)
    insertedCount += successCount
    const percent = ((insertedCount / allQuestions.length) * 100).toFixed(1)
    process.stdout.write(`\r   -> Tiến độ: ${insertedCount.toLocaleString('vi-VN')}/${allQuestions.length.toLocaleString('vi-VN')} câu (${percent}%)...`)
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n\n🎉 HOÀN THÀNH XUẤT SẮC TRONG ${durationSec} GIÂY!`)
  console.log(`✅ Đã nạp thành công tổng cộng ${insertedCount.toLocaleString('vi-VN')} câu hỏi vào bảng "question_cache" trên Supabase!`)
}

seedAll().catch(err => {
  console.error('❌ Lỗi thực thi:', err)
  process.exit(1)
})
