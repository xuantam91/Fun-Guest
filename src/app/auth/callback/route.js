import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/'

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`)
      }
      console.error('Lỗi quy đổi token sang session:', error)
    } catch (err) {
      console.error('Lỗi bất ngờ trong auth callback:', err)
    }
  }

  // Nếu có lỗi, chuyển hướng về trang chủ và hiển thị thông báo offline/cảnh báo
  return NextResponse.redirect(`${origin}/?auth_error=true`)
}
