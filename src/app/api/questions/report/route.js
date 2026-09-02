import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request) {
  try {
    const { questionId } = await request.json()

    if (!questionId) {
      return NextResponse.json({ error: 'Thiếu questionId' }, { status: 400 })
    }

    // Delete the reported question from question_cache
    if (typeof questionId === 'string' && !questionId.startsWith('temp-') && !questionId.startsWith('fb-')) {
      const { error } = await supabaseAdmin
        .from('question_cache')
        .delete()
        .eq('id', questionId)

      if (error) {
        console.error('Lỗi khi xóa câu hỏi báo lỗi:', error)
      } else {
        console.log(`✓ Đã xóa câu hỏi lỗi khỏi DB cache: [ID: ${questionId}]`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cảm ơn bạn đã báo lỗi! Câu hỏi ngớ ngẩn này đã bị gỡ bỏ khỏi hệ thống.'
    })
  } catch (err) {
    console.error('Lỗi xử lý báo lỗi câu hỏi:', err)
    return NextResponse.json({ error: 'Không thể xử lý yêu cầu.' }, { status: 500 })
  }
}
