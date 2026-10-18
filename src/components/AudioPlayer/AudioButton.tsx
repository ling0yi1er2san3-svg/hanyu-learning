import { playChineseAudio } from '../../services/audioService'

type AudioButtonProps = {
  text: string
  label?: string
  src?: string | null
  title?: string
}

export default function AudioButton({ text, label = 'Nghe', src, title }: AudioButtonProps) {
  const tooltip = title ?? (src ? 'Phát audio gốc' : 'Đọc bằng TTS tiếng Trung')

  return (
    <button
      type="button"
      className="audio-button"
      title={tooltip}
      aria-label={label || tooltip}
      onClick={(event) => {
        event.stopPropagation()
        playChineseAudio(text, src)
      }}
    >
      🔊{label ? ` ${label}` : ''}
    </button>
  )
}
