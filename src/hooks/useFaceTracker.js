import { useEffect, useRef, useState } from 'react'

export default function useFaceTracker() {
  const videoRef = useRef(null)
  const requestRef = useRef(null)
  const landmarkerRef = useRef(null)
  const streamRef = useRef(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tiltAngle, setTiltAngle] = useState(0) // In degrees
  const [tiltDirection, setTiltDirection] = useState('center') // 'left', 'right', 'center'
  const [calibrationOffset, setCalibrationOffset] = useState(0) // Calibration baseline
  const [faceDetected, setFaceDetected] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)

  const calibrationOffsetRef = useRef(0)
  const rawAngleRef = useRef(0)

  // Calibrate the current head angle as baseline (0 degrees)
  const calibrate = () => {
    calibrationOffsetRef.current = rawAngleRef.current || 0
    setCalibrationOffset(calibrationOffsetRef.current)
  }

  useEffect(() => {
    let active = true

    // 1. Start Camera stream immediately (0s delay for video feed preview)
    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError('Trình duyệt không hỗ trợ camera. Bạn hãy chọn chế độ chơi bằng cảm ứng nhé!')
          setIsLoading(false)
          return
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
          audio: false,
        })

        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream

        if (videoRef.current) {
          const video = videoRef.current
          video.srcObject = stream
          video.setAttribute('playsinline', 'true')
          video.setAttribute('muted', 'true')
          video.muted = true
          
          try {
            await video.play()
          } catch (playErr) {
            console.log('Video play error/interaction warning:', playErr)
          }

          setCameraReady(true)
          setIsLoading(false)

          // Once video stream is active, initialize MediaPipe AI detector
          initMediaPipe(video)
        }
      } catch (err) {
        console.error('Lỗi truy cập camera:', err)
        setError('Không thể mở camera. Bạn có thể bấm "Chơi bằng cảm ứng" bên dưới nhé!')
        setIsLoading(false)
      }
    }

    // 2. Initialize MediaPipe FaceLandmarker with GPU & CPU fallback
    async function initMediaPipe(videoElement) {
      try {
        const vision = await import('@mediapipe/tasks-vision')
        const { FilesetResolver, FaceLandmarker } = vision

        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        )

        let landmarker = null

        // Try GPU delegate first, fallback to CPU if WebGL fails on mobile/old laptops
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
          console.warn('GPU Delegate failed, trying CPU Delegate:', gpuErr)
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
        
        // Start detection loop
        startDetectionLoop(videoElement)
      } catch (err) {
        console.error('Lỗi tải MediaPipe AI:', err)
        // Camera stays visible so user can still see themselves & use touch controls!
      }
    }

    // 3. Frame detection loop
    function startDetectionLoop(video) {
      let lastVideoTime = -1

      const detect = () => {
        if (!active || !video || video.paused || video.ended || !landmarkerRef.current) {
          requestRef.current = requestAnimationFrame(detect)
          return
        }

        let nowInMs = Date.now()
        if (video.currentTime !== lastVideoTime && video.readyState >= 2) {
          lastVideoTime = video.currentTime
          
          try {
            const result = landmarkerRef.current.detectForVideo(video, nowInMs)
            
            if (result && result.faceLandmarks && result.faceLandmarks.length > 0) {
              setFaceDetected(true)
              const landmarks = result.faceLandmarks[0]

              // Landmark 33: Outer left eye, Landmark 263: Outer right eye
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

                const THRESHOLD = 10 // Threshold in degrees
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
            console.error('Lỗi trong vòng lặp nhận diện:', detectionErr)
          }
        }

        requestRef.current = requestAnimationFrame(detect)
      }

      requestRef.current = requestAnimationFrame(detect)
    }

    startCamera()

    return () => {
      active = false
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close()
        } catch (e) {
          // Ignore close error
        }
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
