TOOLS/SCRIPTS - PREPROCESSING OFFLINE

Các script trong folder này dành cho GIAI ĐOẠN CHUẨN BỊ DỮ LIỆU,
không chạy trong website.

1) extract_pdf_text.py
- cố gắng lấy text layer từ PDF bằng PyMuPDF.
- KHÔNG OCR.
- nếu trang scan không có text, script sẽ ghi chuỗi rỗng cho trang đó.

Cài:
pip install pymupdf

Chạy:
python tools/scripts/extract_pdf_text.py "duong-dan-file.pdf" "output.json"

Kết quả output.json:
[
  {"page": 1, "text": "..."},
  ...
]

2) scan_audio_files.py
- quét tên MP3/WAV trong một folder và tạo audio-files.json.

Chạy:
python tools/scripts/scan_audio_files.py "duong-dan-folder-audio" "audio-files.json"

OCR:
Không tự động OCR hàng loạt trong Phase 7 vì PDF scan cần kiểm tra thủ công.
Khi cần OCR, xử lý theo từng bài rồi đưa kết quả qua Excel/CSV/Data Tools.
