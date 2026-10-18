export type FloatingPlayerMode = 'audio' | 'tts'

export interface FloatingPlayerPayload {
  mode: FloatingPlayerMode
  title: string
  subtitle?: string
  audioSrc?: string
  text?: string
  texts?: string[]
  rate?: number
}

type Listener = (payload: FloatingPlayerPayload) => void

const listeners = new Set<Listener>()

export function subscribeFloatingPlayer(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function openFloatingPlayer(payload: FloatingPlayerPayload) {
  listeners.forEach((listener) => listener(payload))
}

export function openTtsPlayer(options: { text?: string; texts?: string[]; title?: string; subtitle?: string; rate?: number }) {
  const texts = options.texts?.filter(Boolean) ?? (options.text ? [options.text] : [])
  if (texts.length === 0) return
  openFloatingPlayer({
    mode: 'tts',
    title: options.title || 'TTS',
    subtitle: options.subtitle,
    texts,
    text: texts.join(' '),
    rate: options.rate ?? 1,
  })
}

export function openAudioPlayer(options: { audioSrc: string; title?: string; subtitle?: string }) {
  openFloatingPlayer({
    mode: 'audio',
    title: options.title || 'Audio gốc',
    subtitle: options.subtitle,
    audioSrc: options.audioSrc,
  })
}

export async function fetchCurrentLessonV2(): Promise<any | null> {
  const hash = window.location.hash || ''
  const match = hash.match(/\/book\/(\d+)\/lesson\/(\d+)/)
  if (!match) return null

  const book = Number(match[1])
  const lesson = Number(match[2])
  const lessonPadded = String(lesson).padStart(2, '0')

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data-v2/book${book}/lesson${lessonPadded}.json`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export function buildLessonTtsTexts(lesson: any): string[] {
  const texts: string[] = []
  for (const dialogue of lesson?.dialogues ?? []) {
    for (const line of dialogue?.lines ?? []) {
      if (line?.chinese) texts.push(String(line.chinese))
    }
  }
  for (const textBlock of lesson?.texts ?? []) {
    if (textBlock?.chinese) texts.push(String(textBlock.chinese))
    for (const line of textBlock?.sentences ?? []) {
      if (line?.chinese) texts.push(String(line.chinese))
    }
  }
  return texts
}

export function pickPrimaryOriginalAudio(lesson: any): { src: string; label?: string } | null {
  const tracks = lesson?.audio?.tracks
  if (!Array.isArray(tracks) || tracks.length === 0) return null
  const preferred = tracks.find((track: any) => track?.mappingVerified && track?.src) ?? tracks.find((track: any) => track?.src)
  if (!preferred?.src) return null
  return { src: String(preferred.src), label: preferred.label ? String(preferred.label) : undefined }
}
