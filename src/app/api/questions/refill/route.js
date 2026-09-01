import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { generateQuestionsFromGemini } from '@/lib/gemini'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang')
    const level = searchParams.get('level')

    const customKey = request.headers.get('x-gemini-api-key') || null

    if (!lang || !level || !['en', 'zh', 'math'].includes(lang)) {
      return NextResponse.json({ error: 'Thiếu hoặc sai tham số lang/level.' }, { status: 400 })
    }

    console.log(`Đang nạp thêm câu hỏi (refill) cho ${lang} - ${level}...`)

    // Generate a batch of 12 questions
    const newQuestions = await generateQuestionsFromGemini(lang, level, 12, customKey)

    const dbInsertData = newQuestions.map(q => ({
      language: lang,
      level: level,
      question: q.question,
      option_left: q.option_left,
      option_right: q.option_right,
      correct_option: q.correct_option,
      explanation: q.explanation
    }))

    const { data, error: insertError } = await supabaseAdmin
      .from('question_cache')
      .insert(dbInsertData)
      .select()

    if (insertError) {
      console.error('Lỗi khi nạp câu hỏi mới vào cache:', insertError)
      return NextResponse.json({ error: 'Lỗi lưu cache.' }, { status: 500 })
    }

    console.log(`Đã nạp thành công ${newQuestions.length} câu hỏi mới cho ${lang} - ${level}.`)

    return NextResponse.json({
      success: true,
      addedCount: newQuestions.length,
      message: 'Đã nạp thêm câu hỏi thành công.'
    })
  } catch (err) {
    console.error('Lỗi bất ngờ trong API refill:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
