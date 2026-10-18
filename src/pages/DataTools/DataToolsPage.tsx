import { useMemo, useState } from 'react'
import type {
  AudioMapItem,
  ImportRow,
  ValidationIssue,
} from '../../types/dataTools'
import {
  buildAudioMap,
  buildVocabularyJson,
  downloadJson,
  parseCsvFile,
  parseJsonFile,
  validateRows,
} from '../../services/dataToolsService'

type ImportKind = 'json' | 'csv'

export default function DataToolsPage() {
  const [rows, setRows] = useState<ImportRow[]>([])
  const [issues, setIssues] = useState<ValidationIssue[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [lessonId, setLessonId] = useState('b1_l01')
  const [audioMap, setAudioMap] = useState<AudioMapItem[]>([])

  const errorCount = useMemo(
    () => issues.filter((item) => item.level === 'error').length,
    [issues],
  )

  const warningCount = useMemo(
    () => issues.filter((item) => item.level === 'warning').length,
    [issues],
  )

  const handleImport = async (file: File, kind: ImportKind) => {
    setMessage('')
    setError('')

    try {
      let imported: ImportRow[] = []

      if (kind === 'json') imported = await parseJsonFile(file)
      if (kind === 'csv') imported = await parseCsvFile(file)

      setRows(imported)
      const nextIssues = validateRows(imported)
      setIssues(nextIssues)
      setMessage(`Đã đọc ${imported.length} dòng dữ liệu.`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Không thể đọc file dữ liệu.',
      )
    }
  }

  const exportVocabulary = () => {
    const vocabulary = buildVocabularyJson(rows)
    downloadJson('vocabulary-normalized.json', vocabulary)
  }

  const exportAudioMap = () => {
    downloadJson('audio-map.json', {
      schemaVersion: 1,
      lessonId,
      tracks: audioMap,
    })
  }

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">DATA TOOLS</p>
        <h1>Công cụ chuẩn bị dữ liệu</h1>
        <p className="muted">
          Trang này dành cho việc chuẩn bị nội dung giáo trình trước khi publish.
          Người học bình thường không cần dùng trang này.
        </p>
      </header>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      <section className="tools-section">
        <span className="section-kicker">Import</span>
        <h2>Nhập từ vựng</h2>
        <p className="muted">
          Hỗ trợ JSON, CSV và TSV trực tiếp trong web. Excel được chuyển sang CSV/TSV trước khi import để loại bỏ hoàn toàn dependency xlsx có cảnh báo bảo mật.
        </p>

        <div className="tool-import-grid">
          <label className="file-tool-card">
            <strong>JSON</strong>
            <span>lesson JSON hoặc mảng vocabulary</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void handleImport(file, 'json')
              }}
            />
          </label>

          <label className="file-tool-card">
            <strong>CSV / TSV</strong>
            <span>UTF-8, dòng đầu là header</span>
            <input
              type="file"
              accept=".csv,.tsv,text/csv,text/tab-separated-values"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void handleImport(file, 'csv')
              }}
            />
          </label>

          <article className="file-tool-card">
            <strong>Excel (.xlsx/.xls)</strong>
            <span>
              Vì lý do bảo mật, web không còn nhúng SheetJS/xlsx.
              Hãy chuyển Excel sang CSV/TSV trước khi import.
            </span>
            <div className="excel-safe-note">
              Cách nhanh nhất: Excel → File → Save As → CSV UTF-8.
            </div>
          </article>
        </div>
      </section>

      {rows.length > 0 && (
        <section className="tools-section">
          <div className="validation-summary">
            <div>
              <span>Dòng dữ liệu</span>
              <strong>{rows.length}</strong>
            </div>
            <div>
              <span>Lỗi</span>
              <strong>{errorCount}</strong>
            </div>
            <div>
              <span>Cảnh báo</span>
              <strong>{warningCount}</strong>
            </div>
          </div>

          <div className="tool-actions">
            <button className="primary-button" onClick={exportVocabulary}>
              Xuất vocabulary-normalized.json
            </button>
          </div>

          <div className="data-preview-table-wrap">
            <table className="data-preview-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hanzi</th>
                  <th>Pinyin</th>
                  <th>Hán Việt</th>
                  <th>Nghĩa Việt</th>
                  <th>Book</th>
                  <th>Lesson</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 50).map((row, index) => (
                  <tr key={`${row.hanzi}-${index}`}>
                    <td>{index + 1}</td>
                    <td className="table-hanzi">{row.hanzi || '—'}</td>
                    <td>{row.pinyin || '—'}</td>
                    <td>{row.hanViet || '—'}</td>
                    <td>{row.meaningVi || '—'}</td>
                    <td>{row.book || '—'}</td>
                    <td>{row.lesson || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {issues.length > 0 && (
            <div className="validation-issues">
              <h3>Danh sách lỗi/cảnh báo</h3>
              {issues.slice(0, 100).map((issue, index) => (
                <div
                  key={`${issue.row}-${issue.field}-${index}`}
                  className={`validation-issue ${issue.level}`}
                >
                  <span>Dòng {issue.row}</span>
                  <strong>{issue.field}</strong>
                  <span>{issue.message}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="tools-section">
        <span className="section-kicker">Audio mapper</span>
        <h2>Tạo audio-map.json</h2>

        <div className="audio-map-toolbar">
          <label>
            Lesson ID
            <input
              value={lessonId}
              onChange={(event) => setLessonId(event.target.value)}
              placeholder="b5_l01"
            />
          </label>

          <label className="audio-file-picker">
            Chọn nhiều MP3/WAV
            <input
              type="file"
              multiple
              accept=".mp3,.wav,.m4a,audio/*"
              onChange={(event) => {
                const files = Array.from(event.target.files || [])
                setAudioMap(buildAudioMap(files, lessonId))
              }}
            />
          </label>
        </div>

        {audioMap.length > 0 && (
          <>
            <div className="audio-map-list">
              {audioMap.map((item, index) => (
                <div className="audio-map-row" key={item.id}>
                  <span>{index + 1}</span>
                  <strong>{item.fileName}</strong>
                  <input
                    value={item.trackId}
                    onChange={(event) => {
                      setAudioMap((current) =>
                        current.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, trackId: event.target.value }
                            : entry,
                        ),
                      )
                    }}
                  />
                </div>
              ))}
            </div>

            <button className="primary-button" onClick={exportAudioMap}>
              Xuất audio-map.json
            </button>
          </>
        )}

        <p className="tool-note">
          Công cụ này chỉ tạo mapping. Trình duyệt không thể tự chép MP3 vào
          folder public/audio. Sau khi mapping đúng, file audio thật vẫn cần
          được đặt vào project ở bước tích hợp dữ liệu.
        </p>
      </section>

      <section className="tools-section">
        <span className="section-kicker">PDF workflow</span>
        <h2>Quy trình PDF / OCR</h2>
        <div className="workflow-grid">
          <div>PDF</div>
          <div>→</div>
          <div>Extract text nếu có</div>
          <div>→</div>
          <div>OCR nếu là scan</div>
          <div>→</div>
          <div>Kiểm tra thủ công</div>
          <div>→</div>
          <div>CSV/Excel/JSON</div>
          <div>→</div>
          <div>Data Tools</div>
          <div>→</div>
          <div>lesson JSON</div>
        </div>
        <p className="tool-note">
          Không publish thẳng kết quả OCR. Chữ Hán, Pinyin, nghĩa Việt,
          Hán Việt và audio phải được validation trước.
        </p>
      </section>
    </div>
  )
}
