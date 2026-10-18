PHASE 6 – BACKUP / RESTORE

CÁCH CẬP NHẬT

1. Ctrl+C để dừng npm run dev.
2. Giải nén hanyu-learning-phase6.zip.
3. Copy toàn bộ nội dung bên trong folder hanyu-learning-phase6.
4. Dán đè vào project hiện tại:
   C:\Users\admin\Downloads\hanyu-learning
5. Chọn Replace files.
6. Phase 6 không thêm package mới ngoài Dexie đã có từ Phase 5.
7. Có thể chạy:
   npm install
   để chắc package-lock/package.json đồng bộ.
8. Chạy:
   npm run dev

KIỂM TRA XUẤT BACKUP

1. Vào Thẻ và học vài từ.
2. Vào Bài 1 và đánh dấu hoàn thành.
3. Vào Cài đặt.
4. Bấm "Xuất backup.json".
5. Trình duyệt phải tải file:
   hanyu-backup-YYYY-MM-DD.json

KIỂM TRA IMPORT AN TOÀN

1. Sau khi xuất backup, tiếp tục học thêm để dữ liệu hiện tại khác backup.
2. Vào Cài đặt > Nhập backup.
3. Chọn file vừa xuất.
4. Phải hiện preview:
   - Bài có tiến độ
   - Từ có tiến độ
   - Lượt ôn
   - Cài đặt
5. Chọn "Ghi đè toàn bộ".
6. Xác nhận.
7. Vào Tiến độ kiểm tra dữ liệu đã quay về trạng thái lúc backup.

CHẾ ĐỘ GỘP

- Giữ record Lesson mới hơn.
- Giữ VocabularyProgress có updatedAt mới hơn.
- Gộp reviewHistory và loại bỏ bản ghi trùng.
- Settings trong backup sẽ ưu tiên nếu trùng key.

TRANSACTION / ROLLBACK

Import chạy trong một Dexie transaction.
Nếu có lỗi trong quá trình import, transaction sẽ rollback.

BACKUP KHÔNG BAO GỒM

- lesson JSON
- PDF
- audio
- nội dung giáo trình

Vì những dữ liệu đó sẽ có sẵn trên website.
