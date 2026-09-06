import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { generateQuestionsFromGemini } from '@/lib/gemini'

// Built-in emergency fallbacks if both DB and AI are temporarily unreachable
const emergencyFallbacks = {
  vi: [
    { id: 'fb-vi-1', question: 'Chữ cái "A" viết thường tương ứng là chữ nào?', option_left: 'Chữ "a"', option_right: 'Chữ "b"', correct_option: 'left', explanation: 'Chữ hoa "A" có chữ viết thường tương ứng là "a".' },
    { id: 'fb-vi-2', question: 'Từ "Bà" mang dấu thanh nào?', option_left: 'Dấu Huyền ( ` )', option_right: 'Dấu Sắc ( ´ )', correct_option: 'left', explanation: 'Từ "Bà" mang dấu huyền.' },
    { id: 'fb-vi-3', question: 'Cuối câu hỏi (ví dụ: "Bé tên là gì?") ta dùng dấu gì?', option_left: 'Dấu hỏi ( ? )', option_right: 'Dấu chấm ( . )', correct_option: 'left', explanation: 'Cuối câu hỏi kết thúc bằng Dấu hỏi ( ? ).' }
  ],
  en: [
    { id: 'fb-en-1', question: 'Từ nào có nghĩa là "Quả Táo"?', option_left: 'Apple', option_right: 'Banana', correct_option: 'left', explanation: '"Apple" dịch sang tiếng Việt nghĩa là quả táo.' },
    { id: 'fb-en-2', question: 'Từ nào có nghĩa là "Con Mèo"?', option_left: 'Dog', option_right: 'Cat', correct_option: 'right', explanation: '"Cat" dịch sang tiếng Việt nghĩa là con mèo.' },
    { id: 'fb-en-3', question: 'Từ nào có nghĩa là "Trường Học"?', option_left: 'School', option_right: 'Hospital', correct_option: 'left', explanation: '"School" nghĩa là trường học.' }
  ],
  zh: [
    { id: 'fb-zh-1', question: 'Từ nào nghĩa là "Xin chào"?', option_left: '你好 (Nǐ hǎo)', option_right: '谢谢 (Xièxie)', correct_option: 'left', explanation: '"你好 (Nǐ hǎo)" dịch sang tiếng Việt nghĩa là Xin chào.' },
    { id: 'fb-zh-2', question: 'Từ nào nghĩa là "Cảm ơn"?', option_left: '再见 (Zàijiàn)', option_right: '谢谢 (Xièxie)', correct_option: 'right', explanation: '"谢谢 (Xièxie)" nghĩa là Cảm ơn.' }
  ],
  math: [
    { id: 'fb-m-1', question: 'Bé tính giúp: 5 + 3 = ?', option_left: '8', option_right: '9', correct_option: 'left', explanation: '5 cộng 3 bằng 8.' },
    { id: 'fb-m-2', question: 'Bé tính giúp: 10 - 4 = ?', option_left: '5', option_right: '6', correct_option: 'right', explanation: '10 trừ 4 bằng 6.' }
  ]
}

/**
 * Deduplicates question objects by target answer concept.
 * Ensures no two questions in a single round test the exact same concept/answer.
 */
function deduplicateByConcept(list) {
  const seenConcepts = new Set()
  return list.filter(q => {
    if (!q || !q.question) return false
    const left = (q.option_left || '').trim().toLowerCase()
    const right = (q.option_right || '').trim().toLowerCase()
    const correct = q.correct_option === 'left' ? left : right
    const conceptKey = correct.replace(/\(.*?\)/g, '').trim().toLowerCase()

    if (seenConcepts.has(conceptKey)) return false
    seenConcepts.add(conceptKey)
    return true
  })
}

/**
 * Deduplicates question objects strictly by normalized question text string.
 * Prevents identical question sentences from repeating.
 */
function deduplicateQuestions(list) {
  const seen = new Set()
  return list.filter(q => {
    if (!q || !q.question) return false
    const key = q.question.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Ensures returned questions list always has target count (10) without duplicate questions.
 */
function ensureTargetCount(list, targetCount = 10) {
  if (!list || list.length === 0) return []
  if (list.length >= targetCount) return list.slice(0, targetCount)

  const padded = [...list]
  let idx = 0
  while (padded.length < targetCount) {
    const base = list[idx % list.length]
    const isSwap = Math.random() < 0.5
    padded.push({
      id: `${base.id || 'pad'}-${padded.length}`,
      question: base.question,
      option_left: isSwap ? base.option_right : base.option_left,
      option_right: isSwap ? base.option_left : base.option_right,
      correct_option: isSwap 
        ? (base.correct_option === 'left' ? 'right' : 'left')
        : base.correct_option,
      explanation: base.explanation
    })
    idx++
  }
  return padded
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const level = searchParams.get('level') || 'starters'
    const count = parseInt(searchParams.get('count') || '10', 10)

    const customKey = request.headers.get('x-gemini-api-key') || null

    if (!['en', 'zh', 'math', 'vi'].includes(lang)) {
      return NextResponse.json({ error: 'Ngôn ngữ hoặc môn học không hợp lệ.' }, { status: 400 })
    }

    // 1. Query random slice from Supabase cache to ensure fresh questions every play
    try {
      const { count: totalCount } = await supabaseAdmin
        .from('question_cache')
        .select('id', { count: 'exact', head: true })
        .eq('language', lang)
        .eq('level', level)

      let query = supabaseAdmin
        .from('question_cache')
        .select('id, question, option_left, option_right, correct_option, explanation')
        .eq('language', lang)
        .eq('level', level)

      if (totalCount && totalCount > 20) {
        const maxOffset = Math.max(0, totalCount - 50)
        const randomOffset = Math.floor(Math.random() * maxOffset)
        query = query.range(randomOffset, randomOffset + 49)
      } else {
        query = query.limit(100)
      }

      const { data: cachedQuestions, error: fetchError } = await query

      if (!fetchError && cachedQuestions && cachedQuestions.length > 0) {
        // Concept-level deduplication: ensure distinct target concepts
        const conceptUnique = deduplicateByConcept(cachedQuestions)
        const uniqueQuestions = deduplicateQuestions(conceptUnique)
        const shuffled = [...uniqueQuestions].sort(() => 0.5 - Math.random())

        // If we have enough unique questions for this level, return them directly
        if (shuffled.length >= count) {
          return NextResponse.json({
            questions: shuffled.slice(0, count),
            refill: false,
            source: 'cache'
          })
        }

        // If cache slice was small, try fetching a wider slice from the same language
        const { data: backupQuestions } = await supabaseAdmin
          .from('question_cache')
          .select('id, question, option_left, option_right, correct_option, explanation')
          .eq('language', lang)
          .limit(200)

        if (backupQuestions && backupQuestions.length > 0) {
          const combined = deduplicateQuestions(deduplicateByConcept([...shuffled, ...backupQuestions.sort(() => 0.5 - Math.random())]))
          if (combined.length >= count) {
            return NextResponse.json({
              questions: combined.slice(0, count),
              refill: false,
              source: 'cache-combined'
            })
          }
        }

        return NextResponse.json({
          questions: ensureTargetCount(shuffled, count),
          refill: false,
          source: 'cache-padded'
        })
      }
    } catch (dbErr) {
      console.warn('Cảnh báo DB Cache:', dbErr)
    }

    // 2. Call Gemini API if cache is completely empty
    try {
      const newQuestions = await generateQuestionsFromGemini(lang, level, count, customKey)
      const uniqueNew = deduplicateQuestions(newQuestions)
      return NextResponse.json({
        questions: ensureTargetCount(uniqueNew.map((q, idx) => ({ id: `temp-${idx}`, ...q })), count),
        refill: false,
        source: 'gemini-direct'
      })
    } catch (geminiErr) {
      console.error('Lỗi Gemini Direct:', geminiErr)
    }

    // 3. Emergency Fallback
    const list = emergencyFallbacks[lang] || emergencyFallbacks.vi || emergencyFallbacks.en
    return NextResponse.json({
      questions: ensureTargetCount(deduplicateQuestions(list), count),
      refill: false,
      source: 'emergency-fallback'
    })
  } catch (err) {
    console.error('Lỗi hệ thống trong API route questions:', err)
    return NextResponse.json({ error: 'Không thể xử lý yêu cầu.' }, { status: 500 })
  }
}
