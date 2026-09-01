import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useApp } from '@/context/AppContext'
import { AvatarImage } from './Avatars'
import styles from './Leaderboard.module.css'
import { Trophy } from 'lucide-react'

// Local mock rankings to race against for guest mode
const MOCK_PLAYERS = [
  { id: 'mock-1', full_name: 'Khủng Long Sấm', selected_avatar: 'dino', points: 350 },
  { id: 'mock-2', full_name: 'Gấu Mật Ong', selected_avatar: 'bear', points: 280 },
  { id: 'mock-3', full_name: 'Mèo Vũ Trụ', selected_avatar: 'cat', points: 190 },
  { id: 'mock-4', full_name: 'Alien Hạt Đậu', selected_avatar: 'alien', points: 120 },
]

export default function Leaderboard() {
  const { user, score, avatar } = useApp()
  const [rankings, setRankings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      
      // Query top 10 scores
      const { data, error } = await supabase
        .from('scores')
        .select(`
          points,
          profiles (
            id,
            full_name,
            selected_avatar
          )
        `)
        .order('points', { ascending: false })
        .limit(10)

      if (error) throw error

      if (data && data.length > 0) {
        // Map database response to standard format
        const formatted = data.map((item, idx) => ({
          id: item.profiles?.id || `db-${idx}`,
          full_name: item.profiles?.full_name || 'Bé ẩn danh',
          selected_avatar: item.profiles?.selected_avatar || 'dino',
          points: item.points
        }))
        setRankings(formatted)
      } else {
        // Fallback: If DB is empty, use mock data and merge current user
        mergeMockRankings()
      }
    } catch (err) {
      console.error('Lỗi khi tải bảng xếp hạng:', err)
      mergeMockRankings()
    } finally {
      setLoading(false)
    }
  }

  const mergeMockRankings = () => {
    // Current user's temporary guest data
    const guestUser = {
      id: user?.id || 'guest-user',
      full_name: user ? (user.user_metadata?.full_name || user.email) : 'Bé Thám Hiểm (Bạn)',
      selected_avatar: avatar,
      points: score
    }

    // Merge & Sort
    const combined = [...MOCK_PLAYERS, guestUser].sort((a, b) => b.points - a.points)
    setRankings(combined)
  }

  // 1. Initial Fetch
  useEffect(() => {
    fetchLeaderboard()

    // 2. Tải thời gian thực (Realtime updates) nếu dùng Supabase DB
    const channel = supabase
      .channel('realtime-scores')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'scores' },
        () => {
          fetchLeaderboard()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, score, avatar])

  // Split top 3 and others
  const top1 = rankings[0]
  const top2 = rankings[1]
  const top3 = rankings[2]
  const restOfPlayers = rankings.slice(3)

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.heading}>
        <Trophy size={24} color="var(--accent-color)" fill="var(--accent-color)" />
        <span>Bảng Vàng Đua Top</span>
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '24px' }}>Đang sắp xếp thứ hạng...</div>
      ) : (
        <>
          {/* Top 3 Podium Grid */}
          <div className={styles.podium}>
            {/* 2nd Place */}
            {top2 && (
              <div className={`${styles.podiumPlace} ${styles.place2}`}>
                <div className={styles.podiumAvatar}>
                  <AvatarImage id={top2.selected_avatar} size={50} />
                </div>
                <div className={styles.podiumName}>{top2.full_name}</div>
                <div className={styles.podiumScore}>{top2.points}đ</div>
                <div className={styles.podiumStand}>
                  <span className={styles.numberLabel}>2</span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top1 && (
              <div className={`${styles.podiumPlace} ${styles.place1}`}>
                <div className={styles.podiumAvatar}>
                  <span className={styles.crown}>👑</span>
                  <AvatarImage id={top1.selected_avatar} size={60} />
                </div>
                <div className={styles.podiumName}>{top1.full_name}</div>
                <div className={styles.podiumScore}>{top1.points}đ</div>
                <div className={styles.podiumStand}>
                  <span className={styles.numberLabel}>1</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3 && (
              <div className={`${styles.podiumPlace} ${styles.place3}`}>
                <div className={styles.podiumAvatar}>
                  <AvatarImage id={top3.selected_avatar} size={46} />
                </div>
                <div className={styles.podiumName}>{top3.full_name}</div>
                <div className={styles.podiumScore}>{top3.points}đ</div>
                <div className={styles.podiumStand}>
                  <span className={styles.numberLabel}>3</span>
                </div>
              </div>
            )}
          </div>

          {/* Rank List (4th and below) */}
          <div className={styles.rankList}>
            {restOfPlayers.length > 0 ? (
              restOfPlayers.map((player, idx) => {
                const isCurrentUser = player.id === (user?.id || 'guest-user')
                return (
                  <div
                    key={player.id || idx}
                    className={`${styles.rankItem} ${isCurrentUser ? styles.rankItemUser : ''}`}
                  >
                    <div className={styles.playerInfo}>
                      <span className={styles.rankNum}>{idx + 4}</span>
                      <AvatarImage id={player.selected_avatar} size={32} />
                      <span className={styles.playerName}>{player.full_name}</span>
                    </div>
                    <span className={styles.playerScore}>{player.points}đ</span>
                  </div>
                )
              })
            ) : rankings.length === 0 ? (
              <div className={styles.emptyState}>Chưa có thám hiểm gia nào tham gia!</div>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
