import React from 'react'
import styles from './CameraView.module.css'
import { AlertCircle } from 'lucide-react'

export default function CameraView({ tracker }) {
  const {
    videoRef,
    isLoading,
    cameraReady,
    error,
    tiltDirection,
    faceDetected
  } = tracker

  return (
    <div className={`${styles.cameraContainer} ${faceDetected ? styles.cameraContainerActive : ''}`}>
      {/* Video element - Always rendered with playsInline & muted for iOS Safari & Android Chrome */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={styles.videoFeed}
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
        <>
          <div className={styles.tiltGuide}>
            <span className={`${styles.tiltGuideLeft} ${tiltDirection === 'left' ? styles.tiltGuideActive : ''}`}>
              👈
            </span>
            <span className={`${styles.tiltGuideRight} ${tiltDirection === 'right' ? styles.tiltGuideActive : ''}`}>
              👉
            </span>
          </div>

          <div className={styles.statusIndicator}>
            <span className={`${styles.statusDot} ${faceDetected ? styles.statusDotActive : ''}`} />
            <span>{faceDetected ? 'Sẵn sàng!' : 'Chưa thấy mặt'}</span>
          </div>
        </>
      )}
    </div>
  )
}
