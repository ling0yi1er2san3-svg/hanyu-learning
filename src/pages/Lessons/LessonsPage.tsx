import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadCatalogV2 } from '../../services/dataV2Service'
import type { CatalogLessonV2 } from '../../types/dataV2'

function label(status: CatalogLessonV2['sourceStatus']) {
  if (status === 'core_structured') return 'Core'
  if (status === 'partial_source') return 'Nguồn chưa đầy đủ'
  return 'Chưa có nguồn'
}

export default function LessonsPage() {
  const params = useParams()
  const bookNumber = Number(params.bookNumber)
  const [lessons, setLessons] = useState<CatalogLessonV2[]>([])

  useEffect(() => {
    loadCatalogV2().then((catalog) => {
      setLessons(catalog.lessons.filter((x) => x.book === bookNumber))
    })
  }, [bookNumber])

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">Book {bookNumber}</p>
        <h1>Giáo trình Hán ngữ {bookNumber}</h1>
        <p className="muted">Bài core, partial và missing đều hiển thị; chỉ core có thể mở dữ liệu học khi lesson JSON thật tồn tại.</p>
      </header>

      <div className="lesson-list">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            className={`lesson-list-card source-${lesson.sourceStatus}`}
            to={`/book/${bookNumber}/lesson/${lesson.lesson}`}
          >
            <div className="lesson-badge">Bài {lesson.lesson}</div>
            <div className="grow">
              <div className="lesson-title-zh">{lesson.titleZh}</div>
              {lesson.titleVi && <div className="lesson-title-vi">{lesson.titleVi}</div>}
              <div className="catalog-meta">ID: {lesson.id}</div>
            </div>
            <span className={`catalog-status ${lesson.sourceStatus === 'core_structured' ? 'ready' : 'pending'}`}>
              {label(lesson.sourceStatus)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
