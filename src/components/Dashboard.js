import React from 'react'
import { useApp } from '@/context/AppContext'
import { AVATAR_LIST, AvatarImage } from './Avatars'
import Leaderboard from './Leaderboard'
import styles from './Dashboard.module.css'
import { Flame, Trophy, Palette, Smile, Sparkles, Sun, Moon, LogIn, LogOut, Key, HelpCircle, Globe } from 'lucide-react'

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

  // Sync state with customApiKey when customApiKey changes/loads
  React.useEffect(() => {
    setInputKey(customApiKey || '')
  }, [customApiKey])

  const handleTestAndSave = async () => {
    if (!inputKey.trim()) {
      saveCustomApiKey('')
      setTestStatus('success')
      setErrorMessage('')
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
          <AvatarImage id={avatar} size={48} />
          <div>
            <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={26} className={styles.globeIcon} style={{ animation: 'spinGlobe 8s linear infinite', color: 'var(--primary-color)' }} />
              <span>GLOBY Fun Quest</span>
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Chào mừng {user ? (user.user_metadata?.full_name || user.email) : 'Bé Thám Hiểm'}!
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          {/* Streak */}
          <div className={styles.statItem} title="Chuỗi ngày học liên tục!">
            <Flame size={20} color="#ff922b" fill="#ff922b" />
            <span className={styles.statValue}>{streak} ngày</span>
          </div>

          {/* Points */}
          <div className={styles.statItem} title="Tổng điểm của bé">
            <Trophy size={20} color="#fcc419" fill="#fcc419" />
            <span className={styles.statValue}>{score} điểm</span>
          </div>

          {/* Auth Area */}
          <div className={styles.authArea}>
            {user ? (
              <button className={styles.logoutBtn} onClick={logout} title="Đăng xuất">
                <LogOut size={16} />
              </button>
            ) : (
              <button className="playful-btn playful-btn-secondary styles_loginBtn__..." onClick={loginWithGoogle} style={{ fontSize: '13px', padding: '6px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LogIn size={14} />
                <span>Lưu tiến trình</span>
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

      {/* 2. Customizer (Themes, Mode, Avatars) */}
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
              // Get current day of week (0 = Sunday, 1 = Monday...)
              const todayDate = new Date()
              const today = todayDate.getDay() 
              const normalizedToday = today === 0 ? 6 : today - 1 // Mon=0, Tue=1... Sun=6
              
              let isActive = false
              if (streak > 0) {
                // Mock week visualization based on current streak
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

        {/* Gemini API Key Card */}
        <div className={styles.customizerCard}>
          <h3 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={18} />
              <span>Cấu Hình Gemini API</span>
            </span>
            <button 
              onClick={() => setShowHelp(!showHelp)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', padding: 0, display: 'flex', alignItems: 'center' }}
              title="Hướng dẫn lấy API Key"
            >
              <HelpCircle size={18} />
            </button>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {showHelp && (
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                lineHeight: 1.4,
                border: '1px dashed var(--card-border)'
              }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Cách lấy API Key miễn phí:</strong>
                1. Truy cập <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: 'bold', textDecoration: 'underline' }}>Google AI Studio ↗</a><br />
                2. Đăng nhập tài khoản Google của bạn.<br />
                3. Nhấn nút <strong>"Get API key"</strong> ở góc trái.<br />
                4. Nhấn <strong>"Create API key"</strong>, sao chép khóa (bắt đầu bằng <code>AIzaSy...</code>) và dán xuống ô dưới đây.
              </div>
            )}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              Nếu khóa mặc định hết hạn mức (Quota 429), bạn có thể nạp khóa Gemini API cá nhân của bạn ở đây:
            </p>
            
            <input
              type="password"
              placeholder="Nhập Gemini API Key (AIzaSy...)"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '12px',
                border: '2px solid var(--card-border)',
                backgroundColor: 'var(--bg-gradient)',
                color: 'var(--text-color)',
                fontSize: '13px',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="playful-btn"
                onClick={handleTestAndSave}
                disabled={testStatus === 'testing'}
                style={{
                  flex: 1,
                  fontSize: '12px',
                  padding: '8px',
                  borderRadius: '12px'
                }}
              >
                {testStatus === 'testing' ? 'Đang thử...' : 'Lưu & Sử Dụng'}
              </button>
              {customApiKey && (
                <button
                  className="playful-btn playful-btn-secondary"
                  onClick={handleClearKey}
                  style={{
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '12px'
                  }}
                >
                  Xóa Khóa
                </button>
              )}
            </div>

            {/* API Key status indicator */}
            <div style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span>Trạng thái:</span>
              {testStatus === 'testing' && <span style={{ color: 'var(--text-muted)' }}>⏳ Đang kiểm tra...</span>}
              {testStatus === 'success' && <span style={{ color: 'var(--correct-color, #2b8a3e)' }}>✅ Hoạt động tốt!</span>}
              {testStatus === 'error' && <span style={{ color: 'var(--incorrect-color, #e03131)', fontSize: '11px' }}>❌ Lỗi: {errorMessage.slice(0, 24)}...</span>}
              {testStatus === 'idle' && (
                customApiKey ? (
                  <span style={{ color: 'var(--correct-color, #2b8a3e)' }}>🔑 Đang dùng khóa cá nhân</span>
                ) : (
                  <span style={{ color: 'var(--primary-color)' }}>☁️ Đang dùng khóa máy chủ</span>
                )
              )}
            </div>
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
    </div>
  )
}

