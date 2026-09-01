import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { generateQuestionsFromGemini } from '@/lib/gemini'

// Built-in emergency fallbacks if both DB and AI are temporarily unreachable
const emergencyFallbacks = {
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const level = searchParams.get('level') || 'starters'
    const count = parseInt(searchParams.get('count') || '10', 10)

    const customKey = request.headers.get('x-gemini-api-key') || null

    if (!['en', 'zh', 'math'].includes(lang)) {
      return NextResponse.json({ error: 'Ngôn ngữ hoặc môn học không hợp lệ.' }, { status: 400 })
    }

    // 1. Fast random window offset within [0..200] to ensure 100% row availability
    const offset = Math.floor(Math.random() * 100)

    try {
      const { data: cachedQuestions, error: fetchError } = await supabaseAdmin
        .from('question_cache')
        .select('id, question, option_left, option_right, correct_option, explanation')
        .eq('language', lang)
        .eq('level', level)
        .range(offset, offset + 40)

      if (!fetchError && cachedQuestions && cachedQuestions.length >= count) {
        // Shuffle the fetched window and select `count` questions
        const shuffled = [...cachedQuestions].sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, count)

        return NextResponse.json({
          questions: selected,
          refill: false,
          source: 'cache'
        })
      }
    } catch (dbErr) {
      console.warn('Cảnh báo DB Cache:', dbErr)
    }

    // 2. If DB cache range returns empty, try full level fetch with limit
    try {
      const { data: fallbackDbData } = await supabaseAdmin
        .from('question_cache')
        .select('id, question, option_left, option_right, correct_option, explanation')
        .eq('language', lang)
        .eq('level', level)
        .limit(40)

      if (fallbackDbData && fallbackDbData.length > 0) {
        const shuffled = [...fallbackDbData].sort(() => 0.5 - Math.random())
        return NextResponse.json({
          questions: shuffled.slice(0, count),
          refill: false,
          source: 'cache-fallback'
        })
      }
    } catch (fbDbErr) {
      console.warn('Cảnh báo DB Fallback:', fbDbErr)
    }

    // 3. If cache is empty, call Gemini API
    try {
      const newQuestions = await generateQuestionsFromGemini(lang, level, count, customKey)
      return NextResponse.json({
        questions: newQuestions.map((q, idx) => ({ id: `temp-${idx}`, ...q })),
        refill: false,
        source: 'gemini-direct'
      })
    } catch (geminiErr) {
      console.error('Lỗi Gemini Direct:', geminiErr)
    }

    // 4. Ultimate Emergency Fallback (Guarantees app NEVER crashes with 500 error!)
    const list = emergencyFallbacks[lang] || emergencyFallbacks.en
    return NextResponse.json({
      questions: list,
      refill: false,
      source: 'emergency-fallback'
    })

  } catch (err) {
    console.error('Lỗi bất ngờ trong API questions:', err)
    const list = emergencyFallbacks.en
    return NextResponse.json({
      questions: list,
      refill: false,
      source: 'emergency-fallback'
    })
  }
}
