import { openAudioPlayer, openTtsPlayer } from '../../services/floatingMediaPlayer'

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
        if (src) {
          openAudioPlayer({
            audioSrc: src,
            title: label || 'Audio gốc',
            subtitle: tooltip,
          })
        } else {
          openTtsPlayer({
            text,
            title: label || 'TTS',
            subtitle: tooltip,
          })
        }
      }}
    >
      🔊{label ? ` ${label}` : ''}
    </button>
  )
}
