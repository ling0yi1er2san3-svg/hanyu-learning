import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AudioButton from '../../components/AudioPlayer/AudioButton'
import DisplayControls from '../../components/DisplayControls/DisplayControls'
import InteractiveExercise from '../../components/InteractiveExercise/InteractiveExercise'
import { findCatalogLessonV2, loadLessonV2 } from '../../services/dataV2Service'
import { markLessonCompleted, markLessonOpened } from '../../services/progressService'
import type { CatalogLessonV2, LessonV2 } from '../../types/dataV2'

type TabKey = 'text' | 'vocabulary' | 'grammar' | 'phonetics' | 'exercise'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'text', label: 'Bài khóa' },
  { key: 'vocabulary', label: 'Từ vựng' },
  { key: 'grammar', label: 'Ngữ pháp / 用法' },
  { key: 'phonetics', label: 'Ngữ âm' },
  { key: 'exercise', label: 'Bài tập' },
]

function buildLessonSpeechText(lesson: LessonV2) {
  const parts: string[] = []

  for (const dialogue of lesson.dialogues ?? []) {
    for (const line of dialogue.lines) {
      if (line.chinese?.trim()) parts.push(line.chinese.trim())
    }
  }

  for (const text of lesson.texts ?? []) {
    if ((text.sentences?.length ?? 0) > 0) {
      for (const sentence of text.sentences ?? []) {
        if (sentence.chinese?.trim()) parts.push(sentence.chinese.trim())
      }
    } else if (text.chinese?.trim()) {
      parts.push(text.chinese.trim())
    }
  }

  return parts.join('。')
}

function SourceNotice({ item }: { item: CatalogLessonV2 }) {
  const message =
    item.sourceStatus === 'partial_source'
      ? 'Nguồn giáo trình hiện tại kết thúc khi bài này chưa đầy đủ. Bài chưa được mở ở chế độ học chính thức.'
      : 'Chưa có nguồn đầy đủ cho bài này trong bộ tài liệu hiện tại.'

  return (
    <div className="page">
      <div className="lesson-topbar">
        <Link className="back-link" to={`/book/${item.book}`}>← Quyển {item.book}</Link>
        <span>Bài {item.lesson}</span>
      </div>
      <header className="lesson-hero">
        <div>
          <p className="eyebrow">Bài {item.lesson}</p>
          <h1 className="lesson-main-title">{item.titleZh}</h1>
        </div>
      </header>
      <div className="source-notice pending">
        <strong>{item.sourceStatus === 'partial_source' ? 'Nguồn chưa đầy đủ' : 'Chưa có nguồn'}</strong>
        <p>{message}</p>
        <p>V2 không dùng lesson demo hoặc placeholder để thay thế.</p>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const params = useParams()
  const bookNumber = Number(params.bookNumber)
  const lessonNumber = Number(params.lessonNumber)

  const [catalogItem, setCatalogItem] = useState<CatalogLessonV2 | null>(null)
  const [lesson, setLesson] = useState<LessonV2 | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('text')
  const [showPinyin, setShowPinyin] = useState(true)
  const [showVietnamese, setShowVietnamese] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setCatalogItem(null)
    setLesson(null)

    findCatalogLessonV2(bookNumber, lessonNumber).then(async (item) => {
      setCatalogItem(item)
      if (item?.sourceStatus === 'core_structured') {
        const data = await loadLessonV2(bookNumber, lessonNumber)
        if (data) {
          setLesson(data)
          await markLessonOpened(bookNumber, lessonNumber)
        }
      }
      setLoaded(true)
    })
  }, [bookNumber, lessonNumber])

  if (!loaded) {
    return <div className="page"><div className="loading-box">Đang tải bài học...</div></div>
  }

  if (!catalogItem) {
    return <div className="page"><div className="error-box">Không tìm thấy bài trong catalog V2.</div></div>
  }

  if (catalogItem.sourceStatus !== 'core_structured') {
    return <SourceNotice item={catalogItem} />
  }

  if (!lesson) {
    return (
      <div className="page">
        <div className="lesson-topbar">
          <Link className="back-link" to={`/book/${bookNumber}`}>← Quyển {bookNumber}</Link>
          <span>Bài {lessonNumber}</span>
        </div>
        <header className="lesson-hero">
          <div>
            <p className="eyebrow">Bài {lessonNumber}</p>
            <h1 className="lesson-main-title">{catalogItem.titleZh}</h1>
          </div>
        </header>
        <div className="source-notice pending">
          <strong>Catalog xác nhận đây là bài core, nhưng lesson JSON vật lý chưa được sinh.</strong>
          <p>App không fallback sang demo. File chỉ được mở sau khi vocabulary/text/grammar/exercises thật vượt validation.</p>
        </div>
      </div>
    )
  }

  const grammarItems = [...(lesson.grammar ?? []), ...(lesson.usage ?? [])]
  const lessonSpeechText = buildLessonSpeechText(lesson)
  const verifiedLessonTracks = (lesson.audio?.tracks ?? []).filter((track) => track.mappingVerified && track.src)

  return (
    <div className="page lesson-page">
      <div className="lesson-topbar">
        <Link className="back-link" to={`/book/${bookNumber}`}>← Quyển {bookNumber}</Link>
        <span>Bài {lesson.lesson}</span>
      </div>

      <header className="lesson-hero">
        <div>
          <p className="eyebrow">Bài {lesson.lesson}</p>
          <h1 className="lesson-main-title">{lesson.titleZh}</h1>
          {lesson.titlePinyin && <div className="lesson-main-pinyin">{lesson.titlePinyin}</div>}
          {lesson.titleVi && <div className="lesson-main-vi">{lesson.titleVi}</div>}
        </div>
        <AudioButton text={lesson.titleZh} label="Nghe tiêu đề" />
      </header>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'lesson-tab active' : 'lesson-tab'}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'text' && (
        <section className="lesson-section">
          <DisplayControls
            showPinyin={showPinyin}
            showVietnamese={showVietnamese}
            onTogglePinyin={() => setShowPinyin((value) => !value)}
            onToggleVietnamese={() => setShowVietnamese((value) => !value)}
          />

          <div className="lesson-audio-toolbar">
            {verifiedLessonTracks.map((track, index) => (
              <AudioButton
                key={track.id}
                text={lessonSpeechText || lesson.titleZh}
                src={track.src}
                label={track.label || `Gốc ${index + 1}`}
                title="Phát audio gốc đã xác minh"
              />
            ))}
            {lessonSpeechText && <AudioButton text={lessonSpeechText} label="TTS toàn bài" title="Đọc toàn bài bằng TTS tiếng Trung" />}
            <span className="muted">
              {verifiedLessonTracks.length > 0
                ? 'Có audio gốc đã xác minh. TTS vẫn được giữ để luyện riêng.'
                : 'Chưa có audio gốc được xác minh cho bài này; hiện dùng TTS tiếng Trung.'}
            </span>
          </div>

          {(lesson.dialogues ?? []).map((dialogue) => (
            <article className="text-block" key={dialogue.id}>
              <h2>{dialogue.title || 'Hội thoại'}</h2>
              <div className="sentence-stack">
                {dialogue.lines.map((line, index) => (
                  <div className="sentence-card" key={`${dialogue.id}-${index}`}>
                    <div className="sentence-row">
                      <div className="sentence-zh">{line.speaker && <strong>{line.speaker}: </strong>}{line.chinese}</div>
                      {line.audioStatus === 'verified' && line.audio && (
                        <AudioButton text={line.chinese} src={line.audio} label="Gốc" title="Phát audio gốc của câu" />
                      )}
                      <AudioButton text={line.chinese} label="TTS" title="Đọc câu bằng TTS tiếng Trung" />
                    </div>
                    {showPinyin && line.pinyin && <div className="sentence-pinyin">{line.pinyin}</div>}
                    {showVietnamese && line.vietnamese && <div className="sentence-vi">{line.vietnamese}</div>}
                  </div>
                ))}
              </div>
            </article>
          ))}

          {(lesson.texts ?? []).map((text) => (
            <article className="text-block" key={text.id}>
              {text.title && <h2>{text.title}</h2>}
              {text.chinese && (
                <div className="v2-long-text-with-audio">
                  <div className="v2-long-text">{text.chinese}</div>
                  {text.audioStatus === 'verified' && text.audio && (
                    <AudioButton text={text.chinese} src={text.audio} label="Gốc" title="Phát audio gốc của đoạn" />
                  )}
                  <AudioButton text={text.chinese} label="TTS" title="Đọc đoạn bằng TTS tiếng Trung" />
                </div>
              )}
              {showVietnamese && text.vietnamese && <div className="sentence-vi">{text.vietnamese}</div>}
              {(text.sentences ?? []).map((line, index) => (
                <div className="sentence-card" key={`${text.id}-${index}`}>
                  <div className="sentence-row">
                    <div className="sentence-zh">{line.chinese}</div>
                    {line.audioStatus === 'verified' && line.audio && (
                      <AudioButton text={line.chinese} src={line.audio} label="Gốc" title="Phát audio gốc của câu" />
                    )}
                    <AudioButton text={line.chinese} label="TTS" title="Đọc câu bằng TTS tiếng Trung" />
                  </div>
                  {showPinyin && line.pinyin && <div className="sentence-pinyin">{line.pinyin}</div>}
                  {showVietnamese && line.vietnamese && <div className="sentence-vi">{line.vietnamese}</div>}
                </div>
              ))}
            </article>
          ))}

          {(lesson.dialogues?.length ?? 0) === 0 && (lesson.texts?.length ?? 0) === 0 && (
            <div className="empty-state">Bài khóa chưa có dữ liệu vật lý trong lesson JSON này.</div>
          )}
        </section>
      )}

      {activeTab === 'vocabulary' && (
        <section className="lesson-section">
          <div className="vocab-grid">
            {lesson.vocabulary.map((word) => (
              <article className="vocab-card" key={word.id}>
                <div className="vocab-topline">
                  <div className="vocab-hanzi">{word.hanzi}</div>
                  <div className="audio-choice-row">
                    {word.audioStatus === 'verified' && word.audio && (
                      <AudioButton text={word.hanzi} label="Gốc" src={word.audio} title="Phát audio gốc của từ" />
                    )}
                    <AudioButton text={word.hanzi} label="TTS" title="Đọc từ bằng TTS tiếng Trung" />
                  </div>
                </div>
                <div className="vocab-pinyin">{word.pinyin}</div>
                <div className="vocab-meaning">{word.meaningVi}</div>
                {word.hanVietStatus === 'verified' && word.hanViet && <div>Hán Việt: {word.hanViet}</div>}
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'grammar' && (
        <section className="lesson-section">
          <div className="grammar-stack">
            {grammarItems.map((item) => (
              <article className="grammar-card" key={item.id}>
                <h3>{item.pattern}</h3>
                {item.explanationVi && <p>{item.explanationVi}</p>}
                {(item.examples ?? []).map((example, index) => (
                  <div className="sentence-card" key={`${item.id}-${index}`}>
                    <div className="sentence-zh">{example.chinese}</div>
                    {showPinyin && example.pinyin && <div className="sentence-pinyin">{example.pinyin}</div>}
                    {showVietnamese && example.vietnamese && <div className="sentence-vi">{example.vietnamese}</div>}
                  </div>
                ))}
              </article>
            ))}
            {grammarItems.length === 0 && <div className="empty-state">Chưa có mục grammar/usage vật lý.</div>}
          </div>
        </section>
      )}

      {activeTab === 'phonetics' && (
        <section className="lesson-section">
          <div className="grammar-stack">
            {(lesson.phonetics ?? []).map((item) => (
              <article className="grammar-card" key={item.id}>
                <h3>{item.pattern}</h3>
                {item.explanationVi && <p>{item.explanationVi}</p>}
              </article>
            ))}
            {(lesson.phonetics?.length ?? 0) === 0 && <div className="empty-state">Bài này không có mục ngữ âm riêng hoặc dữ liệu chưa phát sinh.</div>}
          </div>
          <p className="muted">Không đặt audio riêng dưới các thẻ ngữ âm.</p>
        </section>
      )}

      {activeTab === 'exercise' && (
        <section className="lesson-section">
          {(lesson.exerciseGroups?.length ?? 0) > 0 && (
            <div className="exercise-source-note">
              <strong>Bài luyện tương tác</strong>
              <span>Tên dạng bài lấy từ giáo trình; câu hỏi bên dưới được app tạo từ chính từ vựng, hội thoại và câu thật của bài này. Không giả là đáp án chính thức của sách.</span>
            </div>
          )}
          <div className="exercise-group-stack">
            {(lesson.exerciseGroups ?? []).map((group, index) => (
              <details className="exercise-group-card" key={group.id} open={index === 0}>
                <summary>
                  <div className="grow"><strong>{group.title}</strong>{group.type && <span>{group.type}</span>}</div>
                  <span className="exercise-open-label">Mở bài</span>
                </summary>
                <InteractiveExercise lesson={lesson} group={group} />
              </details>
            ))}
          </div>
          {(lesson.exerciseGroups?.length ?? 0) === 0 && <div className="empty-state">Bài này chưa có nhóm bài tập trong dữ liệu nguồn.</div>}
        </section>
      )}

      <div className="lesson-complete-bar">
        <button className="primary-button" onClick={async () => {
          await markLessonCompleted(bookNumber, lessonNumber)
          alert('Đã đánh dấu bài học hoàn thành.')
        }}>✓ Đánh dấu hoàn thành bài</button>
      </div>
    </div>
  )
}
