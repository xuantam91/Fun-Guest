import { NextResponse } from 'next/server'
import WebSocket from 'ws'
import crypto from 'crypto'

// Microsoft Edge Neural Voices mapping
const EDGE_VOICES = {
  vi: 'vi-VN-HoaiMyNeural', // Microsoft Hoài My (Tiếng Việt ngọt ngào)
  en: 'en-US-AnaNeural',    // Microsoft Ana (Tiếng Anh nhí nhảnh)
  zh: 'zh-CN-XiaoxiaoNeural' // Microsoft 晓晓 (Tiếng Trung chuẩn Phổ Thông)
}

function synthesizeEdgeTTS(text, voice) {
  return new Promise((resolve, reject) => {
    const requestId = crypto.randomBytes(16).toString('hex')
    const ws = new WebSocket(
      `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA634081836C887971295790&ConnectionId=${requestId}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
          Origin: 'chrome-extension://jdiccldimpdaibhpobmlijgahbbbbdlc',
        },
      }
    )

    const audioChunks = []
    const timeout = setTimeout(() => {
      ws.close()
      reject(new Error('Microsoft Edge TTS synthesis timeout'))
    }, 4000)

    ws.on('open', () => {
      // Send config header
      const configHeader = `Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"outputFormat":"audio-24khz-48kbitrate-mono-mp3","voiceMix":{"voices":[{"name":"${voice}"}]}}}}}`
      ws.send(configHeader)

      // Send SSML request
      const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voice}'><pitch amount='0Hz'><rate speed='-5%'>${text}</rate></pitch></voice></speak>`
      const ssmlHeader = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n${ssml}`
      ws.send(ssmlHeader)
    })

    ws.on('message', (data, isBinary) => {
      if (isBinary) {
        const headerLength = data.readUInt16BE(0)
        const audioData = data.subarray(2 + headerLength)
        audioChunks.push(audioData)
      } else {
        const textStr = data.toString()
        if (textStr.includes('Path:turn.end')) {
          clearTimeout(timeout)
          ws.close()
          const fullAudio = Buffer.concat(audioChunks)
          resolve(fullAudio)
        }
      }
    })

    ws.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })
}

async function fetchGoogleTTS(text, langCode) {
  const encText = encodeURIComponent(text)
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${langCode}&q=${encText}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  })
  if (!res.ok) throw new Error('Google TTS response not ok')
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get('text') || ''
    const lang = searchParams.get('lang') || 'vi'
    const engine = searchParams.get('engine') || 'ms' // 'ms' or 'google'

    const cleanText = text.replace(/[\[\]]/g, '').trim()
    if (!cleanText) {
      return NextResponse.json({ error: 'Nội dung văn bản trống' }, { status: 400 })
    }

    const voice = EDGE_VOICES[lang] || EDGE_VOICES.vi
    let audioBuffer = null

    if (engine === 'ms') {
      try {
        audioBuffer = await synthesizeEdgeTTS(cleanText, voice)
      } catch (msErr) {
        console.warn('Lỗi Microsoft Edge TTS, đang chuyển sang Google Fallback:', msErr.message)
        const langCode = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en' : 'vi'
        audioBuffer = await fetchGoogleTTS(cleanText, langCode)
      }
    } else {
      const langCode = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en' : 'vi'
      audioBuffer = await fetchGoogleTTS(cleanText, langCode)
    }

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    })
  } catch (err) {
    console.error('Lỗi tổng hợp giọng nói API TTS:', err)
    return NextResponse.json({ error: 'Không thể tổng hợp giọng nói.' }, { status: 500 })
  }
}
