HANYU LEARNING V2 - MAP AUDIO GỐC Q5/Q6

Mục tiêu
- Giữ TTS như hiện tại.
- Thêm audio gốc toàn bài khi đã xác minh bằng nghe.
- Không tự đoán Track 01 = Bài 01 nếu người dùng chưa nghe xác nhận.

Cách dùng dễ nhất
1. Copy patch này vào thư mục project hanyu-learning-v2-github-ready và chọn Replace nếu Windows hỏi.
2. Double-click IMPORT_AUDIO_GOC.bat.
3. Khi hỏi Q5: kéo Audio-han-ngu-5(1).rar vào cửa sổ rồi Enter.
4. Khi hỏi Q6: kéo Audio-han-ngu-6(1).rar vào cửa sổ rồi Enter.
   - Nếu máy không có 7-Zip/WinRAR mà script gọi được, tự giải nén RAR trước và kéo THƯ MỤC MP3 vào thay thế.
5. Script kiểm tra SHA-256 từng MP3 với inventory đã có trong project.
6. Với mỗi track, script hiển thị tên bài + câu đầu, rồi mở MP3 để nghe.
7. Chọn:
   Y = đúng bài -> map và copy MP3 vào public/audio/original/...
   N = không đúng -> không map
   S = bỏ qua -> để kiểm tra sau
   R = nghe lại
   Q = dừng
8. Chỉ khi chọn Y mới có mappingVerified=true.
9. Sau khi xong, chạy:
   node scripts\validate-audio-integrity-v2.mjs
10. Nếu PASS, chạy PUSH_TO_GITHUB.bat.

Khi lên web
- Tab Bài khóa có nút Gốc cho track đã xác minh.
- TTS vẫn còn song song.
- Nếu audio gốc lỗi/không tải được, app fallback sang TTS.
- Audio gốc hiện tại là track toàn bài. Từ vựng/câu riêng vẫn dùng TTS cho đến khi có file/cue audio riêng được map chính xác.

An toàn dữ liệu
- Mapper nhận diện file bằng SHA-256, không dựa riêng vào tên file.
- Chỉ copy MP3 sau khi bạn bấm Y.
- JSON lưu verificationMethod=user_listen_confirmed và SHA-256 của track.
