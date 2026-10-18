import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadCatalogV2, loadVocabularyIndexV2 } from '../../services/dataV2Service'
import { getProgressSummary } from '../../services/progressService'

interface Stats {
  dueToday: number
  total: number
  core: number
  partial: number
  missing: number
  vocabularyCount: number
  vocabularyReady: boolean
}

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    dueToday: 0, total: 0, core: 0, partial: 0, missing: 0,
    vocabularyCount: 0, vocabularyReady: false,
  })

  useEffect(() => {
    Promise.all([getProgressSummary(), loadCatalogV2(), loadVocabularyIndexV2()]).then(
      ([progress, catalog, vocabulary]) => setStats({
        dueToday: progress.dueToday,
        total: catalog.totalLessons,
        core: catalog.coreLessons,
        partial: catalog.partialLessons,
        missing: catalog.missingLessons,
        vocabularyCount: vocabulary.count,
        vocabularyReady: vocabulary.count > 0,
      }),
    )
  }, [])

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">汉语学习</p>
          <h1>Học tiếng Trung mỗi ngày</h1>
          <p className="muted">Catalog V2 phân biệt rõ core, partial và missing source.</p>
        </div>
        <div className="today-card">
          <span>Ôn hôm nay</span>
          <strong>{stats.dueToday}</strong>
          <small>từ cần ôn</small>
        </div>
      </header>

      <section className="continue-card">
        <div>
          <span className="section-kicker">V2 Source Status</span>
          <h2>{stats.core} / {stats.total} bài có nguồn core</h2>
          <p>{stats.partial} bài partial · {stats.missing} bài missing. Không dùng placeholder để gọi là hoàn chỉnh.</p>
          <p>{stats.vocabularyReady ? `${stats.vocabularyCount.toLocaleString('vi-VN')} từ đã được phát sinh vật lý trong index V2 (đang tiếp tục mở rộng đến 1.945).` : 'Vocabulary index đang chờ phát sinh vật lý và validation.'}</p>
        </div>
        <Link className="primary-button" to="/books">Xem giáo trình</Link>
      </section>

      <div className="quick-grid">
        <Link className="interactive-card quick-card" to="/search"><strong>搜索</strong><span>Tra từ</span></Link>
        <Link className="interactive-card quick-card" to="/flashcards"><strong>卡片</strong><span>Flashcard</span></Link>
        <Link className="interactive-card quick-card" to="/quiz"><strong>测验</strong><span>Quiz</span></Link>
        <Link className="interactive-card quick-card" to="/listening"><strong>听力</strong><span>Luyện nghe</span></Link>
      </div>
    </div>
  )
}
