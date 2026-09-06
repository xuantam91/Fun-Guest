import React from 'react'
import styles from './ThemeBackground.module.css'

export default function ThemeBackground({ theme = 'forest' }) {
  if (theme === 'sea') {
    return (
      <div className={styles.themeContainer} aria-hidden="true">
        {/* Ocean Bubbles */}
        <div className={styles.bubble} style={{ width: 18, height: 18, left: '8%', animationDuration: '9s', animationDelay: '0s' }} />
        <div className={styles.bubble} style={{ width: 28, height: 28, left: '22%', animationDuration: '12s', animationDelay: '2s' }} />
        <div className={styles.bubble} style={{ width: 14, height: 14, left: '42%', animationDuration: '8s', animationDelay: '1s' }} />
        <div className={styles.bubble} style={{ width: 34, height: 34, left: '68%', animationDuration: '14s', animationDelay: '3s' }} />
        <div className={styles.bubble} style={{ width: 22, height: 22, left: '84%', animationDuration: '11s', animationDelay: '0.5s' }} />
        <div className={styles.bubble} style={{ width: 16, height: 16, left: '94%', animationDuration: '10s', animationDelay: '4s' }} />

        {/* Swimming Marine Life (Diverse Creatures) */}
        <div className={styles.swimmingFish} style={{ top: '15%', animationDelay: '0s', fontSize: 36 }}>🐠</div>
        <div className={styles.swimmingFishLeft} style={{ top: '28%', animationDelay: '4s', fontSize: 40 }}>🐬</div>
        <div className={styles.swimmingFish} style={{ top: '48%', animationDelay: '8s', fontSize: 44 }}>🐳</div>
        <div className={styles.swimmingFishLeft} style={{ top: '62%', animationDelay: '2s', fontSize: 34 }}>🐙</div>
        <div className={styles.swimmingFish} style={{ top: '75%', animationDelay: '11s', fontSize: 32 }}>🐢</div>
        <div className={styles.swimmingFishLeft} style={{ top: '85%', animationDelay: '6s', fontSize: 30 }}>🦀</div>
        <div className={styles.swimmingFish} style={{ top: '35%', animationDelay: '14s', fontSize: 32 }}>🪼</div>
        <div className={styles.swimmingFishLeft} style={{ top: '52%', animationDelay: '9s', fontSize: 30 }}>🐡</div>

        {/* Coral & Seabed decor */}
        <div className={styles.seabedDecor} style={{ bottom: '2%', left: '4%', fontSize: 36 }}>🪸</div>
        <div className={styles.seabedDecor} style={{ bottom: '3%', right: '5%', fontSize: 34 }}>🐚</div>
        <div className={styles.seabedDecor} style={{ bottom: '1%', left: '50%', fontSize: 32 }}>🦪</div>
      </div>
    )
  }

  if (theme === 'space') {
    return (
      <div className={styles.themeContainer} aria-hidden="true">
        {/* Twinkling Stars & Sparkles */}
        <div className={styles.star} style={{ top: '10%', left: '12%', animationDelay: '0s' }}>⭐</div>
        <div className={styles.star} style={{ top: '22%', left: '78%', animationDelay: '0.8s' }}>✨</div>
        <div className={styles.star} style={{ top: '55%', left: '8%', animationDelay: '1.4s' }}>🌟</div>
        <div className={styles.star} style={{ top: '72%', left: '86%', animationDelay: '0.4s' }}>✨</div>
        <div className={styles.star} style={{ top: '38%', left: '92%', animationDelay: '1.8s' }}>⭐</div>
        <div className={styles.star} style={{ top: '82%', left: '35%', animationDelay: '1.1s' }}>💫</div>
        <div className={styles.star} style={{ top: '18%', left: '45%', animationDelay: '2.2s' }}>✨</div>

        {/* Orbiting Rocket, UFO, Astronaut & Planets */}
        <div className={styles.rocket}>🚀</div>
        <div className={styles.ufo}>🛸</div>
        <div className={styles.astronaut}>👨‍🚀</div>
        <div className={styles.alien}>👾</div>
        
        <div className={styles.planet} style={{ top: '12%', right: '6%' }}>🪐</div>
        <div className={styles.planet} style={{ bottom: '15%', left: '5%', fontSize: 42 }}>🌍</div>
        <div className={styles.planet} style={{ top: '42%', left: '3%', fontSize: 32 }}>🌙</div>
        <div className={styles.planet} style={{ top: '68%', right: '12%', fontSize: 36 }}>☀️</div>

        <div className={styles.comet}>☄️</div>
      </div>
    )
  }

  // Default: Forest Theme (Rừng Xanh)
  return (
    <div className={styles.themeContainer} aria-hidden="true">
      {/* Floating Leaves & Flowers */}
      <div className={styles.leaf} style={{ left: '6%', animationDuration: '9s', animationDelay: '0s' }}>🍃</div>
      <div className={styles.leaf} style={{ left: '28%', animationDuration: '13s', animationDelay: '3s' }}>🌿</div>
      <div className={styles.leaf} style={{ left: '52%', animationDuration: '11s', animationDelay: '5s' }}>🌸</div>
      <div className={styles.leaf} style={{ left: '72%', animationDuration: '10s', animationDelay: '1s' }}>🍂</div>
      <div className={styles.leaf} style={{ left: '90%', animationDuration: '12s', animationDelay: '4s' }}>🍄</div>

      {/* Glowing Fireflies & Bees */}
      <div className={styles.firefly} style={{ top: '18%', left: '15%', animationDelay: '0s' }} />
      <div className={styles.firefly} style={{ top: '42%', left: '85%', animationDelay: '1.2s' }} />
      <div className={styles.firefly} style={{ top: '68%', left: '22%', animationDelay: '2.1s' }} />
      <div className={styles.firefly} style={{ top: '32%', left: '68%', animationDelay: '0.6s' }} />
      <div className={styles.bee} style={{ top: '25%', left: '40%' }}>🐝</div>

      {/* Floating Butterfly & Birds */}
      <div className={styles.butterfly}>🦋</div>
      <div className={styles.bird}>🐦</div>

      {/* Cute Peeking Forest Animals at Edges */}
      <div className={styles.forestAnimal} style={{ top: '14%', right: '2%', fontSize: 34 }}>🦉</div>
      <div className={styles.forestAnimal} style={{ bottom: '12%', left: '2%', fontSize: 36, transform: 'scaleX(-1)' }}>🐿️</div>
      <div className={styles.forestAnimal} style={{ bottom: '25%', right: '3%', fontSize: 32 }}>🦊</div>
      <div className={styles.forestAnimal} style={{ top: '60%', left: '1%', fontSize: 34, transform: 'scaleX(-1)' }}>🐻</div>
    </div>
  )
}
