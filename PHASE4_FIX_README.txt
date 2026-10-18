PHASE 4 FIX

Đã sửa 2 lỗi:
1. Menu 'Luyện nghe' bên trái bị nhảy về Học vì route /listening chưa được khai báo.
2. Tab 'Luyện nghe' trong Lesson trước đây chỉ là placeholder.

Cách cập nhật:
- Dừng npm run dev: Ctrl+C
- Giải nén file ZIP này.
- Copy toàn bộ nội dung bên trong folder hanyu-learning-phase4-fix.
- Dán đè vào project hiện tại.
- Chọn Replace files.
- Không xóa node_modules.
- Chạy: npm run dev

Kiểm tra:
A. Bấm Luyện nghe bên trái -> phải mở trang Luyện nghe.
B. Vào Quyển 1 > Bài 1 > tab Luyện nghe -> phải hiện danh sách câu có nút Nghe câu.
C. Có nút Hiện/Ẩn chữ Hán, Pinyin, nghĩa.
