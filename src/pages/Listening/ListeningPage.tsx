import { useEffect, useState } from 'react'
import { loadCatalogV2 } from '../../services/dataV2Service'
import type { CatalogV2 } from '../../types/dataV2'

export default function ListeningPage() {
  const [catalog, setCatalog] = useState<CatalogV2 | null>(null)

  useEffect(() => {
    loadCatalogV2().then(setCatalog)
  }, [])

  return (
    <div className="page">
      <header className="simple-header">
        <p className="eyebrow">听力</p>
        <h1>Luyện nghe</h1>
        <p className="muted">Audio giáo trình chỉ xuất hiện khi track đã được mappingVerified. TTS là fallback và luôn được ghi rõ.</p>
      </header>

      <div className="source-notice pending">
        <strong>Mapping audio gốc đang để pending.</strong>
        <p>
          {catalog ? `${catalog.coreLessons} bài core được giữ sẵn chỗ cho audio.` : 'Đang tải catalog...'}
          {' '}Không gắn MP3 theo tên file nếu chưa đối chiếu nội dung.
        </p>
      </div>

      <section className="progress-explainer">
        <h2>Nguyên tắc V2</h2>
        <p>🎧 Audio giáo trình = track đã xác minh. 🔊 TTS = SpeechSynthesis zh-CN. Không đặt audio riêng dưới bảng ngữ âm.</p>
      </section>
    </div>
  )
}
