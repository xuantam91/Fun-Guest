import React from 'react'
import styles from './CameraView.module.css'
import { AlertCircle } from 'lucide-react'
import { AvatarImage } from './Avatars'

export default function CameraView({ tracker, isTouchMode = false, avatar = 'dino', theme = 'forest' }) {
  const {
    videoRef,
    isLoading,
    cameraReady,
    error,
    tiltDirection,
    faceDetected
  } = tracker

  // Theme border class
  const themeClass = theme === 'sea' ? styles.seaCameraContainer : theme === 'space' ? styles.spaceCameraContainer : styles.forestCameraContainer

  // Border status class logic:
  // Green (Ready): Touch Mode OR Face Detected
  // Yellow (Pending): Loading / Camera initializing
  // Red (Error): Camera error or no face detected (when camera active)
  let statusBorderClass = styles.borderPending
  if (isTouchMode || faceDetected) {
    statusBorderClass = styles.borderReady
  } else if (error) {
    statusBorderClass = styles.borderError
  } else if (isLoading) {
    statusBorderClass = styles.borderPending
  } else {
    statusBorderClass = styles.borderError // Camera active but face not found yet
  }

  return (
    <div className={`${styles.cameraContainer} ${themeClass} ${statusBorderClass}`}>
      {isTouchMode ? (
        <div className={styles.touchAvatarWrap}>
          <AvatarImage id={avatar} size={110} />
        </div>
      ) : (
        <>
          {/* Video element - Always rendered with playsInline & muted for iOS Safari & Android Chrome */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={styles.videoFeed}
            onLoadedData={(e) => e.target.play().catch(() => {})}
            onCanPlay={(e) => e.target.play().catch(() => {})}
          />

          {/* Loading Overlay - Only shown when camera is actually loading and not ready yet */}
          {isLoading && !cameraReady && (
            <div className={styles.overlay}>
              <div className={styles.loader}></div>
              <p style={{ fontSize: '12px', margin: 0, fontWeight: 600 }}>
                Đang mở Camera...
              </p>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className={styles.overlay}>
              <AlertCircle size={24} color="#ff6b6b" style={{ marginBottom: '4px' }} />
              <p className={styles.errorText} style={{ fontSize: '11px', margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Tilt Left/Right Indicators */}
          {!error && (
            <div className={styles.tiltGuide}>
              <span className={`${styles.tiltGuideLeft} ${tiltDirection === 'left' ? styles.tiltGuideActive : ''}`}>
                👈
              </span>
              <span className={`${styles.tiltGuideRight} ${tiltDirection === 'right' ? styles.tiltGuideActive : ''}`}>
                👉
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

