import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { generateQuestionsFromGemini } from '@/lib/gemini'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const level = searchParams.get('level') || 'starters'
    const count = parseInt(searchParams.get('count') || '10', 10)

    const customKey = request.headers.get('x-gemini-api-key') || null

    if (!['en', 'zh', 'math'].includes(lang)) {
      return NextResponse.json({ error: 'Ngôn ngữ hoặc môn học không hợp lệ. Chọn "en", "zh" hoặc "math".' }, { status: 400 })
    }

    // 1. Fetch questions from the Supabase cache
    const { data: cachedQuestions, error: fetchError } = await supabaseAdmin
      .from('question_cache')
      .select('*')
      .eq('language', lang)
      .eq('level', level)

    if (fetchError) {
      console.error('Lỗi truy vấn cache câu hỏi:', fetchError)
      // Fallback to on-the-fly generation if database fails
    }

    // 2. If the cache is empty or has too few questions, generate immediately
    if (!cachedQuestions || cachedQuestions.length < count) {
      console.log(`Cache trống hoặc thiếu câu hỏi (${cachedQuestions?.length || 0}/${count}). Đang gọi Gemini sinh trực tiếp...`)
      
      try {
        const newQuestions = await generateQuestionsFromGemini(lang, level, 10, customKey)
        
        // Save them to the cache for future users
        const dbInsertData = newQuestions.map(q => ({
          language: lang,
          level: level,
          question: q.question,
          option_left: q.option_left,
          option_right: q.option_right,
          correct_option: q.correct_option,
          explanation: q.explanation
        }))

        const { error: insertError } = await supabaseAdmin
          .from('question_cache')
          .insert(dbInsertData)

        if (insertError) {
          console.error('Lỗi lưu câu hỏi mới vào cache:', insertError)
        }

        // Return the requested amount of questions
        const resultQuestions = newQuestions.slice(0, count).map((q, idx) => ({
          id: `temp-${idx}`,
          ...q
        }))

        return NextResponse.json({
          questions: resultQuestions,
          refill: false,
          source: 'gemini-direct'
        })
      } catch (geminiError) {
        console.error('Lỗi khi gọi Gemini trực tiếp:', geminiError)
        return NextResponse.json({ error: `Lỗi AI: ${geminiError.message || 'Không thể kết nối đến Gemini.'}` }, { status: 500 })
      }
    }

    // 3. If cache is healthy, shuffle and select `count` questions
    const shuffled = [...cachedQuestions].sort(() => 0.5 - Math.random())
    const selectedQuestions = shuffled.slice(0, count)

    // Check if we need to refill the cache in the background (threshold: if total cached < 15)
    const needsRefill = cachedQuestions.length < 15

    return NextResponse.json({
      questions: selectedQuestions.map(q => ({
        id: q.id,
        question: q.question,
        option_left: q.option_left,
        option_right: q.option_right,
        correct_option: q.correct_option,
        explanation: q.explanation
      })),
      refill: needsRefill,
      source: 'cache'
    })
  } catch (err) {
    console.error('Lỗi bất ngờ trong API questions:', err)
    return NextResponse.json({ error: 'Đã xảy ra lỗi máy chủ.' }, { status: 500 })
  }
}
