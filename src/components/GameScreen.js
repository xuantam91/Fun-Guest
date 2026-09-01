'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'
import useFaceTracker from '@/hooks/useFaceTracker'
import CameraView from './CameraView'
import styles from './GameScreen.module.css'
import { speakText } from '@/lib/tts'
import { Sparkles, Trophy, Home, RotateCcw, Volume2, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

// Simple Sound effects using Web Audio API (completely client-side, no audio files needed!)
function playTone(freq, type, duration) {
  if (typeof window === 'undefined') return
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = type
    osc.frequency.value = freq
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {
    console.error('Audio play error:', e)
  }
}

export function playCorrectSound() {
  playTone(523.25, 'triangle', 0.15) // C5
  setTimeout(() => playTone(659.25, 'triangle', 0.3), 100) // E5
}

export function playIncorrectSound() {
  playTone(220, 'sawtooth', 0.4) // A3
}

// Detects if the question text is written in Vietnamese or target language
function detectQuestionLang(text, targetLang) {
  if (!text) return 'vi'
  // If the text contains Vietnamese accented characters, it's definitely Vietnamese
  const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text)
  if (hasVietnamese) return 'vi'
  
  // Common Vietnamese question words
  const commonViWords = ['đâu', 'là', 'gì', 'nào', 'từ', 'nghĩa', 'chữ', 'đúng', 'câu', 'sau', 'bên', 'trái', 'phải']
  const words = text.toLowerCase().split(/[\s\?\,\.\!\:\-\"\']/)
  if (words.some(w => commonViWords.includes(w))) return 'vi'
  
  return targetLang
}

export default function GameScreen({ language, level, onBackToLobby }) {
  const { addPoints, incrementStreak, customApiKey } = useApp()
  const tracker = useFaceTracker()
  const { tiltDirection, faceDetected } = tracker

  // Game States
  const [questions, setQuestions] = useState([])
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionPoints, setSessionPoints] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  const [showCalibration, setShowCalibration] = useState(true)
  const [selectedOption, setSelectedOption] = useState(null) // 'left' | 'right' | null
  const [chargePercent, setChargePercent] = useState(0) // 0 to 100
  const [answered, setAnswered] = useState(null) // 'left' | 'right' | null
  const [showExplanation, setShowExplanation] = useState(false)
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const chargeTimerRef = useRef(null)

  // Refs to avoid stale closures in setTimeout/async handlers
  const sessionPointsRef = useRef(0)
  const correctCountRef = useRef(0)
  const answeredRef = useRef(false)
  const currentIndexRef = useRef(0)
  const canvasRef = useRef(null)

  // Reset refs on mount
  useEffect(() => {
    sessionPointsRef.current = 0
    correctCountRef.current = 0
    answeredRef.current = false
    currentIndexRef.current = 0
  }, [])

  const triggerFireworks = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const colors = ['#ffcd3c', '#ff6b6b', '#4dabf7', '#51cf66', '#fcc419', '#ae3ec9', '#ff922b']

    const createExplosion = (x, y) => {
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 8
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (1 + Math.random() * 3),
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 3 + Math.random() * 4,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.015
        })
      }
    }

    createExplosion(canvas.width / 2, canvas.height / 2)
    setTimeout(() => createExplosion(canvas.width * 0.3, canvas.height * 0.4), 200)
    setTimeout(() => createExplosion(canvas.width * 0.7, canvas.height * 0.4), 400)

    let animationFrameId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let active = false
      particles.forEach((p) => {
        if (p.alpha <= 0) return
        active = true
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12 // gravity
        p.vx *= 0.98
        p.alpha -= p.decay

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      })
      if (active) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    animate()
  }

  // 1. Fetch questions on mount
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoadingQuestions(true)
        const headers = {}
        if (customApiKey) {
          headers['x-gemini-api-key'] = customApiKey
        }

        const response = await fetch(`/api/questions?lang=${language}&level=${level}&count=10`, { headers })
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setQuestions(data.questions || [])
        currentIndexRef.current = 0
        answeredRef.current = false
        
        // Trigger background refill if API asks for it
        if (data.refill) {
          fetch(`/api/questions/refill?lang=${language}&level=${level}`, { headers }).catch(err => 
            console.error('Lỗi nạp nền câu hỏi:', err)
          )
        }
      } catch (err) {
        console.error('Lỗi lấy câu hỏi:', err)
        setErrorMsg('Không thể tải câu hỏi học tập. Vui lòng kiểm tra lại mạng hoặc API Key.')
      } finally {
        setLoadingQuestions(false)
      }
    }

    fetchQuestions()
  }, [language, level])

  // 2. Play TTS when question changes
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length && !showCalibration && !showScoreboard) {
      const q = questions[currentIndex]
      // TTS read question in detected language
      const speakLang = detectQuestionLang(q.question, language)
      speakText(q.question, speakLang)
    }
  }, [currentIndex, questions, showCalibration, showScoreboard, language])

  // 3. Handle option charging (head tilting integration)
  useEffect(() => {
    // If already answered or in calibration, don't charge
    if (answered || showCalibration || showScoreboard || loadingQuestions || questions.length === 0) {
      if (chargeTimerRef.current) clearInterval(chargeTimerRef.current)
      return
    }

    // If showing explanation, bé can tilt head to any side for 1.2s to continue (Tiếp tục)
    if (showExplanation) {
      if (tiltDirection !== 'center') {
        if (!selectedOption) {
          setSelectedOption(tiltDirection)
          setChargePercent(0)
        }
        
        if (chargeTimerRef.current) clearInterval(chargeTimerRef.current)
        
        chargeTimerRef.current = setInterval(() => {
          setChargePercent(prev => {
            if (prev >= 100) {
              clearInterval(chargeTimerRef.current)
              // Trigger next question
              handleNextQuestion()
              return 0
            }
            return prev + 8.5 // ~1.2s to fill
          })
        }, 100)
      } else {
        setSelectedOption(null)
        setChargePercent(0)
        if (chargeTimerRef.current) clearInterval(chargeTimerRef.current)
      }
      return
    }

    // Normal game choice charging
    if (tiltDirection === 'left' || tiltDirection === 'right') {
      // Set or update active option
      if (selectedOption !== tiltDirection) {
        setSelectedOption(tiltDirection)
        setChargePercent(0)
      }

      if (chargeTimerRef.current) clearInterval(chargeTimerRef.current)

      chargeTimerRef.current = setInterval(() => {
        setChargePercent(prev => {
          if (prev >= 100) {
            clearInterval(chargeTimerRef.current)
            // Lock in the answer
            handleAnswer(tiltDirection)
            return 0
          }
          return prev + 8.5 // ~1.2 seconds holding time
        })
      }, 100)
    } else {
      // Returned to center, reset charging
      setSelectedOption(null)
      setChargePercent(0)
      if (chargeTimerRef.current) clearInterval(chargeTimerRef.current)
    }

    return () => {
      if (chargeTimerRef.current) clearInterval(chargeTimerRef.current)
    }
  }, [tiltDirection, selectedOption, answered, showCalibration, showExplanation, showScoreboard, loadingQuestions, questions])

  const handleAnswer = (choice) => {
    if (answeredRef.current) return
    answeredRef.current = true

    const currentQuestion = questions[currentIndex]
    setAnswered(choice)
    setChargePercent(0)

    const isCorrect = choice === currentQuestion.correct_option

    // Haptic feedback for mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(isCorrect ? [40, 50, 40] : [120, 60, 120])
      } catch (e) {
        // Ignore devices that block vibration without full gestures
      }
    }

    if (isCorrect) {
      playCorrectSound()
      triggerFireworks()
      setSessionPoints(prev => {
        const next = prev + 10
        sessionPointsRef.current = next
        return next
      })
      setCorrectCount(prev => {
        const next = prev + 1
        correctCountRef.current = next
        return next
      })
      
      // Auto move to next after 1.8 seconds
      setTimeout(() => {
        handleNextQuestion()
      }, 1800)
    } else {
      playIncorrectSound()
      setShowExplanation(true)
      // Read explanation
      speakText(currentQuestion.explanation || 'Tiếc quá, sai rồi!', 'vi')
    }
  }

  const handleNextQuestion = () => {
    answeredRef.current = false
    // Reset states
    setAnswered(null)
    setSelectedOption(null)
    setChargePercent(0)
    setShowExplanation(false)

    const currentIdx = currentIndexRef.current
    if (currentIdx + 1 < questions.length) {
      const nextIdx = currentIdx + 1
      currentIndexRef.current = nextIdx
      setCurrentIndex(nextIdx)
    } else {
      // End game
      handleEndGame()
    }
  }

  const handleEndGame = async () => {
    setShowScoreboard(true)
    const finalPoints = sessionPointsRef.current
    const finalCorrect = correctCountRef.current

    // Add points to user profile
    if (finalPoints > 0) {
      await addPoints(finalPoints)
    }
    // Increment streak
    if (finalCorrect >= 5) {
      await incrementStreak()
    }
  }

  const handleRepeat = () => {
    sessionPointsRef.current = 0
    correctCountRef.current = 0
    currentIndexRef.current = 0
    answeredRef.current = false
    setCurrentIndex(0)
    setSessionPoints(0)
    setCorrectCount(0)
    setAnswered(null)
    setSelectedOption(null)
    setChargePercent(0)
    setShowExplanation(false)
    setShowScoreboard(false)
    setShowCalibration(true)
  }

  const speakCurrentQuestion = () => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex]
      const speakLang = detectQuestionLang(q.question, language)
      speakText(q.question, speakLang)
    }
  }

  // 4. Render Loading Questions
  if (loadingQuestions) {
    return (
      <div className={styles.gameLayout} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary-color)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px', fontWeight: 600 }}>Gemini đang chuẩn bị các câu hỏi cho bé nhé...</p>
      </div>
    )
  }

  // Render Error
  if (errorMsg) {
    return (
      <div className={styles.gameLayout} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <p style={{ color: 'var(--incorrect-color)', fontWeight: 600, fontSize: '18px' }}>{errorMsg}</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button className="playful-btn" onClick={onBackToLobby}>Quay Lại</button>
        </div>
      </div>
    )
  }

  // Render Scoreboard
  if (showScoreboard) {
    return (
      <div className={styles.gameLayout}>
        <div className={styles.scoreboard}>
          <Sparkles size={48} color="var(--primary-color)" style={{ margin: '0 auto 12px' }} />
          <h2 className={styles.scoreboardTitle}>Chúc mừng bé hoàn thành!</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>Bé đã học thêm được nhiều từ vựng mới rồi đấy!</p>
          
          <div className={styles.scoreboardStats}>
            <div className={styles.scoreboardStat}>
              <span className={styles.statNum}>{correctCount}/10</span>
              <span className={styles.statLbl}>Trả lời đúng</span>
            </div>
            <div className={styles.scoreboardStat}>
              <span className={styles.statNum} style={{ color: 'var(--accent-color)' }}>+{sessionPoints}</span>
              <span className={styles.statLbl}>Điểm thưởng</span>
            </div>
          </div>

          <div className={styles.actionRow}>
            <button className="playful-btn playful-btn-secondary" onClick={handleRepeat} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={18} />
              <span>Chơi Lại</span>
            </button>
            <button className="playful-btn" onClick={onBackToLobby} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Home size={18} />
              <span>Trang Chủ</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className={styles.gameLayout}>
      {/* Game Header */}
      <header className={styles.gameHeader}>
        <button className={styles.quitBtn} onClick={onBackToLobby}>
          Dừng chơi
        </button>
        
        <div className={styles.progressContainer} title={`Câu hỏi ${currentIndex + 1}/10`}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>

        <div className={styles.scoreBadge}>
          <Trophy size={16} fill="var(--accent-color)" color="var(--accent-color)" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          <span>{sessionPoints} điểm</span>
        </div>
      </header>

      {/* Question Box */}
      {currentQuestion && (
        <section className={styles.questionBox}>
          <h2 className={styles.questionText}>{currentQuestion.question}</h2>
          <button className={styles.ttsBtn} onClick={speakCurrentQuestion} title="Nghe lại câu hỏi">
            <Volume2 size={20} />
          </button>
        </section>
      )}

      {/* Play Zone */}
      {currentQuestion && (
        <div className={styles.playZone}>
          {/* Left Answer Option */}
          <div 
            className={`${styles.optionBubble} ${styles.leftBubble} ${
              selectedOption === 'left' && !answered ? styles.bubbleTilting : ''
            } ${
              answered === 'left' 
                ? (currentQuestion.correct_option === 'left' ? styles.bubbleCorrect : styles.bubbleIncorrect)
                : (answered && currentQuestion.correct_option === 'left' ? styles.bubbleCorrect : '')
            }`}
            onClick={() => !answered && handleAnswer('left')}
          >
            <span className={styles.optionLabel}>Nghiêng Trái 👈</span>
            <span className={styles.optionText}>{currentQuestion.option_left}</span>
            {selectedOption === 'left' && !answered && (
              <svg className={styles.borderProgressSvg}>
                <rect
                  rx="26"
                  ry="26"
                  x="3"
                  y="3"
                  width="calc(100% - 6px)"
                  height="calc(100% - 6px)"
                  fill="none"
                  stroke="#339af0"
                  strokeWidth="6"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - chargePercent}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px #339af0)' }}
                />
              </svg>
            )}
          </div>

          {/* Center Webcam Preview */}
          <div className={styles.centerCamera}>
            <CameraView tracker={tracker} />
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
              {showExplanation ? 'Nghiêng đầu để tiếp tục!' : 'Nghiêng đầu Trái / Phải để chọn!'}
            </p>
          </div>

          {/* Right Answer Option */}
          <div 
            className={`${styles.optionBubble} ${styles.rightBubble} ${
              selectedOption === 'right' && !answered ? styles.bubbleTilting : ''
            } ${
              answered === 'right' 
                ? (currentQuestion.correct_option === 'right' ? styles.bubbleCorrect : styles.bubbleIncorrect)
                : (answered && currentQuestion.correct_option === 'right' ? styles.bubbleCorrect : '')
            }`}
            onClick={() => !answered && handleAnswer('right')}
          >
            <span className={styles.optionLabel}>Nghiêng Phải 👉</span>
            <span className={styles.optionText}>{currentQuestion.option_right}</span>
            {selectedOption === 'right' && !answered && (
              <svg className={styles.borderProgressSvg}>
                <rect
                  rx="26"
                  ry="26"
                  x="3"
                  y="3"
                  width="calc(100% - 6px)"
                  height="calc(100% - 6px)"
                  fill="none"
                  stroke="#ff922b"
                  strokeWidth="6"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - chargePercent}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px #ff922b)' }}
                />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Explanation Panel (shown when incorrect) */}
      {showExplanation && currentQuestion && (
        <section className={styles.explanationPanel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <XCircle color="var(--incorrect-color)" size={20} />
            <h4 style={{ color: 'var(--incorrect-color)', fontWeight: 700, margin: 0 }}>Sai mất rồi! Đáp án đúng là:</h4>
          </div>
          <p className={styles.explanationText}>
            <strong>
              {currentQuestion.correct_option === 'left' ? currentQuestion.option_left : currentQuestion.option_right}
            </strong>
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            {currentQuestion.explanation}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="playful-btn" onClick={handleNextQuestion} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', padding: '8px 20px' }}>
              <span>Tiếp tục</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* 🚀 Calibration & Ready Modal Overlay (Foolproof & Super Touch-Friendly for Mobile) */}
      {showCalibration && (
        <div className={styles.readyModalOverlay}>
          <div className={styles.readyModalCard}>
            <div className={styles.readyHeader}>
              <Sparkles size={28} color="#ffd43b" />
              <h2 className={styles.readyTitle}>Chào Bé Thám Hiểm! 🎒</h2>
            </div>
            
            <p className={styles.readySub}>
              Bé đã sẵn sàng khám phá bài học <strong>{level.toUpperCase()}</strong> chưa?
            </p>

            <div className={styles.readyCameraWrap}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <AvatarImage id={avatar} size={84} />
                <span style={{ position: 'absolute', bottom: 2, right: 2, background: '#51cf66', width: 18, height: 18, borderRadius: '50%', border: '3px solid white', boxShadow: '0 0 8px #51cf66' }} />
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-color)', margin: '8px 0 0 0' }}>
                🟢 Camera đã hoạt động sẵn sàng!
              </p>
            </div>

            <div className={styles.readyTips}>
              <div className={styles.readyTipItem}>
                <span>👈👉</span>
                <span>Nghiêng đầu Trái / Phải để chọn</span>
              </div>
              <div className={styles.readyTipItem}>
                <span>👆</span>
                <span>Hoặc chạm ngón tay vào đáp án</span>
              </div>
            </div>

            <div className={styles.readyActions}>
              <button 
                className="playful-btn"
                onClick={() => {
                  tracker.calibrate()
                  setShowCalibration(false)
                }}
                style={{ 
                  width: '100%', 
                  fontSize: '17px', 
                  padding: '16px', 
                  borderRadius: '22px',
                  boxShadow: '0 8px 24px rgba(85, 166, 48, 0.4)',
                  touchAction: 'manipulation',
                  cursor: 'pointer'
                }}
              >
                🚀 SẴN SÀNG BẮT ĐẦU!
              </button>

              <button 
                className="playful-btn playful-btn-secondary"
                onClick={() => setShowCalibration(false)}
                style={{ 
                  width: '100%', 
                  fontSize: '13px', 
                  padding: '11px', 
                  borderRadius: '16px',
                  marginTop: '8px',
                  touchAction: 'manipulation',
                  cursor: 'pointer'
                }}
              >
                👆 Bỏ qua Camera (Chơi bằng cảm ứng tay)
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className={styles.canvasOverlay} />
    </div>
  )
}
