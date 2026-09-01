'use client'

import React, { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import GameScreen from '@/components/GameScreen'

export default function Home() {
  const [gameState, setGameState] = useState('lobby') // 'lobby' | 'playing'
  const [gameParams, setGameParams] = useState({ lang: 'en', level: 'starters' })

  const handleSelectLevel = (lang, level) => {
    setGameParams({ lang, level })
    setGameState('playing')
  }

  const handleBackToLobby = () => {
    setGameState('lobby')
  }

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {gameState === 'lobby' ? (
        <Dashboard onSelectLevel={handleSelectLevel} />
      ) : (
        <GameScreen
          language={gameParams.lang}
          level={gameParams.level}
          onBackToLobby={handleBackToLobby}
        />
      )}
    </main>
  )
}
