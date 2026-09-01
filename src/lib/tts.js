/**
 * Web Speech API text-to-speech utility for GLOBY Fun Quest.
 * Runs entirely in the client browser, offline, free.
 * @param {string} text - Text to speak
 * @param {string} lang - 'en' (English), 'zh' (Chinese), or 'vi' (Vietnamese)
 */
export function speakText(text, lang) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  try {
    // 1. Cancel any active speech synthesis
    window.speechSynthesis.cancel()

    // 2. Clear any special markdown characters or brackets in the text
    const cleanText = text.replace(/[\[\]]/g, '').trim()

    // 3. Create utterance
    const utterance = new SpeechSynthesisUtterance(cleanText)

    // 4. Assign appropriate language codes
    if (lang === 'zh') {
      utterance.lang = 'zh-CN' // Mandarin Chinese
    } else if (lang === 'en') {
      utterance.lang = 'en-US' // American English
    } else {
      utterance.lang = 'vi-VN' // Vietnamese for explanations
    }

    // 5. Children-friendly voice settings
    utterance.rate = 0.85 // Slightly slower than normal speed
    utterance.pitch = 1.15 // Slightly higher pitch for child friendliness

    // 6. Execute speech
    window.speechSynthesis.speak(utterance)
  } catch (err) {
    console.error('Lỗi khi phát giọng đọc TTS:', err)
  }
}
