import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request) {
  try {
    const { apiKey } = await request.json()
    if (!apiKey) {
      return NextResponse.json({ error: 'Thiếu API Key.' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })
    
    // Quick, light test request
    const result = await model.generateContent('Say OK')
    const text = result.response.text()

    if (text) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Không thể sinh phản hồi từ mô hình.' }, { status: 400 })
    }
  } catch (err) {
    console.error('Lỗi khi kiểm tra Gemini API Key:', err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
