import { useEffect, useMemo, useState } from 'react'
import type { VocabularyV2 } from '../../types/dataV2'
import {
  loadVocabularySearchIndexV2,
  normalizeSearchV2,
} from '../../services/dataV2Service'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [bookFilter, setBookFilter] = useState<number | 'all'>('all')
  const [entries, setEntries] = useState<VocabularyV2[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadVocabularySearchIndexV2()
      .then((data) => {
        setEntries(data.entries)
        setReady(data.count > 0)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  const results = useMemo(() => {
    const q = normalizeSearchV2(query)
    if (!q) return []
    return entries
      .filter((word) => {
        if (bookFilter !== 'all' && word.book !== bookFilter) return false
        const fields = [
          word.hanzi,
          word.pinyin,
          word.pinyinPlain ?? '',
          word.pinyinNumber ?? '',
          word.meaningVi,
          word.hanViet ?? '',
          ...(word.searchKeys ?? []),
        ]
        return fields.some((field) => normalizeSearchV2(field).includes(q))
      })
      .slice(0, 100)
  }, [query, entries, bookFilter])

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">搜索</p>
        <h1>Tra từ</h1>
        <p className="muted">Tìm theo chữ Hán, Pinyin có/không dấu, nghĩa Việt và Hán Việt đã xác minh.</p>
      </header>

      {error && <div className="error-box">{error}</div>}
      {!error && !ready && (
        <div className="source-notice pending">
          <strong>Index từ vựng V2 chưa được phát sinh vật lý.</strong>
          <p>Catalog đã sẵn sàng, nhưng Search chỉ mở sau khi 1.945 entry vượt validation.</p>
        </div>
      )}

      {ready && (
        <>
          <div className="v2-filter-row">
            <input
              className="v2-search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="汉字 / Pinyin / nghĩa Việt / Hán Việt"
            />
            <select
              value={bookFilter}
              onChange={(event) =>
                setBookFilter(event.target.value === 'all' ? 'all' : Number(event.target.value))
              }
            >
              <option value="all">Tất cả 6 quyển</option>
              {[1, 2, 3, 4, 5, 6].map((book) => (
                <option key={book} value={book}>Quyển {book}</option>
              ))}
            </select>
          </div>

          {query && <p className="muted">{results.length} kết quả (tối đa 100).</p>}
          <div className="list-stack">
            {results.map((word) => (
              <article className="list-card" key={word.id}>
                <div className="grow">
                  <div className="lesson-title-zh">{word.hanzi}</div>
                  <div className="lesson-title-pinyin">{word.pinyin}</div>
                  <div>{word.meaningVi}</div>
                  {word.hanVietStatus === 'verified' && word.hanViet && (
                    <small>Hán Việt: {word.hanViet}</small>
                  )}
                </div>
                <span className="status-chip">Q{word.book} · B{word.lesson}</span>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
