import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { vertexShader, fragmentShader } from './shaders'

interface AudioVisualizer3DProps {
  audioUrl?: string | null
  isPlaying?: boolean
  onEnded?: () => void
  useMicrophone?: boolean
  isMuted?: boolean
  compact?: boolean
  className?: string
  microphoneStream?: MediaStream | null
  hideBackground?: boolean
}

export default function AudioVisualizer3D({
  audioUrl = null,
  isPlaying = false,
  onEnded,
  useMicrophone = false,
  isMuted = true,
  compact = false,
  className = '',
  microphoneStream = null,
  hideBackground = false,
}: AudioVisualizer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<Record<string, unknown> | null>(null)
  const cameraRef = useRef<{
    aspect: number
    fov: number
    position: { set: (x: number, y: number, z: number) => void }
    lookAt: (v: unknown) => void
    updateProjectionMatrix: () => void
  } | null>(null)
  const rendererRef = useRef<{ setSize: (w: number, h: number) => void; setPixelRatio: (n: number) => void; dispose: () => void; render: (s: unknown, c: unknown) => void } | null>(null)
  const composerRef = useRef<{ setSize: (w: number, h: number) => void; setPixelRatio: (n: number) => void; render: () => void } | null>(null)
  const meshRef = useRef<{
    rotation: { x: number; y: number; z: number }
    scale: { set: (x: number, y: number, z: number) => void }
  } | null>(null)
  const soundRef = useRef<{ isPlaying: boolean; buffer: unknown; setBuffer: (b: AudioBuffer) => void; play: () => void; stop: () => void } | null>(null)
  const analyserRef = useRef<{ getAverageFrequency: () => number } | null>(null)
  const smoothFreqRef = useRef(0)
  const uniformsRef = useRef<{
    u_time: { value: number }
    u_frequency: { value: number }
    u_resolution: { value: { set: (x: number, y: number) => void } }
  } | null>(null)
  const wasPlayingRef = useRef(false)
  const userStoppedRef = useRef(false)
  const isPlayingRef = useRef(isPlaying)
  const onEndedRef = useRef(onEnded)
  const useMicrophoneRef = useRef(useMicrophone)
  const isMutedRef = useRef(isMuted)
  const hideBackgroundRef = useRef(hideBackground)
  const rafRef = useRef<number>(0)
  const clockRef = useRef<{ getElapsedTime: () => number } | null>(null)
  const micRef = useRef<{
    context: AudioContext
    stream: MediaStream
    analyser: AnalyserNode
    data: Uint8Array
  } | null>(null)

  isPlayingRef.current = isPlaying
  onEndedRef.current = onEnded
  useMicrophoneRef.current = useMicrophone
  isMutedRef.current = isMuted
  hideBackgroundRef.current = hideBackground

  const init = useCallback((container: HTMLDivElement, isCompact: boolean, shouldHideBackground: boolean) => {
    const fallback = isCompact ? 48 : 384
    let w = container.clientWidth
    let h = container.clientHeight
    if (w < 1 || h < 1) {
      w = fallback
      h = fallback
    }
    const scene = new THREE.Scene()
    const bgCanvas = document.createElement('canvas')
    bgCanvas.width = 256
    bgCanvas.height = 1
    const bgCtx = bgCanvas.getContext('2d')!
    const bgGrad = bgCtx.createLinearGradient(0, 0, 256, 0)
    bgGrad.addColorStop(0, '#0f1319')
    bgGrad.addColorStop(1, '#1a0f1a')
    bgCtx.fillStyle = bgGrad
    bgCtx.fillRect(0, 0, 256, 1)
    const bgTex = new THREE.CanvasTexture(bgCanvas)
    scene.background = bgTex

    const aspect = w / h
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
    camera.position.set(0, 0, 14)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    renderer.setClearColor(0x000000, 1)
    container.appendChild(renderer.domElement)

    const uniforms = {
      u_time: { value: 0 },
      u_frequency: { value: 0 },
      u_resolution: { value: new THREE.Vector2(w, h) },
    }
    uniformsRef.current = uniforms

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      wireframe: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const geo = new THREE.IcosahedronGeometry(4, 30)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.scale.set(0.375, 0.375, 0.375)
    scene.add(mesh)
    meshRef.current = mesh

    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.4, 0.8, 0.5)
    const outputPass = new OutputPass()
    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)
    composer.addPass(outputPass)

    const listener = new THREE.AudioListener()
    camera.add(listener)
    const sound = new THREE.Audio(listener)
    sound.setLoop(false)
    soundRef.current = sound

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    composerRef.current = composer
    clockRef.current = new THREE.Clock()
  }, [])

  const animate = useCallback(() => {
    try {
      const renderer = rendererRef.current
      const composer = composerRef.current
      const uniforms = uniformsRef.current
      const analyser = analyserRef.current
      const clock = clockRef.current
      const sound = soundRef.current

      if (!uniforms) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const elapsed = clock ? clock.getElapsedTime() : 0
      uniforms.u_time.value = elapsed

      let rawFreq = 0
      try {
        if (sound?.isPlaying && analyser) {
          rawFreq = analyser.getAverageFrequency()
        } else if (useMicrophoneRef.current && !isMutedRef.current) {
          const mic = micRef.current
          if (mic) {
            mic.analyser.getByteFrequencyData(mic.data as Uint8Array<ArrayBuffer>)
            let sum = 0
            for (let i = 0; i < mic.data.length; i++) sum += mic.data[i]
            rawFreq = mic.data.length > 0 ? sum / mic.data.length : 0
            rawFreq = Math.min(255, rawFreq * 1.3)
          }
        }
        if (rawFreq === 0 && !sound?.isPlaying) {
          rawFreq = 35 + 25 * Math.sin(elapsed * 0.5)
        }
      } catch {
        rawFreq = 0
      }
      const smooth = smoothFreqRef.current + (rawFreq - smoothFreqRef.current) * 0.08
      smoothFreqRef.current = smooth
      uniforms.u_frequency.value = smooth

      const mesh = meshRef.current
      const cam = cameraRef.current
      if (mesh) {
        mesh.rotation.x = elapsed * 0.08
        mesh.rotation.z = elapsed * 0.08
        const s = Math.min(0.9, 0.78 + smooth / 2200)
        mesh.scale.set(s, s, s)
      }
      if (cam) {
        const fov = 50 - smooth / 36
        cam.fov = Math.max(46, Math.min(52, fov))
        cam.updateProjectionMatrix()
      }

      if (sound) {
        if (wasPlayingRef.current && !sound.isPlaying) {
          wasPlayingRef.current = false
          if (!userStoppedRef.current) onEndedRef.current?.()
          userStoppedRef.current = false
        } else if (sound.isPlaying) {
          wasPlayingRef.current = true
        }
      }

      if (composer) composer.render()
      else if (renderer && sceneRef.current && cameraRef.current)
        (renderer as { render: (s: unknown, c: unknown) => void }).render(sceneRef.current, cameraRef.current)
    } catch {
      /* avoid white screen on rAF errors */
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    init(container, compact, hideBackground)

    const onResize = () => {
      const r = rendererRef.current
      const c = cameraRef.current
      const u = uniformsRef.current
      const comp = composerRef.current
      if (!r || !c || !container) return
      let w = container.clientWidth
      let h = container.clientHeight
      if (w < 1 || h < 1) return
      const aspect = w / h
      c.aspect = aspect
      c.updateProjectionMatrix()
      if (u) u.u_resolution.value.set(w, h)
      r.setSize(w, h)
      r.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      if (comp) {
        comp.setSize(w, h)
        comp.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }
    }
    window.addEventListener('resize', onResize)
    requestAnimationFrame(() => onResize())

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      soundRef.current?.stop()
      userStoppedRef.current = true
      analyserRef.current = null
      smoothFreqRef.current = 0
      const mic = micRef.current
      if (mic) {
        try {
          mic.stream.getTracks().forEach((t) => t.stop())
          mic.context.close().catch(() => { })
        } catch { }
        micRef.current = null
      }
      meshRef.current = null
      composerRef.current = null
      rendererRef.current?.dispose()
      container.querySelector('canvas')?.remove()
      sceneRef.current = null
      cameraRef.current = null
      clockRef.current = null
      uniformsRef.current = null
      soundRef.current = null
    }
  }, [init, animate, compact, hideBackground])

  useEffect(() => {
    if (!audioUrl) return
    const loader = new THREE.AudioLoader()
    loader.load(
      audioUrl,
      (buffer: AudioBuffer) => {
        if (!soundRef.current) return
        soundRef.current.setBuffer(buffer)
        if (isPlayingRef.current) {
          userStoppedRef.current = false
          soundRef.current.play()
          analyserRef.current = new THREE.AudioAnalyser(soundRef.current, 32)
        }
      },
      undefined,
      () => onEndedRef.current?.()
    )
  }, [audioUrl])

  useEffect(() => {
    const sound = soundRef.current
    if (!sound?.buffer) return
    if (isPlaying) {
      userStoppedRef.current = false
      sound.play()
      if (!analyserRef.current) {
        analyserRef.current = new THREE.AudioAnalyser(sound, 32)
      }
    } else {
      userStoppedRef.current = true
      sound.stop()
      analyserRef.current = null
      smoothFreqRef.current = 0
    }
  }, [isPlaying])

  useEffect(() => {
    if (!useMicrophone || isMuted) {
      const mic = micRef.current
      if (mic) {
        try {
          // فقط اگر stream را خودمان ایجاد کرده‌ایم، آن را stop کنیم
          if (!microphoneStream || mic.stream !== microphoneStream) {
            mic.stream.getTracks().forEach((t) => t.stop())
          }
          mic.context.close().catch(() => { })
        } catch { }
        micRef.current = null
      }
      return
    }

    // اگر stream از props آمده، از آن استفاده کن
    if (microphoneStream) {
      let cancelled = false
      const Ctx = typeof AudioContext !== 'undefined' ? AudioContext : (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      const context = Ctx ? new Ctx() : null
      if (context) {
        context.resume().catch(() => { })
      }

      if (!context) return

      try {
        const source = context.createMediaStreamSource(microphoneStream)
        const analyser = context.createAnalyser()
        analyser.fftSize = 128
        analyser.smoothingTimeConstant = 0.75
        source.connect(analyser)
        const data = new Uint8Array(analyser.frequencyBinCount)
        micRef.current = { context, stream: microphoneStream, analyser, data }
      } catch (error) {
        console.error('Error setting up microphone stream:', error)
        if (context) context.close().catch(() => { })
      }

      return () => {
        cancelled = true
        const mic = micRef.current
        if (mic) {
          try {
            // stream را stop نکن چون از props آمده
            mic.context.close().catch(() => { })
          } catch { }
          micRef.current = null
        } else if (context) {
          context.close().catch(() => { })
        }
      }
    }

    // در غیر این صورت، getUserMedia را خودمان صدا بزن
    let cancelled = false
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 'ontouchstart' in window
    const audioConstraints: MediaStreamConstraints['audio'] = isMobile
      ? true
      : { echoCancellation: false, noiseSuppression: false, autoGainControl: true }

    const Ctx = typeof AudioContext !== 'undefined' ? AudioContext : (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    const context = Ctx ? new Ctx() : null
    if (context) {
      context.resume().catch(() => { })
    }

    navigator.mediaDevices
      ?.getUserMedia?.({ audio: audioConstraints })
      ?.then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          if (context) context.close().catch(() => { })
          return
        }
        if (!context) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        try {
          const source = context.createMediaStreamSource(stream)
          const analyser = context.createAnalyser()
          analyser.fftSize = 128
          analyser.smoothingTimeConstant = 0.75
          source.connect(analyser)
          const data = new Uint8Array(analyser.frequencyBinCount)
          micRef.current = { context, stream, analyser, data }
        } catch {
          stream.getTracks().forEach((t) => t.stop())
          context.close().catch(() => { })
        }
      })
      ?.catch(() => {
        if (context) context.close().catch(() => { })
      })
    return () => {
      cancelled = true
      const mic = micRef.current
      if (mic) {
        try {
          mic.stream.getTracks().forEach((t) => t.stop())
          mic.context.close().catch(() => { })
        } catch { }
        micRef.current = null
      } else if (context) {
        context.close().catch(() => { })
      }
    }
  }, [useMicrophone, isMuted, microphoneStream])

  const min = compact ? 48 : 200
  return (
    <div
      ref={containerRef}
      className={compact ? `relative w-full h-full ${className}` : `absolute inset-0 w-full h-full ${className}`}
      style={{ minWidth: min, minHeight: min }}
    />
  )
}
