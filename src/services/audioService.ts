function chunkChineseText(text: string, maxLength = 120) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) return []

  const sentenceParts = normalized.match(/[^。！？!?；;]+[。！？!?；;]?/g) ?? [normalized]
  const chunks: string[] = []

  for (const sentence of sentenceParts) {
    const clean = sentence.trim()
    if (!clean) continue

    if (clean.length <= maxLength) {
      chunks.push(clean)
      continue
    }

    for (let start = 0; start < clean.length; start += maxLength) {
      chunks.push(clean.slice(start, start + maxLength))
    }
  }

  return chunks
}

export function speakChinese(text: string, rate = 1) {
  if (!('speechSynthesis' in window)) {
    alert('Trình duyệt này không hỗ trợ SpeechSynthesis.')
    return
  }

  const chunks = chunkChineseText(text)
  if (chunks.length === 0) return

  window.speechSynthesis.cancel()

  let index = 0
  const speakNext = () => {
    if (index >= chunks.length) return

    const utterance = new SpeechSynthesisUtterance(chunks[index])
    utterance.lang = 'zh-CN'
    utterance.rate = rate
    utterance.onend = () => {
      index += 1
      speakNext()
    }
    utterance.onerror = () => {
      index += 1
      speakNext()
    }
    window.speechSynthesis.speak(utterance)
  }

  speakNext()
}

function resolveAudioUrl(src: string) {
  if (/^https?:\/\//i.test(src) || src.startsWith('blob:') || src.startsWith('data:')) return src

  const clean = src.replace(/^\.\//, '').replace(/^\//, '').replace(/^public\//, '')
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${clean}`.replace(/([^:]\/)\/+?/g, '$1')
}

export function playChineseAudio(text: string, src?: string | null, rate = 1) {
  if (!src) {
    speakChinese(text, rate)
    return
  }

  let fallbackUsed = false
  const fallback = () => {
    if (fallbackUsed) return
    fallbackUsed = true
    speakChinese(text, rate)
  }

  const audio = new Audio(resolveAudioUrl(src))
  audio.playbackRate = rate
  audio.onerror = fallback
  audio.play().catch(fallback)
}
