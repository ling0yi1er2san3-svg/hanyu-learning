import { useEffect, useMemo, useState } from 'react'
import QuizPanel from '../../components/Quiz/QuizPanel'
import { loadVocabularyIndexV2 } from '../../services/dataV2Service'
import { vocabularyV2ToLegacy } from '../../services/v2Adapters'
import type { VocabularyV2 } from '../../types/dataV2'

export default function QuizPage() {
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

  const lessons = useMemo(() => {
    if (book === 'all') return []
    return [...new Set(entries.filter((x) => x.book === book).map((x) => x.lesson))].sort((a, b) => a - b)
  }, [entries, book])

  const vocabulary = useMemo(() => {
    return entries
      .filter((x) => (book === 'all' || x.book === book) && (lesson === 'all' || x.lesson === lesson))
      .map(vocabularyV2ToLegacy)
  }, [entries, book, lesson])

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">测验</p>
        <h1>Quiz</h1>
        <p className="muted">Câu hỏi được sinh trực tiếp từ vocabulary-index V2, không có bộ quiz demo riêng.</p>
      </header>

      {!ready ? (
        <div className="source-notice pending">
          <strong>Quiz đang chờ vocabulary-index 1.945 entry đã validation.</strong>
        </div>
      ) : (
        <>
          <div className="v2-filter-row">
            <select
              value={book}
              onChange={(event) => {
                const value = event.target.value === 'all' ? 'all' : Number(event.target.value)
                setBook(value)
                setLesson('all')
              }}
            >
              <option value="all">Tất cả quyển</option>
              {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>Quyển {n}</option>)}
            </select>
            <select
              value={lesson}
              disabled={book === 'all'}
              onChange={(event) => setLesson(event.target.value === 'all' ? 'all' : Number(event.target.value))}
            >
              <option value="all">Tất cả bài</option>
              {lessons.map((n) => <option key={n} value={n}>Bài {n}</option>)}
            </select>
          </div>
          <QuizPanel vocabulary={vocabulary} />
        </>
      )}
    </div>
  )
}
