import React from 'react'

export const AVATAR_LIST = [
  { id: 'dino', name: 'Khủng Long Con', color: '#8ce99a' },
  { id: 'bear', name: 'Gấu Nâu Tinh Nghịch', color: '#ffd8a8' },
  { id: 'cat', name: 'Mèo Máy Phi Hành', color: '#a5d8ff' },
  { id: 'alien', name: 'Alien Đáng Yêu', color: '#eebefa' },
]

export function AvatarImage({ id, size = 80 }) {
  switch (id) {
    case 'dino':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#eafaf1" stroke="#2b8a3e" strokeWidth="4" />
          {/* Dino Head */}
          <path d="M35 60 C35 35, 65 35, 65 60 Z" fill="#51cf66" />
          {/* Dino Nose */}
          <path d="M40 55 C40 45, 60 45, 60 55" fill="#40c057" />
          {/* Spikes */}
          <path d="M30 40 L35 32 L40 40 Z" fill="#fcc419" />
          <path d="M42 28 L50 20 L58 28 Z" fill="#fcc419" />
          <path d="M60 40 L65 32 L70 40 Z" fill="#fcc419" />
          {/* Eyes */}
          <circle cx="45" cy="45" r="4" fill="#333" />
          <circle cx="55" cy="45" r="4" fill="#333" />
          <circle cx="46" cy="44" r="1.5" fill="#fff" />
          <circle cx="56" cy="44" r="1.5" fill="#fff" />
          {/* Cheeks */}
          <circle cx="41" cy="49" r="3" fill="#ff8787" opacity="0.6" />
          <circle cx="59" cy="49" r="3" fill="#ff8787" opacity="0.6" />
          {/* Smile */}
          <path d="M47 52 Q50 55 53 52" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    case 'bear':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#fff9db" stroke="#e67e22" strokeWidth="4" />
          {/* Ears */}
          <circle cx="35" cy="35" r="12" fill="#d9480f" />
          <circle cx="35" cy="35" r="6" fill="#ffc078" />
          <circle cx="65" cy="35" r="12" fill="#d9480f" />
          <circle cx="65" cy="35" r="6" fill="#ffc078" />
          {/* Face */}
          <circle cx="50" cy="55" r="28" fill="#f76707" />
          {/* Snout */}
          <circle cx="50" cy="62" r="12" fill="#ffe8cc" />
          {/* Nose */}
          <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#495057" />
          {/* Eyes */}
          <circle cx="42" cy="48" r="4" fill="#333" />
          <circle cx="58" cy="48" r="4" fill="#333" />
          <circle cx="43" cy="47" r="1.5" fill="#fff" />
          <circle cx="59" cy="47" r="1.5" fill="#fff" />
          {/* Cheeks */}
          <circle cx="37" cy="54" r="3" fill="#ff8787" opacity="0.8" />
          <circle cx="63" cy="54" r="3" fill="#ff8787" opacity="0.8" />
          {/* Smile */}
          <path d="M47 64 Q50 67 53 64" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'cat':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#e8f4fd" stroke="#1c7ed6" strokeWidth="4" />
          {/* Helmet Glass */}
          <circle cx="50" cy="50" r="28" fill="#d0ebff" stroke="#74c0fc" strokeWidth="2" />
          {/* Cat Ears */}
          <path d="M30 35 L38 20 L48 30 Z" fill="#339af0" />
          <path d="M34 32 L39 23 L45 29 Z" fill="#ffdeeb" />
          <path d="M70 35 L62 20 L52 30 Z" fill="#339af0" />
          <path d="M66 32 L61 23 L55 29 Z" fill="#ffdeeb" />
          {/* Cat Face */}
          <circle cx="50" cy="54" r="22" fill="#228be6" />
          {/* Eyes */}
          <circle cx="43" cy="50" r="3.5" fill="#224" />
          <circle cx="57" cy="50" r="3.5" fill="#224" />
          <circle cx="44" cy="49" r="1.2" fill="#fff" />
          <circle cx="58" cy="49" r="1.2" fill="#fff" />
          {/* Nose */}
          <polygon points="48,55 52,55 50,57" fill="#ff8787" />
          {/* Snout lines */}
          <path d="M50 57 Q48 60 46 59" stroke="#224" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50 57 Q52 60 54 59" stroke="#224" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="39" cy="54" r="2.5" fill="#ff8787" opacity="0.8" />
          <circle cx="61" cy="54" r="2.5" fill="#ff8787" opacity="0.8" />
        </svg>
      )
    case 'alien':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#f3f0ff" stroke="#9c36b5" strokeWidth="4" />
          {/* Antennas */}
          <line x1="50" y1="30" x2="50" y2="15" stroke="#be4bdb" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="12" r="6" fill="#e599f7" />
          {/* Head */}
          <ellipse cx="50" cy="56" rx="26" ry="20" fill="#cc5de8" />
          {/* 3 Eyes */}
          <circle cx="38" cy="50" r="4.5" fill="#fff" stroke="#9c36b5" strokeWidth="1.5" />
          <circle cx="38" cy="50" r="2" fill="#333" />
          
          <circle cx="50" cy="47" r="5.5" fill="#fff" stroke="#9c36b5" strokeWidth="1.5" />
          <circle cx="50" cy="47" r="2.5" fill="#333" />
          
          <circle cx="62" cy="50" r="4.5" fill="#fff" stroke="#9c36b5" strokeWidth="1.5" />
          <circle cx="62" cy="50" r="2" fill="#333" />
          
          {/* Cute Smile */}
          <path d="M46 64 Q50 69 54 64" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}
