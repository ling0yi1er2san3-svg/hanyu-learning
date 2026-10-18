PHASE 7 – DATA TOOLS

QUAN TRỌNG
Phase 7 thêm thư viện "xlsx".
Sau khi chép đè phải chạy:
npm install

CÁCH CẬP NHẬT
1. Ctrl+C để dừng server.
2. Giải nén hanyu-learning-phase7.zip.
3. Copy toàn bộ nội dung bên trong.
4. Dán đè vào project hiện tại.
5. Chọn Replace files.
6. Chạy:
   npm install
7. Chạy:
   npm run dev

MENU MỚI
Sidebar desktop có:
Data Tools

DATA TOOLS HỖ TRỢ
1. Import JSON
2. Import CSV
3. Import Excel XLSX/XLS
4. Validate:
   - Hanzi
   - Pinyin
   - Nghĩa Việt
   - Hán Việt
   - Book
   - Lesson
5. Preview tối đa 50 dòng
6. Xuất vocabulary-normalized.json
7. Chọn nhiều audio file
8. Tạo audio-map.json
9. Manual chỉnh trackId

HEADER GỢI Ý CHO EXCEL/CSV
book
lesson
hanzi
traditional
pinyin
pinyinNumber
hanViet
meaningVi
wordType
audio
exampleZh
examplePinyin
exampleVi

Cũng nhận một số tên tiếng Việt như:
quyển
bài
chữ Hán
Hán Việt
nghĩa
từ loại

PDF
Website không tự OCR PDF scan hàng loạt.
Folder:
tools/scripts/
có script extract_pdf_text.py để lấy text layer bằng PyMuPDF.

Cài Python package:
pip install pymupdf

Ví dụ:
python tools/scripts/extract_pdf_text.py "book.pdf" "pages.json"

AUDIO
tools/scripts/scan_audio_files.py dùng để quét danh sách file audio offline.

Ví dụ:
python tools/scripts/scan_audio_files.py "D:\Audio-han-ngu-5" "audio-files.json"

PHASE 7 LÀ TOOL CHUẨN BỊ DỮ LIỆU.
Người học bình thường không cần nhập dữ liệu.
Dữ liệu cuối cùng sẽ được tích hợp sẵn vào web ở Phase 8.
