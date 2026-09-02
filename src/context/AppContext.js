'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [theme, setTheme] = useState('forest')
  const [mode, setMode] = useState('light')
  const [avatar, setAvatar] = useState('dino')
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [customApiKey, setCustomApiKey] = useState('')
  const [ttsEngine, setTtsEngine] = useState('ms') // 'ms' (Microsoft Neural AI) | 'browser' (Browser Default)
  const [ttsGender, setTtsGender] = useState('female') // 'female' | 'male'

  // Load custom API key and TTS Engine & Gender preference on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomApiKey(localStorage.getItem('globy_gemini_api_key') || '')
      setTtsEngine(localStorage.getItem('globy_tts_engine') || 'ms')
      setTtsGender(localStorage.getItem('globy_tts_gender') || 'female')
    }
  }, [])

  const saveCustomApiKey = (newKey) => {
    setCustomApiKey(newKey.trim())
    if (typeof window !== 'undefined') {
      if (newKey.trim()) {
        localStorage.setItem('globy_gemini_api_key', newKey.trim())
      } else {
        localStorage.removeItem('globy_gemini_api_key')
      }
    }
  }

  const saveTtsEngine = (engine) => {
    setTtsEngine(engine)
    if (typeof window !== 'undefined') {
      localStorage.setItem('globy_tts_engine', engine)
    }
  }

  const saveTtsGender = (gender) => {
    setTtsGender(gender)
    if (typeof window !== 'undefined') {
      localStorage.setItem('globy_tts_gender', gender)
    }
  }

  // 1. Listen for Supabase Auth state changes
  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          await fetchUserProfile(session.user.id)
        } else {
          loadLocalSettings() // Load guest settings
        }
      } catch (err) {
        console.error('Error fetching session:', err)
        loadLocalSettings()
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        loadLocalSettings()
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // 2. Fetch profile from Supabase Database
  async function fetchUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      if (data) {
        setProfile(data)
        setTheme(data.selected_theme || 'forest')
        setAvatar(data.selected_avatar || 'dino')
        
        // Fetch score
        const { data: scoreData } = await supabase
          .from('scores')
          .select('points')
          .eq('user_id', userId)
          .single()
        
        if (scoreData) setScore(scoreData.points)

        // Fetch streak
        const { data: streakData } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', userId)
          .single()

        if (streakData) setStreak(streakData.current_streak)
      }
    } catch (err) {
      console.error('Lỗi khi tải thông tin người dùng từ DB:', err)
      loadLocalSettings()
    }
  }

  // Load settings from localStorage for Guest users
  function loadLocalSettings() {
    if (typeof window === 'undefined') return
    const localTheme = localStorage.getItem('globy_theme') || 'forest'
    const localMode = localStorage.getItem('globy_mode') || 'light'
    const localAvatar = localStorage.getItem('globy_avatar') || 'dino'
    const localScore = parseInt(localStorage.getItem('globy_score') || '0', 10)
    const localStreak = parseInt(localStorage.getItem('globy_streak') || '0', 10)

    setTheme(localTheme)
    setMode(localMode)
    setAvatar(localAvatar)
    setScore(localScore)
    setStreak(localStreak)
  }

  // 3. Update HTML attributes when theme or mode changes
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.setAttribute('data-mode', mode)

    // Save to local storage for persistence
    localStorage.setItem('globy_theme', theme)
    localStorage.setItem('globy_mode', mode)

    // Sync with Supabase if logged in
    if (user) {
      supabase.from('profiles')
        .update({ selected_theme: theme })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error syncing theme with Supabase:', error)
        })
    }
  }, [theme, mode, user])

  const changeTheme = (newTheme) => {
    if (['forest', 'sea', 'space'].includes(newTheme)) {
      setTheme(newTheme)
    }
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const changeAvatar = (newAvatar) => {
    setAvatar(newAvatar)
    localStorage.setItem('globy_avatar', newAvatar)

    if (user) {
      supabase.from('profiles')
        .update({ selected_avatar: newAvatar })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error syncing avatar with Supabase:', error)
        })
    }
  }

  const addPoints = async (pointsToAdd) => {
    const newScore = score + pointsToAdd
    setScore(newScore)
    localStorage.setItem('globy_score', newScore.toString())

    if (user) {
      const { error } = await supabase
        .from('scores')
        .update({ points: newScore, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
      
      if (error) console.error('Error syncing score with Supabase:', error)
    }
  }

  const incrementStreak = async () => {
    // Local logic for guests
    if (!user) {
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('globy_streak', newStreak.toString())
      return
    }

    // Call Supabase RPC or helper
    try {
      const { error } = await supabase.rpc('update_user_streak', { target_user_id: user.id })
      if (error) throw error
      
      // Re-fetch streak
      const { data } = await supabase
        .from('streaks')
        .select('current_streak')
        .eq('user_id', user.id)
        .single()
      
      if (data) {
        setStreak(data.current_streak)
      }
    } catch (err) {
      console.error('Lỗi cập nhật streak trên DB:', err)
    }
  }

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        },
      })
      if (error) throw error
    } catch (err) {
      console.error('Lỗi đăng nhập Google:', err)
      alert('Không thể kết nối đến tài khoản Google. Vui lòng kiểm tra cấu hình Supabase.')
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      loadLocalSettings()
    } catch (err) {
      console.error('Lỗi đăng xuất:', err)
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        theme,
        mode,
        avatar,
        score,
        streak,
        loading,
        customApiKey,
        saveCustomApiKey,
        ttsEngine,
        saveTtsEngine,
        ttsGender,
        saveTtsGender,
        setTheme: changeTheme,
        toggleMode,
        setAvatar: changeAvatar,
        addPoints,
        incrementStreak,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
