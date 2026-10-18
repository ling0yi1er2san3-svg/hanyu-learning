import { useEffect, useState } from 'react'
import type { Vocabulary } from '../../types/lesson'
import type { ReviewRating, VocabularyProgress } from '../../types/progress'
import AudioButton from '../AudioPlayer/AudioButton'
import {
  getVocabularyProgress,
  reviewVocabulary,
} from '../../services/progressService'

interface Props {
  vocabulary: Vocabulary[]
}

const ratingLabels: {
  rating: ReviewRating
  label: string
  helper: string
}[] = [
  { rating: 'again', label: 'Quên', helper: '10 phút' },
  { rating: 'hard', label: 'Khó', helper: 'ngắn' },
  { rating: 'good', label: 'Nhớ', helper: 'bình thường' },
  { rating: 'easy', label: 'Rất dễ', helper: 'dài hơn' },
]

export default function FlashcardDeck({ vocabulary }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useState<VocabularyProgress | null>(null)
  const [saving, setSaving] = useState(false)

  const item = vocabulary[index % vocabulary.length]

  useEffect(() => {
    if (!item) return
    getVocabularyProgress(item.id).then(setProgress)
  }, [item])

  if (vocabulary.length === 0) {
    return <div className="empty-state">Chưa có từ để tạo flashcard.</div>
  }

  const rate = async (rating: ReviewRating) => {
    setSaving(true)
    const next = await reviewVocabulary(item.id, rating)
    setProgress(next)
    setSaving(false)
    setIndex((value) => (value + 1) % vocabulary.length)
    setFlipped(false)
  }

  return (
    <div className="flashcard-shell">
      <div className="flashcard-progress">
        Thẻ {(index % vocabulary.length) + 1}/{vocabulary.length}
      </div>

      <button
        className={flipped ? 'flashcard-card flipped' : 'flashcard-card'}
        onClick={() => setFlipped((value) => !value)}
      >
        {!flipped ? (
          <div className="flashcard-front">
            <div className="flashcard-hanzi">{item.hanzi}</div>
            <span>Bấm để lật</span>
          </div>
        ) : (
          <div className="flashcard-back">
            <div className="flashcard-hanzi small">{item.hanzi}</div>
            <div className="flashcard-pinyin">{item.pinyin}</div>
            <div className="flashcard-meaning">{item.meaningVi}</div>
            {item.hanViet && (
              <div className="flashcard-hanviet">
                Hán Việt: {item.hanViet}
              </div>
            )}

            {progress && (
              <div className="srs-status">
                <span>Trạng thái: {progress.reviewState}</span>
                <span>Lặp: {progress.repetitions}</span>
                <span>Khoảng: {progress.interval} ngày</span>
              </div>
            )}
          </div>
        )}
      </button>

      <div className="flashcard-audio">
        <AudioButton text={item.hanzi} label="Nghe" />
      </div>

      <div className="flashcard-actions">
        {ratingLabels.map((entry) => (
          <button
            key={entry.rating}
            disabled={saving}
            onClick={() => rate(entry.rating)}
          >
            <strong>{entry.label}</strong>
            <small>{entry.helper}</small>
          </button>
        ))}
      </div>

      <p className="muted flashcard-note">
        Phase 5: kết quả đã được lưu vào IndexedDB và vẫn còn sau khi refresh.
      </p>
    </div>
  )
}
