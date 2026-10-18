PHASE 5 – INDEXEDDB + SRS + PROGRESS

QUAN TRỌNG:
Phase 5 thêm package Dexie.
Sau khi chép đè file, phải chạy:
npm install
rồi mới:
npm run dev

CÁCH CẬP NHẬT
1. Ctrl+C để dừng server.
2. Giải nén hanyu-learning-phase5.zip.
3. Copy toàn bộ nội dung bên trong folder hanyu-learning-phase5.
4. Dán đè vào project hiện tại.
5. Chọn Replace files.
6. Không cần tự xóa node_modules.
7. Trong Terminal chạy:
   npm install
8. Sau khi xong chạy:
   npm run dev

KIỂM TRA INDEXEDDB / SRS
1. Vào Thẻ.
2. Lật một thẻ.
3. Chọn Quên / Khó / Nhớ / Rất dễ.
4. Qua thẻ khác.
5. Refresh trình duyệt.
6. Vào Tiến độ.
7. Phải thấy số Đã xem / Đã thuộc / 7 ngày thay đổi.

KIỂM TRA LESSON PROGRESS
1. Mở Quyển 1 > Bài 1.
2. Ở cuối bài bấm "Đánh dấu hoàn thành bài".
3. Vào Tiến độ.
4. Bấm Làm mới.
5. Bài đã bắt đầu phải tăng.

DATABASE:
Tên: HanyuDB
Tables:
- settings
- lessonProgress
- vocabularyProgress
- reviewHistory

Có thể xem bằng:
F12 > Application > IndexedDB > HanyuDB

LƯU Ý
- Phase 5 chưa có backup/import. Đó là Phase 6.
- Dữ liệu hiện tại vẫn là demo kỹ thuật.
