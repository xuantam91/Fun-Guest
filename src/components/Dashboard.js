import React from 'react'
import { useApp } from '@/context/AppContext'
import { AVATAR_LIST, AvatarImage } from './Avatars'
import Leaderboard from './Leaderboard'
import styles from './Dashboard.module.css'
import { Flame, Trophy, Palette, Smile, Sparkles, Sun, Moon, LogIn, LogOut, Key, HelpCircle, BookOpen, X, CheckCircle2, Shield, Heart } from 'lucide-react'

export default function Dashboard({ onSelectLevel }) {
  const {
    user,
    theme,
    mode,
    avatar,
    score,
    streak,
    loading,
    customApiKey,
    saveCustomApiKey,
    setTheme,
    toggleMode,
    setAvatar,
    loginWithGoogle,
    logout
  } = useApp()

  const englishLevels = [
    { code: 'starters', name: 'Starters', desc: 'Từ vựng Cambridge cấp độ 1', icon: '🐣' },
    { code: 'movers', name: 'Movers', desc: 'Từ vựng Cambridge cấp độ 2', icon: '🐰' },
    { code: 'flyers', name: 'Flyers', desc: 'Từ vựng Cambridge cấp độ 3', icon: '🦜' },
    { code: 'a1', name: 'A1 Primary', desc: 'Tiếng Anh sơ cấp A1', icon: '🎈' },
    { code: 'a2', name: 'A2 Key', desc: 'Tiếng Anh sơ cấp A2', icon: '🛹' },
    { code: 'b1', name: 'B1 Preliminary', desc: 'Tiếng Anh trung cấp B1', icon: '🚀' },
    { code: 'b2', name: 'B2 First', desc: 'Tiếng Anh trung cấp B2', icon: '🏆' },
  ]

  const chineseLevels = [
    { code: 'hsk1', name: 'HSK 1', desc: 'Chữ Hán & phiên âm cơ bản nhất', icon: '🍎' },
    { code: 'hsk2', name: 'HSK 2', desc: 'Giao tiếp hàng ngày cơ bản', icon: '🚲' },
    { code: 'hsk3', name: 'HSK 3', desc: 'Đọc hiểu & hội thoại ngắn', icon: '🎒' },
    { code: 'hsk4', name: 'HSK 4', desc: 'Diễn đạt ý kiến trôi chảy', icon: '💬' },
    { code: 'hsk5', name: 'HSK 5', desc: 'Đọc báo & xem phim tiếng Trung', icon: '🎬' },
    { code: 'life', name: 'Đời Sống', desc: 'Từ vựng sinh hoạt thường ngày', icon: '🏡' },
    { code: 'office', name: 'Văn Phòng', desc: 'Công sở & hành chính cơ bản', icon: '💻' },
    { code: 'factory', name: 'Nhà Máy', desc: 'Sản xuất, công xưởng & kỹ thuật', icon: '⚙️' },
  ]

  const mathLevels = [
    { code: 'grade1', name: 'Toán Lớp 1', desc: 'Cộng trừ phạm vi 20, đếm số', icon: '🔢' },
    { code: 'grade2', name: 'Toán Lớp 2', desc: 'Bảng nhân chia 2-5, cộng trừ 100', icon: '🧮' },
    { code: 'grade3', name: 'Toán Lớp 3', desc: 'Tính chu vi, phân số cơ bản', icon: '📐' },
    { code: 'grade4', name: 'Toán Lớp 4', desc: 'Tìm X, trung bình cộng, phân số', icon: '📊' },
    { code: 'grade5', name: 'Toán Lớp 5', desc: 'Diện tích hình tròn, phần trăm, vận tốc', icon: '📈' },
  ]

  const [inputKey, setInputKey] = React.useState('')
  const [testStatus, setTestStatus] = React.useState('idle') // 'idle' | 'testing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = React.useState('')
  const [showHelp, setShowHelp] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('all') // 'all' | 'en' | 'zh' | 'math' | 'custom' | 'rank'
  
  // Modals
  const [showKeyModal, setShowKeyModal] = React.useState(false)
  const [showGuideModal, setShowGuideModal] = React.useState(false)

  // Sync state with customApiKey when customApiKey changes/loads
  React.useEffect(() => {
    setInputKey(customApiKey || '')
  }, [customApiKey])

  const handleTestAndSave = async () => {
    if (!inputKey.trim()) {
      saveCustomApiKey('')
      setTestStatus('success')
      setErrorMessage('')
      setShowKeyModal(false)
      return
    }

    setTestStatus('testing')
    try {
      const response = await fetch('/api/questions/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: inputKey.trim() })
      })
      const data = await response.json()
      if (response.ok && data.success) {
        saveCustomApiKey(inputKey)
        setTestStatus('success')
        setErrorMessage('')
        setTimeout(() => setShowKeyModal(false), 800)
      } else {
        setTestStatus('error')
        setErrorMessage(data.error || 'API Key không hợp lệ.')
      }
    } catch (err) {
      setTestStatus('error')
      setErrorMessage('Không thể kết nối đến máy chủ.')
    }
  }

  const handleClearKey = () => {
    saveCustomApiKey('')
    setInputKey('')
    setTestStatus('idle')
    setErrorMessage('')
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary-color, #55a630)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px', fontWeight: 600 }}>Đang mở thế giới của bé...</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}} />
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      {/* 1. Header Section */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <img 
            src="/logo.svg" 
            alt="Globy Logo" 
            width={52} 
            height={52} 
            style={{ 
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))', 
              animation: 'float 3s ease-in-out infinite',
              flexShrink: 0
            }} 
          />
          <div>
            <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>GLOBY Fun Quest</span>
              <Sparkles size={18} color="#ffd43b" />
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Chào mừng</span>
              <AvatarImage id={avatar} size={22} />
              <strong style={{ color: 'var(--text-color)' }}>
                {user ? (user.user_metadata?.full_name || user.email) : 'Bé Thám Hiểm'}!
              </strong>
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          {/* Streak */}
          <div className={styles.statItem} title="Chuỗi ngày học liên tục!">
            <Flame size={18} color="#ff922b" fill="#ff922b" />
            <span className={styles.statValue}>{streak} ngày</span>
          </div>

          {/* Points */}
          <div className={styles.statItem} title="Tổng điểm của bé">
            <Trophy size={18} color="#fcc419" fill="#fcc419" />
            <span className={styles.statValue}>{score} đ</span>
          </div>

          {/* Header Action Buttons: Guide, Key & Auth */}
          <div className={styles.headerActions}>
            {/* Guide Button */}
            <button 
              className={styles.guideHeaderBtn} 
              onClick={() => setShowGuideModal(true)}
              title="Hướng dẫn cách chơi cho bé"
            >
              <BookOpen size={16} color="var(--primary-color)" />
              <span className={styles.guideBtnText}>Hướng Dẫn</span>
            </button>

            {/* Gemini API Key Button */}
            <button 
              className={styles.iconHeaderBtn} 
              onClick={() => setShowKeyModal(true)}
              title={customApiKey ? "Đang dùng Gemini API Key cá nhân" : "Cấu hình Gemini API Key"}
            >
              {customApiKey && <span className={styles.activeIndicatorDot} />}
              <Key size={17} />
            </button>

            {/* Auth Button */}
            {user ? (
              <button className={styles.logoutBtn} onClick={logout} title="Đăng xuất tài khoản">
                <LogOut size={16} />
              </button>
            ) : (
              <button className="playful-btn playful-btn-secondary" onClick={loginWithGoogle} style={{ fontSize: '13px', padding: '7px 14px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LogIn size={14} />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Category Navigation Bar (Mobile & Desktop) */}
      <nav className={styles.tabBar} aria-label="Danh mục học tập">
        <button
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span>🌟</span>
          <span>Tất Cả</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'en' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('en')}
        >
          <span>🇬🇧</span>
          <span>Tiếng Anh</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'zh' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('zh')}
        >
          <span>🇨🇳</span>
          <span>Tiếng Trung</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'math' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('math')}
        >
          <span>🔢</span>
          <span>Toán Học</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'custom' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <span>🎨</span>
          <span>Tùy Chỉnh</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'rank' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('rank')}
        >
          <span>🏆</span>
          <span>Xếp Hạng</span>
        </button>
      </nav>

      {/* 2. Customizer (Themes, Mode, Avatars, Streak) */}
      {(activeTab === 'all' || activeTab === 'custom') && (
        <section className={styles.customizer}>
          {/* Theme Card */}
          <div className={styles.customizerCard}>
            <h3 className={styles.cardTitle}>
              <Palette size={18} />
              <span>Đổi Giao Diện</span>
            </h3>
            <div className={styles.themeGrid}>
              <button
                className={`${styles.themeBtn} ${theme === 'forest' ? styles.themeBtnActive : ''}`}
                onClick={() => setTheme('forest')}
              >
                🌳 Rừng Xanh
              </button>
              <button
                className={`${styles.themeBtn} ${theme === 'sea' ? styles.themeBtnActive : ''}`}
                onClick={() => setTheme('sea')}
              >
                🌊 Đại Dương
              </button>
              <button
                className={`${styles.themeBtn} ${theme === 'space' ? styles.themeBtnActive : ''}`}
                onClick={() => setTheme('space')}
              >
                🚀 Vũ Trụ
              </button>
            </div>

            <div className={styles.modeToggles}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Chế độ Sáng / Tối:</span>
              <button className={styles.toggleBtn} onClick={toggleMode} title={mode === 'light' ? 'Chế độ Tối' : 'Chế độ Sáng'}>
                {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>

          {/* Avatar Card */}
          <div className={styles.customizerCard}>
            <h3 className={styles.cardTitle}>
              <Smile size={18} />
              <span>Chọn Bạn Đồng Hành</span>
            </h3>
            <div className={styles.avatarGrid}>
              {AVATAR_LIST.map((av) => (
                <button
                  key={av.id}
                  className={`${styles.avatarBtn} ${avatar === av.id ? styles.avatarBtnActive : ''}`}
                  onClick={() => setAvatar(av.id)}
                  title={av.name}
                >
                  <AvatarImage id={av.id} size={54} />
                </button>
              ))}
            </div>
          </div>

          {/* Streak Card */}
          <div className={styles.customizerCard}>
            <h3 className={styles.cardTitle}>
              <Flame size={18} color="#ff922b" fill="#ff922b" />
              <span>Thử Thách Tuần</span>
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Bé học mỗi ngày để duy trì ngọn lửa học tập nhé!
            </p>
            <div className={styles.weekRow}>
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => {
                const todayDate = new Date()
                const today = todayDate.getDay() 
                const normalizedToday = today === 0 ? 6 : today - 1
                
                let isActive = false
                if (streak > 0) {
                  const diff = normalizedToday - idx
                  if (diff >= 0 && diff < streak) {
                    isActive = true
                  }
                }

                return (
                  <div key={day} className={styles.dayCol}>
                    <span className={styles.dayLabel}>{day}</span>
                    <div className={`${styles.dayCircle} ${isActive ? styles.dayCircleActive : ''} ${normalizedToday === idx ? styles.dayCircleToday : ''}`}>
                      {isActive ? '🔥' : '⭐'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. English levels */}
      {(activeTab === 'all' || activeTab === 'en') && (
        <section className={styles.questSection}>
          <h2 className={styles.sectionHeading}>
            <Sparkles size={22} color="var(--primary-color)" />
            <span>English Quest (Tiếng Anh)</span>
          </h2>
          <div className={styles.grid}>
            {englishLevels.map((lvl) => (
              <div
                key={lvl.code}
                className={styles.questCard}
                onClick={() => onSelectLevel('en', lvl.code)}
              >
                <span className={styles.cardIcon}>{lvl.icon}</span>
                <h3 className={styles.cardLevel}>{lvl.name}</h3>
                <p className={styles.cardDesc}>{lvl.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Chinese levels */}
      {(activeTab === 'all' || activeTab === 'zh') && (
        <section className={styles.questSection}>
          <h2 className={styles.sectionHeading}>
            <Sparkles size={22} color="var(--accent-color)" />
            <span>Chinese Quest (Tiếng Trung)</span>
          </h2>
          <div className={styles.grid}>
            {chineseLevels.map((lvl) => (
              <div
                key={lvl.code}
                className={styles.questCard}
                onClick={() => onSelectLevel('zh', lvl.code)}
              >
                <span className={styles.cardIcon}>{lvl.icon}</span>
                <h3 className={styles.cardLevel}>{lvl.name}</h3>
                <p className={styles.cardDesc}>{lvl.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Math Quest levels */}
      {(activeTab === 'all' || activeTab === 'math') && (
        <section className={styles.questSection}>
          <h2 className={styles.sectionHeading}>
            <Sparkles size={22} color="#fd7e14" />
            <span>Math Quest (Toán Tiểu Học)</span>
          </h2>
          <div className={styles.grid}>
            {mathLevels.map((lvl) => (
              <div
                key={lvl.code}
                className={styles.questCard}
                onClick={() => onSelectLevel('math', lvl.code)}
              >
                <span className={styles.cardIcon}>{lvl.icon}</span>
                <h3 className={styles.cardLevel}>{lvl.name}</h3>
                <p className={styles.cardDesc}>{lvl.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Leaderboard Section */}
      {(activeTab === 'all' || activeTab === 'rank') && (
        <section style={{ marginTop: '24px' }}>
          <Leaderboard />
        </section>
      )}

      {/* 7. Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <img src="/logo.svg" alt="Globy Logo" width={36} height={36} />
            <span>GLOBY Fun Quest</span>
          </div>

          <p className={styles.footerDesc}>
            Nền tảng trò chơi học tập tương tác bằng cử chỉ AI dành riêng cho trẻ em. Giúp bé tự tin chinh phục Tiếng Anh Cambridge, Tiếng Trung HSK và Toán học tư duy.
          </p>

          <div className={styles.footerTip}>
            <span>💡</span>
            <span>Lời khuyên: Nhắc bé ngồi cách màn hình 50cm và nghỉ ngơi sau mỗi 20 phút nhé!</span>
          </div>

          <div className={styles.footerTechRow}>
            <span className={styles.techBadge}>🤖 Google Gemini AI</span>
            <span className={styles.techBadge}>📹 MediaPipe Vision</span>
            <span className={styles.techBadge}>🗄️ Supabase Cloud DB</span>
            <span className={styles.techBadge}>🔊 Web Speech TTS</span>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2026 GLOBY Fun Quest. Thiết kế với <Heart size={12} fill="#ff6b6b" color="#ff6b6b" style={{ display: 'inline', verticalAlign: 'middle' }} /> dành cho các bé.</p>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Cấu hình Gemini API Key */}
      {showKeyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowKeyModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setShowKeyModal(false)}>
              <X size={18} />
            </button>

            <h3 className={styles.modalTitle}>
              <Key size={22} color="var(--primary-color)" />
              <span>Cấu Hình Gemini API Key</span>
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Hệ thống đã nạp sẵn 37.000+ câu hỏi miễn phí. Nếu muốn dùng AI tự sinh thêm câu hỏi cá nhân hóa, bạn có thể nhập Gemini API Key của bạn dưới đây:
            </p>

            <div style={{ marginBottom: '14px' }}>
              <input
                type="password"
                placeholder="Nhập Gemini API Key (bắt đầu bằng AIzaSy...)"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: '2px solid var(--card-border)',
                  backgroundColor: 'var(--bg-gradient)',
                  color: 'var(--text-color)',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <button
                className="playful-btn"
                onClick={handleTestAndSave}
                disabled={testStatus === 'testing'}
                style={{
                  flex: 1,
                  fontSize: '13px',
                  padding: '10px',
                  borderRadius: '14px'
                }}
              >
                {testStatus === 'testing' ? '⏳ Đang kiểm tra...' : 'Lưu & Sử Dụng'}
              </button>
              {customApiKey && (
                <button
                  className="playful-btn playful-btn-secondary"
                  onClick={handleClearKey}
                  style={{
                    fontSize: '13px',
                    padding: '10px 14px',
                    borderRadius: '14px'
                  }}
                >
                  Xóa Khóa
                </button>
              )}
            </div>

            {/* Trạng thái key */}
            <div style={{ fontSize: '13px', fontWeight: 600, padding: '8px 12px', background: 'var(--bg-gradient)', borderRadius: '12px', marginBottom: '12px' }}>
              <span>Trạng thái: </span>
              {testStatus === 'testing' && <span style={{ color: 'var(--text-muted)' }}>⏳ Đang kiểm tra kết nối...</span>}
              {testStatus === 'success' && <span style={{ color: 'var(--correct-color, #2b8a3e)' }}>✅ Khóa hoạt động tốt!</span>}
              {testStatus === 'error' && <span style={{ color: 'var(--incorrect-color, #e03131)' }}>❌ {errorMessage}</span>}
              {testStatus === 'idle' && (
                customApiKey ? (
                  <span style={{ color: 'var(--correct-color, #2b8a3e)' }}>🔑 Đang dùng khóa cá nhân</span>
                ) : (
                  <span style={{ color: 'var(--primary-color)' }}>☁️ Đang dùng khóa máy chủ mặc định</span>
                )
              )}
            </div>

            <div style={{ borderTop: '1px dashed var(--card-border)', paddingTop: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Chưa có khóa? </span>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--primary-color)', fontWeight: 700, textDecoration: 'underline' }}
              >
                Lấy API Key miễn phí tại Google AI Studio ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Hướng Dẫn Cách Chơi Cho Bé (Guide) */}
      {showGuideModal && (
        <div className={styles.modalOverlay} onClick={() => setShowGuideModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setShowGuideModal(false)}>
              <X size={18} />
            </button>

            <h3 className={styles.modalTitle}>
              <BookOpen size={22} color="var(--primary-color)" />
              <span>Hướng Dẫn Bé Phiêu Lưu! 🚀</span>
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Chỉ với 4 bước đơn giản, bé sẽ sẵn sàng bắt đầu hành trình:
            </p>

            <div className={styles.guideSteps}>
              <div className={styles.guideStep}>
                <div className={styles.guideStepIcon}>📷</div>
                <div>
                  <h4 className={styles.guideStepTitle}>Bước 1: Cho Phép Camera</h4>
                  <p className={styles.guideStepDesc}>Bấm "Cho phép" khi trình duyệt hỏi quyền camera để AI nhận diện khuôn mặt bé.</p>
                </div>
              </div>

              <div className={styles.guideStep}>
                <div className={styles.guideStepIcon}>🧘</div>
                <div>
                  <h4 className={styles.guideStepTitle}>Bước 2: Ngồi Thẳng Thắn</h4>
                  <p className={styles.guideStepDesc}>Ngồi thẳng lưng, đối diện camera cách màn hình khoảng 50cm trong không gian đủ ánh sáng.</p>
                </div>
              </div>

              <div className={styles.guideStep}>
                <div className={styles.guideStepIcon}>👈👉</div>
                <div>
                  <h4 className={styles.guideStepTitle}>Bước 3: Nghiêng Đầu Chọn Đáp Án</h4>
                  <p className={styles.guideStepDesc}>Đọc câu hỏi, nghiêng đầu sang <strong>Trái</strong> hoặc <strong>Phải</strong> và giữ 1 giây (hoặc chạm ngón tay vào thẻ).</p>
                </div>
              </div>

              <div className={styles.guideStep}>
                <div className={styles.guideStepIcon}>🌟</div>
                <div>
                  <h4 className={styles.guideStepTitle}>Bước 4: Thu Thập Điểm & Ngọn Lửa</h4>
                  <p className={styles.guideStepDesc}>Mỗi câu đúng nhận ngay 10 điểm! Học mỗi ngày để giữ ngọn lửa Streak và leo top vinh danh!</p>
                </div>
              </div>
            </div>

            <button
              className="playful-btn"
              onClick={() => setShowGuideModal(false)}
              style={{ width: '100%', fontSize: '15px', padding: '12px', borderRadius: '18px' }}
            >
              Bé Đã Hiểu & Sẵn Sàng! 🎯
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
