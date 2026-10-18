import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadCatalogV2 } from '../../services/dataV2Service'
import type { CatalogLessonV2 } from '../../types/dataV2'

export default function BooksPage() {
  const [lessons, setLessons] = useState<CatalogLessonV2[]>([])

  useEffect(() => {
    loadCatalogV2().then((catalog) => setLessons(catalog.lessons))
  }, [])

  const books = useMemo(() => [1,2,3,4,5,6].map((book) => {
    const items = lessons.filter((x) => x.book === book)
    return {
      book,
      total: items.length,
      core: items.filter((x) => x.sourceStatus === 'core_structured').length,
      partial: items.filter((x) => x.sourceStatus === 'partial_source').length,
      missing: items.filter((x) => x.sourceStatus === 'missing_source').length,
    }
  }), [lessons])

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">课程</p>
        <h1>Giáo trình</h1>
        <p className="muted">6 quyển · 76 bài. Trạng thái được lấy từ catalog-v2.json.</p>
      </header>

      <div className="list-stack">
        {books.map((book) => (
          <Link className="list-card interactive-card" key={book.book} to={`/book/${book.book}`}>
            <div className="book-number compact">{book.book}</div>
            <div className="grow">
              <strong>Giáo trình Hán ngữ {book.book}</strong>
              <span>{book.total} bài · {book.core} core · {book.partial} partial · {book.missing} missing</span>
            </div>
            <span className="status-chip">V2</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
