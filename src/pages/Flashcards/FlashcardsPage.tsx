import { useEffect, useMemo, useState } from 'react'
import FlashcardDeck from '../../components/Flashcard/FlashcardDeck'
import { loadVocabularyIndexV2 } from '../../services/dataV2Service'
import { vocabularyV2ToLegacy } from '../../services/v2Adapters'
import type { VocabularyV2 } from '../../types/dataV2'

export default function FlashcardsPage() {
  const [entries, setEntries] = useState<VocabularyV2[]>([])
  const [ready, setReady] = useState(false)
  const [book, setBook] = useState<number | 'all'>('all')
  const [lesson, setLesson] = useState<number | 'all'>('all')

  useEffect(() => {
    loadVocabularyIndexV2().then((data) => {
      setEntries(data.entries)
      setReady(data.status !== 'not_generated' && data.count > 0)
    })
  }, [])

  const lessonOptions = useMemo(() => {
    if (book === 'all') return []
    return [...new Set(entries.filter((x) => x.book === book).map((x) => x.lesson))].sort((a, b) => a - b)
  }, [entries, book])

  const vocabulary = useMemo(
    () => entries
      .filter((x) => (book === 'all' || x.book === book) && (lesson === 'all' || x.lesson === lesson))
      .map(vocabularyV2ToLegacy),
    [entries, book, lesson],
  )

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">卡片</p>
        <h1>Flashcard</h1>
        <p className="muted">Flashcard và SRS dùng trực tiếp ID ổn định từ vocabulary-index V2.</p>
      </header>

      {!ready ? (
        <div className="source-notice pending">
          <strong>Vocabulary-index V2 chưa được phát sinh vật lý.</strong>
          <p>Flashcard sẽ mở khi 1.945 entry đã vượt validation; app không dùng dữ liệu demo.</p>
        </div>
      ) : (
        <>
          <div className="v2-filter-row">
            <select value={book} onChange={(event) => {
              const value = event.target.value === 'all' ? 'all' : Number(event.target.value)
              setBook(value)
              setLesson('all')
            }}>
              <option value="all">Tất cả quyển</option>
              {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>Quyển {n}</option>)}
            </select>
            <select value={lesson} disabled={book === 'all'} onChange={(event) => setLesson(event.target.value === 'all' ? 'all' : Number(event.target.value))}>
              <option value="all">Tất cả bài</option>
              {lessonOptions.map((n) => <option key={n} value={n}>Bài {n}</option>)}
            </select>
          </div>
          <FlashcardDeck vocabulary={vocabulary} />
        </>
      )}
    </div>
  )
}
