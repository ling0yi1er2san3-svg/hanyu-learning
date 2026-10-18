interface Props {
  showPinyin: boolean
  showVietnamese: boolean
  onTogglePinyin: () => void
  onToggleVietnamese: () => void
}

export default function DisplayControls({
  showPinyin,
  showVietnamese,
  onTogglePinyin,
  onToggleVietnamese,
}: Props) {
  return (
    <div className="display-controls">
      <button
        className={showPinyin ? 'display-chip active' : 'display-chip'}
        onClick={onTogglePinyin}
      >
        {showPinyin ? '✓' : '○'} Pinyin
      </button>
      <button
        className={showVietnamese ? 'display-chip active' : 'display-chip'}
        onClick={onToggleVietnamese}
      >
        {showVietnamese ? '✓' : '○'} Tiếng Việt
      </button>
    </div>
  )
}
