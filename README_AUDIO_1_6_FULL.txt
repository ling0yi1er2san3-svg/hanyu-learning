HANYU LEARNING V2 - ORIGINAL AUDIO 1-6 FULL PATCH V2

Đã xử lý trực tiếp từ file người dùng cung cấp:
- Quyển 1: 26 MP3 nhúng trong PDF. Bài 1-5 có 3 track/bài; bài 6-15 có 1 track/bài.
- Quyển 2: 15 WMA nhúng, bài 16-30. Đã chuyển sang MP3 128 kbps để trình duyệt phát được.
- Quyển 3: 10 WMA nhúng, bài 1-10. Đã chuyển sang MP3 128 kbps.
- Quyển 4: 10 WMA nhúng, bài 11-20. Đã chuyển sang MP3 128 kbps.
- Quyển 5: 15 MP3 từ RAR, giữ nguyên bytes gốc. Track 01-13 là ứng viên bài 1-13, chưa tự xác minh nội dung.
- Quyển 6: 15 MP3 từ RAR, giữ nguyên bytes gốc. Track 01-13 là ứng viên bài 14-26, chưa tự xác minh nội dung.

CÁCH CẬP NHẬT
1. Giải nén ZIP này.
2. Copy toàn bộ nội dung vào thư mục hanyu-learning-v2-github-ready.
3. Chọn Replace the files in the destination.
4. Chạy PUSH_TO_GITHUB.bat.
5. Sau khi Actions xanh, Q1-Q4 sẽ hiện nút Gốc ngay ở các bài core có lesson JSON.
6. Chạy IMPORT_AUDIO_GOC.bat để nghe/xác nhận Q5-Q6. Audio Q5-Q6 đã nằm sẵn trong project nên KHÔNG cần chọn RAR lại.
7. Mỗi track chỉ chuyển mappingVerified=true sau khi bạn nghe và bấm Y.
8. Chạy PUSH_TO_GITHUB.bat lần nữa để đưa xác nhận Q5-Q6 lên web.

LƯU Ý
- TTS vẫn được giữ song song và làm fallback.
- Q1-Q4 map dựa trên tên file audio được nhúng trực tiếp trong chính PDF, tên mang đúng số bài.
- Q2-Q4 chỉ đổi codec WMA -> MP3 cho tương thích web; inventory giữ SHA-256 của file WMA nguồn và MP3 web.
- Q5-Q6 không được tự suy đoán thành verified chỉ dựa trên số track.
- PWA không precache toàn bộ audio; MP3 chỉ được cache khi người dùng nghe.
