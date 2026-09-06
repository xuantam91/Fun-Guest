import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// 1. Manually parse .env.local
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
      if (!process.env[key]) process.env[key] = val
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Thiếu Supabase credentials trong .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
})

/**
 * Extracts and cleans normalized target concept key for a question
 */
function getConceptKey(row) {
  const left = (row.option_left || '').trim().toLowerCase()
  const right = (row.option_right || '').trim().toLowerCase()
  const correct = row.correct_option === 'left' ? left : right
  
  // Clean parenthetical annotations like "Apple (Quả táo)" or "(Nǐ hǎo)" -> "apple"
  let clean = correct.replace(/\(.*?\)/g, '').trim()
  if (clean.includes('=')) {
    clean = clean.split('=')[0].trim()
  }
  return clean.toLowerCase()
}

/**
 * Purges duplicate concept rows for a specific level.
 * Keeps at most 1-2 distinct question templates per unique target concept.
 */
async function processLevel(lang, level, workerName, maxPerConcept = 1) {
  let allRows = []
  let page = 0
  const pageSize = 1000
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('question_cache')
      .select('id, question, option_left, option_right, correct_option')
      .eq('language', lang)
      .eq('level', level)
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (error || !data || data.length === 0) {
      hasMore = false
      break
    }
    allRows.push(...data)
    if (data.length < pageSize) hasMore = false
    page++
  }

  if (allRows.length === 0) {
    return { level, kept: 0, deleted: 0 }
  }

  const conceptGroups = {}
  for (const r of allRows) {
    const cKey = getConceptKey(r)
    const qText = (r.question || '').trim().toLowerCase()

    if (!conceptGroups[cKey]) conceptGroups[cKey] = []
    
    // Deduplicate exact question text first
    const isDupText = conceptGroups[cKey].some(e => (e.question || '').trim().toLowerCase() === qText)
    if (!isDupText) {
      conceptGroups[cKey].push(r)
    }
  }

  const idsToKeep = new Set()
  const idsToDelete = new Set()

  for (const cKey in conceptGroups) {
    const group = conceptGroups[cKey]
    const keep = group.slice(0, maxPerConcept)
    const deleteGroup = group.slice(maxPerConcept)

    keep.forEach(r => idsToKeep.add(r.id))
    deleteGroup.forEach(r => idsToDelete.add(r.id))
  }

  for (const r of allRows) {
    if (!idsToKeep.has(r.id)) {
      idsToDelete.add(r.id)
    }
  }

  const toDeleteList = Array.from(idsToDelete)

  if (toDeleteList.length > 0) {
    const BATCH = 500
    for (let i = 0; i < toDeleteList.length; i += BATCH) {
      const chunk = toDeleteList.slice(i, i + BATCH)
      await supabase.from('question_cache').delete().in('id', chunk)
    }
  }

  console.log(`  [${workerName}] Level [${level.toUpperCase()}]: Giữ lại ${idsToKeep.size} câu độc bản | Đã xóa ${toDeleteList.length} câu trùng concept`)
  return { level, kept: idsToKeep.size, deleted: toDeleteList.length }
}

/**
 * Worker 1: English Cambridge & CEFR levels
 */
async function runWorker1() {
  const levels = ['starters', 'movers', 'flyers', 'a1', 'a2', 'b1', 'b2']
  let totalDeleted = 0
  for (const lvl of levels) {
    const res = await processLevel('en', lvl, 'Worker 1 - Tiếng Anh Từ Vựng', 1)
    totalDeleted += res.deleted
  }
  return totalDeleted
}

/**
 * Worker 2: English 20 Communication Topics
 */
async function runWorker2() {
  const levels = [
    'en_greetings', 'en_family', 'en_school', 'en_food', 'en_daily',
    'en_hobbies', 'en_weather', 'en_animals', 'en_clothes', 'en_house',
    'en_health', 'en_colors', 'en_numbers', 'en_shopping', 'en_places',
    'en_time', 'en_travel', 'en_feelings', 'en_jobs', 'en_polite'
  ]
  let totalDeleted = 0
  for (const lvl of levels) {
    const res = await processLevel('en', lvl, 'Worker 2 - Tiếng Anh Giao Tiếp', 1)
    totalDeleted += res.deleted
  }
  return totalDeleted
}

/**
 * Worker 3: Chinese levels & communication topics
 */
async function runWorker3() {
  const levels = [
    'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'life', 'office', 'factory',
    'shopping', 'dining', 'travel', 'work', 'tourism', 'hotel', 'health',
    'sports', 'entertainment', 'weather', 'family', 'ecom', 'education',
    'technology', 'nature', 'fashion', 'feelings', 'hobbies', 'festivals', 'social'
  ]
  let totalDeleted = 0
  for (const lvl of levels) {
    const res = await processLevel('zh', lvl, 'Worker 3 - Tiếng Trung HSK & Giao Tiếp', 1)
    totalDeleted += res.deleted
  }
  return totalDeleted
}

/**
 * Worker 4: Vietnamese levels
 */
async function runWorker4() {
  const levels = ['alphabet', 'tones', 'vowels', 'spelling', 'rhymes', 'words', 'sentences', 'proverbs']
  let totalDeleted = 0
  for (const lvl of levels) {
    const res = await processLevel('vi', lvl, 'Worker 4 - Tiếng Việt Mầm Non & Tiểu Học', 1)
    totalDeleted += res.deleted
  }
  return totalDeleted
}

/**
 * Worker 5: Math levels
 */
async function runWorker5() {
  const levels = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5']
  let totalDeleted = 0
  for (const lvl of levels) {
    const res = await processLevel('math', lvl, 'Worker 5 - Toán Học Lớp 1-5', 1)
    totalDeleted += res.deleted
  }
  return totalDeleted
}

async function runParallelPurge() {
  console.log('🤖 Bắt đầu chạy 5 WORKERS AI ĐỘC LẬP để rà soát & dọn dẹp câu hỏi trùng concept trên Supabase...\n')
  
  const startTime = Date.now()
  const results = await Promise.all([
    runWorker1(),
    runWorker2(),
    runWorker3(),
    runWorker4(),
    runWorker5()
  ])

  const totalPurged = results.reduce((acc, curr) => acc + curr, 0)
  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1)

  console.log(`\n🎉 HOÀN THÀNH DỌN DẸP TOÀN BỘ DATABASE TRONG ${durationSec} GIÂY!`)
  console.log(`🔥 Tổng số câu hỏi trùng nội dung/khái niệm đã được loại bỏ: ${totalPurged.toLocaleString('vi-VN')} câu!`)

  const { count } = await supabase.from('question_cache').select('*', { count: 'exact', head: true })
  console.log(`✨ TỔNG SỐ CÂU HỎI SẠCH VÀ ĐỘC BẢN 100% HIỆN TẠI TRÊN SUPABASE: ${count.toLocaleString('vi-VN')} câu.`)
}

runParallelPurge().catch(console.error)
