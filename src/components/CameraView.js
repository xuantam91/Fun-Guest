import React, { useState } from 'react'
import styles from './CameraView.module.css'
import { Sparkles, Camera, RotateCcw, AlertCircle } from 'lucide-react'

export default function CameraView({ tracker, showCalibration = false, onCalibrated }) {
  const {
    videoRef,
    isLoading,
    error,
    tiltDirection,
    calibrate,
    faceDetected
  } = tracker

  const [calibrated, setCalibrated] = useState(false)

  const handleCalibrate = () => {
    calibrate()
    setCalibrated(true)
    if (onCalibrated) {
      onCalibrated()
    }
  }

  return (
    <div className={`${styles.cameraContainer} ${faceDetected ? styles.cameraContainerActive : ''}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={styles.videoFeed}
        style={{ display: isLoading || error ? 'none' : 'block' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.loader}></div>
          <p style={{ fontSize: '13px', margin: 0, fontWeight: 500 }}>
            Đang khởi động Camera...
          </p>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className={styles.overlay}>
          <AlertCircle size={32} color="#ff6b6b" style={{ marginBottom: '8px' }} />
          <p className={styles.errorText}>{error}</p>
          <button 
            className={styles.calibrationBtn} 
            onClick={() => window.location.reload()}
          >
            Thử Lại
          </button>
        </div>
      )}

      {/* Tilt Left/Right Indicators */}
      {!isLoading && !error && (
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
            <span>{faceDetected ? 'Sẵn sàng!' : 'Không tìm thấy bé'}</span>
          </div>
        </>
      )}

      {/* Calibration Screen (Triggered at the start of a session) */}
      {showCalibration && !isLoading && !error && !calibrated && (
        <div className={styles.calibrationOverlay}>
          <Sparkles size={24} style={{ marginBottom: '4px', color: '#333' }} />
          <h4 className={styles.calibrationTitle}>Chào Bé Nhé!</h4>
          <p className={styles.calibrationDesc}>
            Hãy ngồi thẳng lưng và căn giữa khuôn mặt vào camera nhé!
          </p>
          <button className={styles.calibrationBtn} onClick={handleCalibrate}>
            Đã sẵn sàng! 🚀
          </button>
        </div>
      )}
    </div>
  )
}
