import { useEffect, useMemo, useRef, useState } from 'react'
import {
  buildLessonTtsTexts,
  fetchCurrentLessonV2,
  openAudioPlayer,
  openTtsPlayer,
  pickPrimaryOriginalAudio,
  subscribeFloatingPlayer,
  type FloatingPlayerPayload,
} from '../../services/floatingMediaPlayer'

type PlayerState = FloatingPlayerPayload & {
  visible: boolean
  minimized: boolean
  maximized: boolean
  x: number
  y: number
}

const defaultState: PlayerState = {
  visible: false,
  minimized: false,
  maximized: false,
  x: 24,
  y: 24,
  mode: 'audio',
  title: '',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function FloatingMediaPlayer() {
  const [player, setPlayer] = useState<PlayerState>(defaultState)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioTime, setAudioTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [rate, setRate] = useState(1)
  const [segmentIndex, setSegmentIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const draggingRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  const ttsSegments = useMemo(() => {
    if (player.mode !== 'tts') return []
    return (player.texts?.length ? player.texts : player.text ? [player.text] : []).filter(Boolean)
  }, [player])

  useEffect(() => {
    const unsub = subscribeFloatingPlayer((payload) => {
      window.speechSynthesis?.cancel()
      setIsPlaying(false)
      setAudioTime(0)
      setAudioDuration(0)
      setSegmentIndex(0)
      setRate(payload.rate ?? 1)
      setPlayer((prev) => ({
        ...prev,
        ...payload,
        visible: true,
        minimized: false,
        maximized: false,
      }))
    })
    return unsub
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (player.mode === 'audio' && player.audioSrc) {
      audio.src = player.audioSrc
      audio.playbackRate = rate
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    } else {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [player.mode, player.audioSrc, player.visible])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = rate
  }, [rate])

  useEffect(() => {
    if (!player.visible || player.mode !== 'tts') return
    if (segmentIndex < 0 || segmentIndex >= ttsSegments.length) return
    const text = ttsSegments[segmentIndex]
    if (!text) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = rate
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => {
      if (segmentIndex < ttsSegments.length - 1) {
        setSegmentIndex((current) => current + 1)
      } else {
        setIsPlaying(false)
      }
    }
    utterance.onerror = () => setIsPlaying(false)
    window.speechSynthesis.speak(utterance)
    return () => window.speechSynthesis.cancel()
  }, [segmentIndex, player.visible, player.mode, ttsSegments, rate])

  useEffect(() => {
    const onDocClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest('button') as HTMLButtonElement | null
      if (!button) return
      const text = (button.innerText || '').trim().toLowerCase()
      if (!text) return

      if (text.includes('tts toàn bài')) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation?.()
        const lesson = await fetchCurrentLessonV2()
        const texts = buildLessonTtsTexts(lesson)
        if (texts.length) {
          openTtsPlayer({
            title: 'TTS toàn bài',
            subtitle: lesson?.titleZh || undefined,
            texts,
            rate,
          })
        }
      }

      if (text === 'gốc' || text.includes('🎧 gốc') || text.includes(' audio gốc')) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation?.()
        const lesson = await fetchCurrentLessonV2()
        const track = pickPrimaryOriginalAudio(lesson)
        if (track?.src) {
          openAudioPlayer({
            audioSrc: track.src,
            title: 'Audio gốc',
            subtitle: lesson?.titleZh || track.label,
          })
        }
      }
    }

    document.addEventListener('click', onDocClick, true)
    return () => document.removeEventListener('click', onDocClick, true)
  }, [rate])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return
      const maxX = window.innerWidth - (player.minimized ? 220 : 420)
      const maxY = window.innerHeight - (player.minimized ? 56 : 220)
      const nextX = clamp(draggingRef.current.originX - (event.clientX - draggingRef.current.startX), 8, Math.max(8, maxX))
      const nextY = clamp(draggingRef.current.originY - (event.clientY - draggingRef.current.startY), 8, Math.max(8, maxY))
      setPlayer((prev) => ({ ...prev, x: nextX, y: nextY }))
    }
    const onUp = () => {
      draggingRef.current = null
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [player.minimized])

  if (!player.visible) return <audio ref={audioRef} hidden preload="metadata" />

  const togglePlay = () => {
    if (player.mode === 'audio') {
      const audio = audioRef.current
      if (!audio) return
      if (audio.paused) {
        void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      } else {
        audio.pause()
        setIsPlaying(false)
      }
      return
    }

    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
      setIsPlaying(true)
    } else {
      setSegmentIndex((current) => current)
    }
  }

  const closePlayer = () => {
    audioRef.current?.pause()
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setPlayer((prev) => ({ ...prev, visible: false }))
  }

  const seekAudio = (delta: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = clamp(audio.currentTime + delta, 0, audio.duration || 0)
  }

  const playPrev = () => {
    if (player.mode === 'audio') {
      seekAudio(-5)
    } else {
      setSegmentIndex((current) => Math.max(0, current - 1))
    }
  }

  const playNext = () => {
    if (player.mode === 'audio') {
      seekAudio(5)
    } else {
      setSegmentIndex((current) => Math.min(ttsSegments.length - 1, current + 1))
    }
  }

  const currentLabel = player.mode === 'tts'
    ? `Câu ${Math.min(segmentIndex + 1, Math.max(ttsSegments.length, 1))}/${Math.max(ttsSegments.length, 1)}`
    : `${Math.floor(audioTime)}s / ${Math.floor(audioDuration)}s`

  return (
    <>
      <audio
        ref={audioRef}
        hidden
        preload="metadata"
        onTimeUpdate={(event) => setAudioTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setAudioDuration(event.currentTarget.duration || 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <div
        className={`floating-media-player ${player.minimized ? 'minimized' : ''} ${player.maximized ? 'maximized' : ''}`}
        style={player.maximized ? undefined : { right: `${player.x}px`, bottom: `${player.y}px` }}
      >
        <div
          className="floating-media-header"
          onPointerDown={(event) => {
            if (player.maximized || (event.target as HTMLElement).closest('button')) return
            draggingRef.current = {
              startX: event.clientX,
              startY: event.clientY,
              originX: player.x,
              originY: player.y,
            }
          }}
        >
          <div className="floating-media-meta">
            <strong>{player.title}</strong>
            <small>{player.subtitle || currentLabel}</small>
          </div>
          <div className="floating-media-actions">
            <button
              className="mini-icon-button"
              title={player.minimized ? 'Mở lại' : 'Thu nhỏ'}
              onClick={() => setPlayer((prev) => ({ ...prev, minimized: !prev.minimized, maximized: false }))}
            >{player.minimized ? '▢' : '—'}</button>
            <button
              className="mini-icon-button"
              title={player.maximized ? 'Khôi phục kích thước' : 'Phóng lớn'}
              onClick={() => setPlayer((prev) => ({ ...prev, maximized: !prev.maximized, minimized: false }))}
            >{player.maximized ? '◱' : '⛶'}</button>
            <button className="mini-icon-button" title="Đóng" onClick={closePlayer}>✕</button>
          </div>
        </div>

        {!player.minimized && (
          <div className="floating-media-body">
            <div className="floating-media-controls">
              <button className="audio-button" onClick={playPrev}>{player.mode === 'audio' ? '« 5s' : '« Câu trước'}</button>
              <button className="audio-button emphasis" onClick={togglePlay}>{isPlaying ? '⏸ Tạm dừng' : '▶ Phát'}</button>
              <button className="audio-button" onClick={playNext}>{player.mode === 'audio' ? '5s »' : 'Câu sau »'}</button>
            </div>

            {player.mode === 'audio' && (
              <input
                className="floating-progress"
                type="range"
                min={0}
                max={audioDuration || 0}
                step={0.1}
                value={audioTime}
                onChange={(event) => {
                  const audio = audioRef.current
                  if (!audio) return
                  audio.currentTime = Number(event.target.value)
                  setAudioTime(Number(event.target.value))
                }}
              />
            )}

            {player.mode === 'tts' && (
              <div className="floating-tts-preview">
                {ttsSegments[segmentIndex] || player.text}
              </div>
            )}

            <div className="floating-media-footer">
              <label>
                Tốc độ
                <select value={rate} onChange={(event) => setRate(Number(event.target.value))}>
                  <option value={0.75}>0.75x</option>
                  <option value={0.9}>0.9x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.1}>1.1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </select>
              </label>
              <div className="floating-media-status">{currentLabel}</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
