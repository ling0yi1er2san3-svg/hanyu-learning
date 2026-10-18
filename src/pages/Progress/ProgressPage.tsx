import { useCallback, useEffect, useState } from 'react'
import { loadCatalogV2, loadVocabularyIndexV2 } from '../../services/dataV2Service'
import { getProgressSummary } from '../../services/progressService'

interface ViewModel {
  dueToday: number
  seen: number
  learned: number
  mastered: number
  accuracy: number
  lessonsStarted: number
  lessonsCompleted: number
  totalLessons: number
  availableLessons: number
  partialLessons: number
  missingLessons: number
  vocabularyTotal: number
  vocabularyReady: boolean
}

const empty: ViewModel = {
  dueToday: 0, seen: 0, learned: 0, mastered: 0, accuracy: 0,
  lessonsStarted: 0, lessonsCompleted: 0,
  totalLessons: 0, availableLessons: 0, partialLessons: 0, missingLessons: 0,
  vocabularyTotal: 0, vocabularyReady: false,
}

export default function ProgressPage() {
  const [summary, setSummary] = useState<ViewModel>(empty)

  const refresh = useCallback(() => {
    Promise.all([getProgressSummary(), loadCatalogV2(), loadVocabularyIndexV2()]).then(
      ([progress, catalog, vocabulary]) => {
        const availableIds = new Set(
          catalog.lessons
            .filter((x) => x.sourceStatus === 'core_structured')
            .map((x) => x.id),
        )
        void availableIds
        setSummary({
          dueToday: progress.dueToday,
          seen: progress.seen,
          learned: progress.learned,
          mastered: progress.mastered,
          accuracy: progress.accuracy,
          lessonsStarted: Math.min(progress.lessonsStarted, catalog.coreLessons),
          lessonsCompleted: Math.min(progress.lessonsCompleted, catalog.coreLessons),
          totalLessons: catalog.totalLessons,
          availableLessons: catalog.coreLessons,
          partialLessons: catalog.partialLessons,
          missingLessons: catalog.missingLessons,
          vocabularyTotal: vocabulary.count,
          vocabularyReady: vocabulary.status !== 'not_generated' && vocabulary.count > 0,
        })
      },
    )
  }, [])

  useEffect(() => {
    refresh()
    const handleFocus = () => refresh()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refresh])

  const percent = summary.availableLessons === 0
    ? 0
    : Math.round((summary.lessonsCompleted / summary.availableLessons) * 100)

  return (
    <div className="page">
      <header className="simple-header progress-header-row">
        <div>
          <p className="eyebrow">进度</p>
          <h1>Tiến độ</h1>
          <p className="muted">Mẫu số bài học chỉ tính những bài có nguồn core thật.</p>
        </div>
        <button className="secondary-button" onClick={refresh}>↻ Làm mới</button>
      </header>

      <section className="continue-card">
        <div>
          <span className="section-kicker">Bài học</span>
          <h2>{summary.lessonsCompleted} / {summary.availableLessons} bài</h2>
          <p>{percent}% trong số bài hiện có dữ liệu học.</p>
        </div>
      </section>

      <div className="stats-grid">
        <article className="stat-card"><span>Cần ôn hôm nay</span><strong>{summary.dueToday}</strong></article>
        <article className="stat-card"><span>Đã xem từ</span><strong>{summary.seen}</strong></article>
        <article className="stat-card"><span>Đã thuộc</span><strong>{summary.learned}</strong></article>
        <article className="stat-card"><span>Mastered</span><strong>{summary.mastered}</strong></article>
        <article className="stat-card"><span>Độ chính xác</span><strong>{summary.accuracy}%</strong></article>
        <article className="stat-card"><span>Bài đã bắt đầu</span><strong>{summary.lessonsStarted}</strong></article>
      </div>

      <section className="progress-explainer">
        <h2>Nguồn giáo trình</h2>
        <p>{summary.totalLessons} bài tổng cộng · {summary.availableLessons} core · {summary.partialLessons} partial · {summary.missingLessons} missing.</p>
        <p>
          Từ vựng: {summary.vocabularyReady ? `${summary.vocabularyTotal.toLocaleString('vi-VN')} entry đã sẵn sàng` : 'index vật lý chưa được phát sinh; không hiển thị con số giả'}.
        </p>
      </section>
    </div>
  )
}
