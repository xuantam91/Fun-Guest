/**
 * Web Speech API text-to-speech utility for GLOBY Fun Quest.
 * Features automatic language detection & native voice matching for Vietnamese, English, and Chinese.
 * Runs 100% client-side, offline, free.
 */

let cachedVoices = []

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
 * Automatically detect if text is written in Vietnamese, Chinese, or English.
 * @param {string} text 
 * @param {string} fallbackLang 
 */
export function autoDetectLang(text, fallbackLang = 'vi') {
  if (!text) return fallbackLang

  // 1. Detect Vietnamese diacritics or keywords
  const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i
  if (viRegex.test(text)) {
    return 'vi'
  }

  const viKeywords = ['bằng', 'tiếng', 'dịch', 'nghĩa', 'chọn', 'từ', 'nào', 'dưới', 'đây', 'câu', 'hỏi', 'sau', 'chữ', 'toán', 'lớp', 'tính', 'bé', 'bạn']
  const lowerText = text.toLowerCase()
  if (viKeywords.some(kw => lowerText.includes(kw))) {
    return 'vi'
  }

  // 2. Detect Chinese Hanzi characters
  const zhRegex = /[\u4e00-\u9fa5]/
  if (zhRegex.test(text) && text.length <= 15) {
    return 'zh'
  }

  return fallbackLang
}

/**
 * Find the best native system voice for the given language code.
 * @param {string} lang - 'vi', 'en', or 'zh'
 */
function findBestVoice(lang) {
  if (!cachedVoices || cachedVoices.length === 0) {
    loadVoices()
  }

  const lowerLang = (lang || 'vi').toLowerCase()

  if (lowerLang === 'vi') {
    // Look for Vietnamese voice
    return (
      cachedVoices.find(v => v.lang.toLowerCase().includes('vi')) ||
      cachedVoices.find(v => v.name.toLowerCase().includes('vietnamese') || v.name.toLowerCase().includes('viet'))
    )
  }

  if (lowerLang === 'zh') {
    // Look for Mandarin Chinese voice
    return (
      cachedVoices.find(v => v.lang.toLowerCase().startsWith('zh')) ||
      cachedVoices.find(v => v.name.toLowerCase().includes('chinese') || v.name.toLowerCase().includes('mandarin'))
    )
  }

  if (lowerLang === 'en') {
    // Look for English voice
    return (
      cachedVoices.find(v => v.lang.toLowerCase().startsWith('en-us')) ||
      cachedVoices.find(v => v.lang.toLowerCase().startsWith('en')) ||
      cachedVoices.find(v => v.name.toLowerCase().includes('english'))
    )
  }

  return null
}

/**
 * Speak text with automatic language detection and native voice matching.
 * @param {string} text - Text to speak
 * @param {string} targetLang - Preferred fallback language ('en', 'zh', or 'vi')
 */
export function speakText(text, targetLang = 'vi') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  try {
    // 1. Cancel active speech synthesis
    window.speechSynthesis.cancel()

    // 2. Clean markdown and brackets
    const cleanText = text.replace(/[\[\]]/g, '').trim()
    if (!cleanText) return

    // 3. Detect actual language of the text string
    const detectedLang = autoDetectLang(cleanText, targetLang)

    // 4. Create Utterance
    const utterance = new SpeechSynthesisUtterance(cleanText)

    // 5. Assign BCP-47 language tag
    if (detectedLang === 'vi') {
      utterance.lang = 'vi-VN'
    } else if (detectedLang === 'zh') {
      utterance.lang = 'zh-CN'
    } else if (detectedLang === 'en') {
      utterance.lang = 'en-US'
    } else {
      utterance.lang = 'vi-VN'
    }

    // 6. Assign explicit native voice object if available on system
    const voice = findBestVoice(detectedLang)
    if (voice) {
      utterance.voice = voice
    }

    // 7. Kid-friendly TTS settings
    utterance.rate = 0.88 // Comfortable speed for children
    utterance.pitch = 1.1 // Friendly tone

    // 8. Speak
    window.speechSynthesis.speak(utterance)
  } catch (err) {
    console.error('Lỗi khi phát giọng đọc TTS:', err)
  }
}
