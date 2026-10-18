import { useEffect, useMemo, useState } from 'react'
import FlashcardDeck from '../../components/Flashcard/FlashcardDeck'
import { loadVocabularyIndexV2 } from '../../services/dataV2Service'
import { getAllVocabularyProgress } from '../../services/progressService'
import { vocabularyV2ToLegacy } from '../../services/v2Adapters'
import type { VocabularyProgress } from '../../types/progress'
import type { VocabularyV2 } from '../../types/dataV2'

type ReviewMode = 'due' | 'studied'

export default function ReviewPage() {
  const [entries, setEntries] = useState<VocabularyV2[]>([])
  const [progress, setProgress] = useState<VocabularyProgress[]>([])
  const [ready, setReady] = useState(false)
  const [mode, setMode] = useState<ReviewMode>('due')

  useEffect(() => {
    Promise.all([loadVocabularyIndexV2(), getAllVocabularyProgress()]).then(([index, progressRows]) => {
      setEntries(index.entries)
      setProgress(progressRows)
      setReady(index.status !== 'not_generated' && index.count > 0)
      const now = new Date().toISOString()
      const dueCount = progressRows.filter((item) => !item.nextReview || item.nextReview <= now).length
      if (dueCount === 0 && progressRows.length > 0) setMode('studied')
    })
  }, [])

  const nowIso = new Date().toISOString()
  const dueIds = useMemo(
    () => new Set(progress.filter((item) => !item.nextReview || item.nextReview <= nowIso).map((item) => item.vocabularyId)),
    [progress, nowIso],
  )
  const studiedIds = useMemo(() => new Set(progress.map((item) => item.vocabularyId)), [progress])

  const vocabulary = useMemo(() => {
    const ids = mode === 'due' ? dueIds : studiedIds
    return entries.filter((word) => ids.has(word.id)).map(vocabularyV2ToLegacy)
  }, [entries, mode, dueIds, studiedIds])

  return (
    <div className="page review-page">
      <header className="simple-header">
        <p className="eyebrow">复习</p>
        <h1>Ôn tập</h1>
        <p className="muted">Từ đã xem trong Flashcard và từ đã làm trong Quiz đều được đưa vào lịch ôn.</p>
      </header>

      {!ready ? (
        <div className="source-notice pending">
          <strong>Dữ liệu từ vựng chưa sẵn sàng.</strong>
        </div>
      ) : studiedIds.size === 0 ? (
        <div className="empty-state">
          <div className="empty-symbol">✓</div>
          <h2>Chưa có từ đã học</h2>
          <p>Mở Flashcard hoặc làm Quiz; từ sẽ tự xuất hiện ở đây.</p>
        </div>
      ) : (
        <>
          <div className="review-summary-grid">
            <button className={mode === 'due' ? 'review-summary-card active' : 'review-summary-card'} onClick={() => setMode('due')}>
              <span>Đến hạn</span><strong>{dueIds.size}</strong><small>Ôn theo lịch SRS</small>
            </button>
            <button className={mode === 'studied' ? 'review-summary-card active' : 'review-summary-card'} onClick={() => setMode('studied')}>
              <span>Đã học</span><strong>{studiedIds.size}</strong><small>Có thể ôn ngay bất cứ lúc nào</small>
            </button>
          </div>

          {vocabulary.length === 0 ? (
            <div className="empty-state compact">
              <h2>Hôm nay chưa có từ đến hạn</h2>
              <p>Bạn vẫn có thể bấm <strong>Đã học</strong> để ôn ngay.</p>
            </div>
          ) : (
            <FlashcardDeck vocabulary={vocabulary} />
          )}
        </>
      )}
    </div>
  )
}
