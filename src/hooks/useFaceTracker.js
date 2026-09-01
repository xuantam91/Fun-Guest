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

  const calibrationOffsetRef = useRef(0)
  const rawAngleRef = useRef(0)

  // Calibrate the current head angle as baseline (0 degrees)
  const calibrate = () => {
    calibrationOffsetRef.current = rawAngleRef.current || 0
    setCalibrationOffset(calibrationOffsetRef.current)
  }

  useEffect(() => {
    let active = true

    // Dynamically import MediaPipe on the client-side to prevent Next.js SSR errors
    async function initMediaPipe() {
      try {
        const vision = await import('@mediapipe/tasks-vision')
        const { FilesetResolver, FaceLandmarker } = vision

        setIsLoading(true)
        
        // 1. Resolve fileset for WebAssembly files
        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        )

        // 2. Initialize FaceLandmarker
        const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1,
        })

        if (!active) return

        landmarkerRef.current = landmarker
        setIsLoading(false)
        
        // 3. Start camera stream
        startCamera()
      } catch (err) {
        console.error('Lỗi khởi tạo MediaPipe Face Landmarker:', err)
        setError('Không thể tải bộ nhận diện khuôn mặt. Vui lòng kiểm tra kết nối mạng.')
        setIsLoading(false)
      }
    }

    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError('Trình duyệt của bạn không hỗ trợ truy cập camera.')
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
          
          // Explicitly play the video (browsers can block autoPlay without user interaction)
          video.play().catch(e => console.log('Yêu cầu phát video bị chặn hoặc lỗi:', e))

          if (video.readyState >= 2) {
            console.log('Video đã tải dữ liệu xong (readyState >= 2), chạy vòng lặp nhận diện ngay.')
            startDetectionLoop()
          } else {
            console.log('Đang chờ sự kiện loadeddata để chạy vòng lặp nhận diện.')
            video.addEventListener('loadeddata', startDetectionLoop)
          }
        }
      } catch (err) {
        console.error('Lỗi truy cập camera:', err)
        setError('Không thể truy cập camera. Vui lòng cấp quyền camera trong cài đặt trình duyệt.')
      }
    }

    function startDetectionLoop() {
      if (!videoRef.current || !landmarkerRef.current) return

      const video = videoRef.current
      const landmarker = landmarkerRef.current
      let lastVideoTime = -1

      const detect = () => {
        if (!video || video.paused || video.ended) {
          requestRef.current = requestAnimationFrame(detect)
          return
        }

        // Only run detection if we have a new video frame
        let nowInMs = Date.now()
        if (video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime
          
          try {
            const result = landmarker.detectForVideo(video, nowInMs)
            
            if (result.faceLandmarks && result.faceLandmarks.length > 0) {
              setFaceDetected(true)
              const landmarks = result.faceLandmarks[0]

              // Key landmarks for head tilt:
              // - Left eye outer corner (landmark 33)
              // - Right eye outer corner (landmark 263)
              const leftEye = landmarks[33]
              const rightEye = landmarks[263]

              if (leftEye && rightEye) {
                // Calculate the angle of the line connecting left and right eyes
                const dy = rightEye.y - leftEye.y
                const dx = rightEye.x - leftEye.x
                
                // Angle in degrees
                const angleRad = Math.atan2(dy, dx)
                let angleDeg = angleRad * (180 / Math.PI)

                // Store raw angle for calibration reference
                rawAngleRef.current = angleDeg

                // Apply calibration offset
                // (Webcam is mirrored, so we adapt tilt direction)
                let calibratedAngle = angleDeg - calibrationOffsetRef.current

                setTiltAngle(calibratedAngle)

                // Define tilt thresholds (typically 12 to 15 degrees is standard)
                // Since the video is mirrored:
                // - Tilting head to physical Left causes rightEye to go higher in frame -> positive dy (positive angle)
                // - Tilting head to physical Right causes leftEye to go higher in frame -> negative dy (negative angle)
                // We'll normalize this so tilting physically left = 'left', physically right = 'right'
                const THRESHOLD = 12 // degrees
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
            console.error('Error during landmark detection:', detectionErr)
          }
        }

        requestRef.current = requestAnimationFrame(detect)
      }

      requestRef.current = requestAnimationFrame(detect)
    }

    initMediaPipe()

    return () => {
      active = false
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (landmarkerRef.current) {
        landmarkerRef.current.close()
      }
    }
  }, [])

  return {
    videoRef,
    isLoading,
    error,
    tiltAngle,
    tiltDirection,
    calibrate,
    faceDetected,
  }
}
