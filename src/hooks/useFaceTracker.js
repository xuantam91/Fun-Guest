import { useEffect, useRef, useState } from 'react'

export default function useFaceTracker() {
  const videoRef = useRef(null)
  const requestRef = useRef(null)
  const landmarkerRef = useRef(null)
  const streamRef = useRef(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tiltAngle, setTiltAngle] = useState(0)
  const [tiltDirection, setTiltDirection] = useState('center')
  const [calibrationOffset, setCalibrationOffset] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)

  const calibrationOffsetRef = useRef(0)
  const rawAngleRef = useRef(0)

  const calibrate = () => {
    calibrationOffsetRef.current = rawAngleRef.current || 0
    setCalibrationOffset(calibrationOffsetRef.current)
  }

  // Robust function to request webcam with multiple fallback constraints
  async function acquireCameraStream() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Trình duyệt không hỗ trợ truy cập camera.')
    }

    // Try primary constraints (front camera + preferred resolution)
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      })
    } catch (e1) {
      console.warn('Constrained getUserMedia failed, trying simple facingMode:', e1)
    }

    // Fallback 1: simple facingMode
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
    } catch (e2) {
      console.warn('FacingMode getUserMedia failed, trying default { video: true }:', e2)
    }

    // Fallback 2: absolute basic camera constraint
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
  }

  useEffect(() => {
    let active = true

    // Safety timeout: Never stay stuck in loading mode for more than 3 seconds!
    const safetyTimer = setTimeout(() => {
      if (active) {
        setIsLoading(false)
      }
    }, 3000)

    async function startCamera() {
      try {
        const stream = await acquireCameraStream()

        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        setCameraReady(true)
        setIsLoading(false) // ALWAYS stop loading spinner as soon as stream arrives!

        // Attempt immediate video element binding
        bindStreamToVideo(stream)

        // Initialize MediaPipe AI detector in parallel
        initMediaPipe()
      } catch (err) {
        console.error('Lỗi khởi tạo camera:', err)
        setError('Không thể mở camera. Bạn hãy chọn "Bỏ qua Camera" để chơi bằng chạm ngón tay nhé!')
        setIsLoading(false)
      }
    }

    function bindStreamToVideo(stream) {
      let checkCount = 0
      const interval = setInterval(() => {
        if (!active) {
          clearInterval(interval)
          return
        }

        const video = videoRef.current
        if (video) {
          if (video.srcObject !== stream) {
            video.srcObject = stream
            video.setAttribute('playsinline', 'true')
            video.setAttribute('webkit-playsinline', 'true')
            video.setAttribute('muted', 'true')
            video.muted = true

            video.play().catch(pErr => {
              console.log('Video play catch:', pErr)
            })
          }
          clearInterval(interval)
          startDetectionLoop(video)
        }

        checkCount++
        if (checkCount > 50) { // 5 seconds max check
          clearInterval(interval)
        }
      }, 100)
    }

    async function initMediaPipe() {
      try {
        const vision = await import('@mediapipe/tasks-vision')
        const { FilesetResolver, FaceLandmarker } = vision

        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        )

        let landmarker = null

        // Try GPU delegate first, fallback to CPU if WebGL fails
        try {
          landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
              modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numFaces: 1,
          })
        } catch (gpuErr) {
          console.warn('GPU Delegate error, falling back to CPU Delegate:', gpuErr)
          landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
              modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
              delegate: 'CPU',
            },
            runningMode: 'VIDEO',
            numFaces: 1,
          })
        }

        if (!active) {
          if (landmarker) landmarker.close()
          return
        }

        landmarkerRef.current = landmarker
      } catch (err) {
        console.error('Lỗi tải bộ nhận diện MediaPipe:', err)
      }
    }

    function startDetectionLoop(video) {
      let lastVideoTime = -1

      const detect = () => {
        if (!active) return

        if (video && !video.paused && !video.ended && landmarkerRef.current) {
          let nowInMs = Date.now()
          if (video.currentTime !== lastVideoTime && video.readyState >= 2) {
            lastVideoTime = video.currentTime
            
            try {
              const result = landmarkerRef.current.detectForVideo(video, nowInMs)
              
              if (result && result.faceLandmarks && result.faceLandmarks.length > 0) {
                setFaceDetected(true)
                const landmarks = result.faceLandmarks[0]

                const leftEye = landmarks[33]
                const rightEye = landmarks[263]

                if (leftEye && rightEye) {
                  const dy = rightEye.y - leftEye.y
                  const dx = rightEye.x - leftEye.x
                  
                  const angleRad = Math.atan2(dy, dx)
                  let angleDeg = angleRad * (180 / Math.PI)

                  rawAngleRef.current = angleDeg

                  let calibratedAngle = angleDeg - calibrationOffsetRef.current
                  setTiltAngle(calibratedAngle)

                  const THRESHOLD = 10
                  if (calibratedAngle > THRESHOLD) {
                    setTiltDirection('left')
                  } else if (calibratedAngle < -THRESHOLD) {
                    setTiltDirection('right')
                  } else {
                    setTiltDirection('center')
                  }
                }
              } else {
                setFaceDetected(false)
                setTiltDirection('center')
              }
            } catch (detectionErr) {
              // Ignore frame detection error
            }
          }
        }

        requestRef.current = requestAnimationFrame(detect)
      }

      requestRef.current = requestAnimationFrame(detect)
    }

    startCamera()

    return () => {
      active = false
      clearTimeout(safetyTimer)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close()
        } catch (e) {}
      }
    }
  }, [])

  return {
    videoRef,
    isLoading,
    cameraReady,
    error,
    tiltAngle,
    tiltDirection,
    calibrate,
    faceDetected,
  }
}
