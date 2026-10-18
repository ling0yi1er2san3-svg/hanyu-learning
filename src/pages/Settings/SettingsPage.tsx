import { useRef, useState } from 'react'
import type { BackupPayload, BackupPreview, ImportMode } from '../../types/backup'
import {
  exportBackupFile,
  importBackup,
  parseBackupText,
  previewBackup,
} from '../../services/backupService'

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [selectedBackup, setSelectedBackup] =
    useState<BackupPayload | null>(null)
  const [preview, setPreview] = useState<BackupPreview | null>(null)
  const [importMode, setImportMode] = useState<ImportMode>('replace')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const resetMessages = () => {
    setMessage('')
    setError('')
  }

  const handleExport = async () => {
    resetMessages()
    setBusy(true)

    try {
      await exportBackupFile()
      setMessage('Đã tạo file backup. Hãy giữ file này ở nơi an toàn.')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Không thể xuất backup.',
      )
    } finally {
      setBusy(false)
    }
  }

  const handleFile = async (file: File) => {
    resetMessages()
    setSelectedBackup(null)
    setPreview(null)

    try {
      const text = await file.text()
      const backup = parseBackupText(text)
      setSelectedBackup(backup)
      setPreview(previewBackup(backup))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Không thể đọc backup.',
      )
    }
  }

  const handleImport = async () => {
    if (!selectedBackup) return

    resetMessages()

    const confirmed = window.confirm(
      importMode === 'replace'
        ? 'Ghi đè toàn bộ tiến độ hiện tại bằng file backup này?'
        : 'Gộp dữ liệu backup với tiến độ hiện tại?',
    )

    if (!confirmed) return

    setBusy(true)

    try {
      await importBackup(selectedBackup, importMode)
      setMessage(
        importMode === 'replace'
          ? 'Nhập backup thành công. Dữ liệu hiện tại đã được thay thế.'
          : 'Gộp backup thành công.',
      )
      setSelectedBackup(null)
      setPreview(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Nhập backup thất bại.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">设置</p>
        <h1>Cài đặt</h1>
        <p className="muted">
          Phase 6: xuất và nhập tiến độ học giữa các máy bằng file JSON.
        </p>
      </header>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      <section className="settings-section">
        <div>
          <span className="section-kicker">Dữ liệu học tập</span>
          <h2>Backup tiến độ</h2>
          <p className="muted">
            File backup chỉ chứa tiến độ, SRS, lịch sử ôn và cài đặt.
            Nội dung giáo trình và audio không nằm trong backup.
          </p>
        </div>

        <div className="backup-action-grid">
          <article className="backup-card">
            <div className="backup-icon">↓</div>
            <h3>Xuất backup</h3>
            <p>
              Tạo một file JSON để mang tiến độ sang máy tính hoặc điện thoại khác.
            </p>
            <button
              className="primary-button"
              disabled={busy}
              onClick={handleExport}
            >
              Xuất backup.json
            </button>
          </article>

          <article className="backup-card">
            <div className="backup-icon">↑</div>
            <h3>Nhập backup</h3>
            <p>
              Chọn file backup đã xuất từ một thiết bị khác.
            </p>

            <input
              ref={fileInputRef}
              className="backup-file-input"
              type="file"
              accept=".json,application/json"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void handleFile(file)
              }}
            />
          </article>
        </div>
      </section>

      {preview && selectedBackup && (
        <section className="settings-section backup-preview-section">
          <span className="section-kicker">Kiểm tra trước khi nhập</span>
          <h2>Nội dung backup</h2>

          <div className="backup-preview-grid">
            <div>
              <span>Xuất lúc</span>
              <strong>
                {new Date(preview.exportedAt).toLocaleString()}
              </strong>
            </div>
            <div>
              <span>Bài có tiến độ</span>
              <strong>{preview.lessonProgressCount}</strong>
            </div>
            <div>
              <span>Từ có tiến độ</span>
              <strong>{preview.vocabularyProgressCount}</strong>
            </div>
            <div>
              <span>Lượt ôn</span>
              <strong>{preview.reviewHistoryCount}</strong>
            </div>
            <div>
              <span>Cài đặt</span>
              <strong>{preview.settingsCount}</strong>
            </div>
          </div>

          <div className="import-mode-box">
            <label className="import-mode-option">
              <input
                type="radio"
                name="import-mode"
                checked={importMode === 'replace'}
                onChange={() => setImportMode('replace')}
              />
              <span>
                <strong>Ghi đè toàn bộ</strong>
                <small>
                  Xóa tiến độ hiện tại của máy này rồi khôi phục đúng theo backup.
                </small>
              </span>
            </label>

            <label className="import-mode-option">
              <input
                type="radio"
                name="import-mode"
                checked={importMode === 'merge'}
                onChange={() => setImportMode('merge')}
              />
              <span>
                <strong>Gộp dữ liệu</strong>
                <small>
                  Giữ dữ liệu mới hơn ở mỗi bài/từ và gộp lịch sử ôn.
                </small>
              </span>
            </label>
          </div>

          <div className="backup-confirm-row">
            <button
              className="primary-button"
              disabled={busy}
              onClick={handleImport}
            >
              {busy ? 'Đang xử lý...' : 'Nhập dữ liệu'}
            </button>

            <button
              className="secondary-button"
              disabled={busy}
              onClick={() => {
                setSelectedBackup(null)
                setPreview(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
            >
              Hủy
            </button>
          </div>
        </section>
      )}

      <section className="settings-section safety-note">
        <span className="section-kicker">Cách chuyển sang máy khác</span>
        <ol>
          <li>Máy cũ: vào Cài đặt → Xuất backup.json.</li>
          <li>Chép file JSON sang máy mới.</li>
          <li>Mở cùng website Hán Ngữ trên máy mới.</li>
          <li>Vào Cài đặt → Nhập backup.</li>
          <li>Chọn Ghi đè toàn bộ nếu đây là máy mới.</li>
        </ol>
      </section>
    </div>
  )
}
