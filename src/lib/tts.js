/**
 * Advanced Text-To-Speech (TTS) Engine for GLOBY Fun Quest.
 * Supports:
 * 1. Microsoft Edge Neural TTS (Giọng đọc AI Cao Cấp - Hoài My, Ana, 晓晓)
 * 2. Web Speech API (Giọng đọc mặc định trình duyệt)
 */

let cachedVoices = []
let currentAudio = null

function loadVoices() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    cachedVoices = window.speechSynthesis.getVoices()
  }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices()
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices
  }
}

/**
 * Automatically detect language of a text string.
 */
export function autoDetectLang(text, fallbackLang = 'vi') {
  if (!text) return fallbackLang

  const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i
  if (viRegex.test(text)) {
    return 'vi'
  }

  const viKeywords = ['bằng', 'tiếng', 'dịch', 'nghĩa', 'chọn', 'từ', 'nào', 'dưới', 'đây', 'câu', 'hỏi', 'sau', 'chữ', 'toán', 'lớp', 'tính', 'bé', 'bạn']
  const lowerText = text.toLowerCase()
  if (viKeywords.some(kw => lowerText.includes(kw))) {
    return 'vi'
  }

  const zhRegex = /[\u4e00-\u9fa5]/
  if (zhRegex.test(text) && text.length <= 15) {
    return 'zh'
  }

  return fallbackLang
}

function findBestVoice(lang) {
  if (!cachedVoices || cachedVoices.length === 0) {
    loadVoices()
  }

  const lowerLang = (lang || 'vi').toLowerCase()

  if (lowerLang === 'vi') {
    return (
      cachedVoices.find(v => v.lang.toLowerCase().includes('vi')) ||
      cachedVoices.find(v => v.name.toLowerCase().includes('vietnamese') || v.name.toLowerCase().includes('viet'))
    )
  }

  if (lowerLang === 'zh') {
    return (
      cachedVoices.find(v => v.lang.toLowerCase().startsWith('zh')) ||
      cachedVoices.find(v => v.name.toLowerCase().includes('chinese') || v.name.toLowerCase().includes('mandarin'))
    )
  }

  if (lowerLang === 'en') {
    return (
      cachedVoices.find(v => v.lang.toLowerCase().startsWith('en-us')) ||
      cachedVoices.find(v => v.lang.toLowerCase().startsWith('en')) ||
      cachedVoices.find(v => v.name.toLowerCase().includes('english'))
    )
  }

  return null
}

function speakBrowserTTS(cleanText, detectedLang) {
  if (!window.speechSynthesis) return

  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(cleanText)

    if (detectedLang === 'vi') {
      utterance.lang = 'vi-VN'
    } else if (detectedLang === 'zh') {
      utterance.lang = 'zh-CN'
    } else if (detectedLang === 'en') {
      utterance.lang = 'en-US'
    } else {
      utterance.lang = 'vi-VN'
    }

    const voice = findBestVoice(detectedLang)
    if (voice) {
      utterance.voice = voice
    }

    utterance.rate = 0.88
    utterance.pitch = 1.1

    window.speechSynthesis.speak(utterance)
  } catch (err) {
    console.error('Lỗi khi phát giọng đọc Browser TTS:', err)
  }
}

/**
 * Speak text with selected engine ('ms' for Microsoft Neural AI, 'browser' for local SpeechSynthesis).
 * @param {string} text - Text to speak
 * @param {string} targetLang - Language ('en', 'zh', or 'vi')
 * @param {string} engineMode - 'ms' or 'browser'
 */
export function speakText(text, targetLang = 'vi', engineMode = 'ms') {
  if (typeof window === 'undefined') return

  const cleanText = text.replace(/[\[\]]/g, '').trim()
  if (!cleanText) return

  const detectedLang = autoDetectLang(cleanText, targetLang)

  // 1. Cancel previous HTML5 audio
  if (currentAudio) {
    try {
      currentAudio.pause()
      currentAudio.currentTime = 0
    } catch (e) {}
    currentAudio = null
  }

  // 2. Cancel previous Web Speech API utterance
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }

  // 3. Play with Microsoft Neural AI voice
  if (engineMode === 'ms' || engineMode === 'edge') {
    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=${detectedLang}&engine=ms`
      const audio = new Audio(audioUrl)
      currentAudio = audio
      audio.play().catch(err => {
        console.warn('Không thể phát Microsoft Neural audio tự động, fallback sang giọng trình duyệt:', err)
        speakBrowserTTS(cleanText, detectedLang)
      })
      return
    } catch (err) {
      console.warn('Lỗi kết nối Microsoft Neural TTS:', err)
    }
  }

  // Fallback to browser voice
  speakBrowserTTS(cleanText, detectedLang)
}
