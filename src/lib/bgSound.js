// Web Audio API Ambient Sound Generator for Theme Backgrounds
// Forest (Rừng Xanh), Sea (Đại Dương), Space (Vũ Trụ)

class AmbientSoundEngine {
  constructor() {
    this.ctx = null
    this.isMuted = true
    this.currentTheme = null
    this.timerId = null
    this.masterGain = null
    this.activeNodes = []
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.2, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  setMuted(muted) {
    this.isMuted = muted
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.25, now + 0.5)

    if (!muted && this.currentTheme) {
      this.playTheme(this.currentTheme)
    }
  }

  stopAll() {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      } catch (e) {
        // ignore
      }
    })
    this.activeNodes = []
  }

  playTheme(theme) {
    this.currentTheme = theme
    this.initContext()

    if (!this.ctx) return
    this.stopAll()

    if (this.isMuted) return

    if (theme === 'sea') {
      this.startSeaSound()
    } else if (theme === 'space') {
      this.startSpaceSound()
    } else {
      // Default: Forest
      this.startForestSound()
    }
  }

  // ==========================================
  // 1. FOREST AMBIENT (NATURE, BIRD CHIRPS, KALIMBA CHORDS)
  // ==========================================
  startForestSound() {
    if (!this.ctx) return
    const ctx = this.ctx

    // Forest Kalimba Melodic Notes (Pentatonic G Major: G4, A4, B4, D5, E5)
    const notes = [392.00, 440.00, 493.88, 587.33, 659.25, 783.99]

    const playKalimbaNote = () => {
      if (this.isMuted || !this.ctx) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const freq = notes[Math.floor(Math.random() * notes.length)]
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 2.0)
    }

    // Bird Chirp simulation
    const playBirdChirp = () => {
      if (this.isMuted || !this.ctx) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const baseFreq = 2200 + Math.random() * 800
      osc.type = 'sine'
      osc.frequency.setValueAtTime(baseFreq, now)
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.1)
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 300, now + 0.2)

      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.03, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 0.25)
    }

    // Interval for nature ambiance
    this.timerId = setInterval(() => {
      if (Math.random() < 0.6) {
        playKalimbaNote()
      }
      if (Math.random() < 0.3) {
        playBirdChirp()
      }
    }, 1200)
  }

  // ==========================================
  // 2. SEA AMBIENT (OCEAN WAVES & BUBBLE POPS)
  // ==========================================
  startSeaSound() {
    if (!this.ctx) return
    const ctx = this.ctx

    // Ocean Waves Noise
    const bufferSize = ctx.sampleRate * 3
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const whiteNoise = ctx.createBufferSource()
    whiteNoise.buffer = buffer
    whiteNoise.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(300, ctx.currentTime)

    // Wave swell LFO
    const lfo = ctx.createOscillator()
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime) // slow wave sweep (8 secs)
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(250, ctx.currentTime)

    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    const waveGain = ctx.createGain()
    waveGain.gain.setValueAtTime(0.06, ctx.currentTime)

    whiteNoise.connect(filter)
    filter.connect(waveGain)
    waveGain.connect(this.masterGain)

    whiteNoise.start()
    lfo.start()
    this.activeNodes.push(whiteNoise, lfo)

    // Bubble Pops (sine pitch drops 🫧)
    const playBubblePop = () => {
      if (this.isMuted || !this.ctx) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const startFreq = 600 + Math.random() * 600
      osc.type = 'sine'
      osc.frequency.setValueAtTime(startFreq, now)
      osc.frequency.exponentialRampToValueAtTime(startFreq + 400, now + 0.08)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 0.12)
    }

    this.timerId = setInterval(() => {
      if (Math.random() < 0.5) {
        playBubblePop()
      }
    }, 900)
  }

  // ==========================================
  // 3. SPACE AMBIENT (COSMIC SYNTH PADS & SPARKLE ARPEGGIO)
  // ==========================================
  startSpaceSound() {
    if (!this.ctx) return
    const ctx = this.ctx

    // Soft Ambient Pad Chords (Cmaj9: C3, G3, B3, D4, E4)
    const padFreqs = [130.81, 196.00, 246.94, 293.66, 329.63]

    padFreqs.forEach((freq) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.02, ctx.currentTime)

      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start()

      this.activeNodes.push(osc)
    })

    // Cosmic Sparkle Notes (High Sine Chimes ✨)
    const sparkleNotes = [1046.50, 1318.51, 1567.98, 1975.53, 2093.00]

    const playSpaceSparkle = () => {
      if (this.isMuted || !this.ctx) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const freq = sparkleNotes[Math.floor(Math.random() * sparkleNotes.length)]
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.04, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 1.3)
    }

    this.timerId = setInterval(() => {
      if (Math.random() < 0.5) {
        playSpaceSparkle()
      }
    }, 1100)
  }
}

export const bgSoundEngine = new AmbientSoundEngine()
