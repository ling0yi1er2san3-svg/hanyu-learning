import { useEffect, useMemo, useState } from 'react'
import FlashcardDeck from '../../components/Flashcard/FlashcardDeck'
import { loadVocabularyIndexV2 } from '../../services/dataV2Service'
import { getDueVocabularyIds } from '../../services/progressService'
import { vocabularyV2ToLegacy } from '../../services/v2Adapters'
import type { VocabularyV2 } from '../../types/dataV2'

export default function ReviewPage() {
  const [entries, setEntries] = useState<VocabularyV2[]>([])
  const [dueIds, setDueIds] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    Promise.all([loadVocabularyIndexV2(), getDueVocabularyIds()]).then(([index, ids]) => {
      setEntries(index.entries)
      setDueIds(ids)
      setReady(index.status !== 'not_generated' && index.count > 0)
    })
  }, [])

  const vocabulary = useMemo(() => {
    const due = new Set(dueIds)
    return entries.filter((word) => due.has(word.id)).map(vocabularyV2ToLegacy)
  }, [entries, dueIds])

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">复习</p>
        <h1>Ôn tập</h1>
        <p className="muted">Chỉ lấy những vocabularyId đang đến hạn từ IndexedDB rồi nối lại với dữ liệu V2.</p>
      </header>

      {!ready ? (
        <div className="source-notice pending">
          <strong>Review đang chờ vocabulary-index V2 hoàn chỉnh.</strong>
        </div>
      ) : vocabulary.length === 0 ? (
        <div className="empty-state">
          <div className="empty-symbol">✓</div>
          <h2>Hiện chưa có từ đến hạn</h2>
          <p>Học hoặc đánh giá flashcard để tạo lịch ôn SRS.</p>
        </div>
      ) : (
        <FlashcardDeck vocabulary={vocabulary} />
      )}
    </div>
  )
}
