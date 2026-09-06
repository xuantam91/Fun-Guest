import React from 'react'
import styles from './ThemeBackground.module.css'

export default function ThemeBackground({ theme = 'forest' }) {
  if (theme === 'sea') {
    return (
      <div className={styles.themeContainer} aria-hidden="true">
        {/* Ocean Bubbles */}
        <div className={styles.bubble} style={{ width: 18, height: 18, left: '10%', animationDuration: '9s', animationDelay: '0s' }} />
        <div className={styles.bubble} style={{ width: 26, height: 26, left: '25%', animationDuration: '12s', animationDelay: '2s' }} />
        <div className={styles.bubble} style={{ width: 14, height: 14, left: '45%', animationDuration: '8s', animationDelay: '1s' }} />
        <div className={styles.bubble} style={{ width: 32, height: 32, left: '70%', animationDuration: '14s', animationDelay: '3s' }} />
        <div className={styles.bubble} style={{ width: 20, height: 20, left: '85%', animationDuration: '11s', animationDelay: '0.5s' }} />

        {/* Swimming Fish & Marine Life */}
        <div className={styles.swimmingFish} style={{ top: '22%', animationDelay: '0s' }}>🐠</div>
        <div className={styles.swimmingFishLeft} style={{ top: '65%', animationDelay: '3s' }}>🐬</div>
        <div className={styles.swimmingFish} style={{ top: '78%', animationDelay: '7s' }}>🐙</div>
        <div className={styles.swimmingFishLeft} style={{ top: '35%', animationDelay: '10s' }}>🪼</div>
      </div>
    )
  }

  if (theme === 'space') {
    return (
      <div className={styles.themeContainer} aria-hidden="true">
        {/* Twinkling Stars */}
        <div className={styles.star} style={{ top: '12%', left: '15%', animationDelay: '0s' }}>⭐</div>
        <div className={styles.star} style={{ top: '25%', left: '80%', animationDelay: '0.8s' }}>✨</div>
        <div className={styles.star} style={{ top: '60%', left: '10%', animationDelay: '1.4s' }}>🌟</div>
        <div className={styles.star} style={{ top: '75%', left: '88%', animationDelay: '0.4s' }}>✨</div>
        <div className={styles.star} style={{ top: '40%', left: '92%', animationDelay: '1.8s' }}>⭐</div>

        {/* Orbiting Rocket & Planets */}
        <div className={styles.rocket}>🚀</div>
        <div className={styles.planet} style={{ top: '15%', right: '8%' }}>🪐</div>
        <div className={styles.planet} style={{ bottom: '18%', left: '6%', fontSize: 38 }}>🌍</div>
        <div className={styles.comet}>☄️</div>
      </div>
    )
  }

  // Default: Forest Theme (Rừng Xanh)
  return (
    <div className={styles.themeContainer} aria-hidden="true">
      {/* Floating Leaves */}
      <div className={styles.leaf} style={{ left: '8%', animationDuration: '9s', animationDelay: '0s' }}>🍃</div>
      <div className={styles.leaf} style={{ left: '30%', animationDuration: '13s', animationDelay: '3s' }}>🌿</div>
      <div className={styles.leaf} style={{ left: '65%', animationDuration: '10s', animationDelay: '1s' }}>🌱</div>
      <div className={styles.leaf} style={{ left: '88%', animationDuration: '12s', animationDelay: '4s' }}>🍃</div>

      {/* Glowing Fireflies */}
      <div className={styles.firefly} style={{ top: '20%', left: '18%', animationDelay: '0s' }} />
      <div className={styles.firefly} style={{ top: '45%', left: '82%', animationDelay: '1.2s' }} />
      <div className={styles.firefly} style={{ top: '70%', left: '25%', animationDelay: '2.1s' }} />
      <div className={styles.firefly} style={{ top: '35%', left: '72%', animationDelay: '0.6s' }} />

      {/* Floating Butterfly */}
      <div className={styles.butterfly}>🦋</div>
    </div>
  )
}
