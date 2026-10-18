SECURITY FIX – XỬ LÝ DỨT ĐIỂM HIGH SEVERITY

NGUYÊN NHÂN
npm audit báo:
xlsx *
Severity: high
Prototype Pollution
Regular Expression Denial of Service (ReDoS)
No fix available

ĐÃ XỬ LÝ
1. Xóa hoàn toàn package "xlsx" khỏi package.json.
2. Xóa import SheetJS/xlsx khỏi source code.
3. Web không còn parse Excel trực tiếp.
4. Data Tools vẫn hỗ trợ:
   - JSON
   - CSV
   - TSV
5. Excel được chuyển sang CSV trước khi import:
   Excel → File → Save As → CSV UTF-8
6. Có script offline:
   tools/scripts/excel_to_csv.py
   dùng openpyxl nếu muốn tự động chuyển.
7. Data Tools được lazy-load.
8. Vite tách chunk React và Dexie để giảm main bundle.

CÁCH CẬP NHẬT

1. Ctrl+C để dừng server.
2. Giải nén hanyu-learning-phase8a-securefix.zip.
3. Copy toàn bộ nội dung bên trong.
4. Dán đè vào project hiện tại.
5. Replace files.

QUAN TRỌNG – PHẢI LÀM SẠCH DEPENDENCY CŨ

Trong Terminal CMD tại project chạy:

npm uninstall xlsx

Sau đó chạy:

npm install

Sau đó kiểm tra:

npm audit

Mục tiêu:
found 0 vulnerabilities

Nếu npm vẫn báo xlsx sau khi uninstall:
xóa:
node_modules
package-lock.json

rồi chạy:
npm install

Sau đó:
npm audit

KIỂM TRA BUILD

npm run build

Main bundle sẽ nhỏ hơn rõ rệt vì xlsx không còn nằm trong web.
Data Tools cũng được tải riêng khi mở menu Data Tools.

KIỂM TRA APP

npm run dev

- Giáo trình / Catalog vẫn hoạt động.
- Backup/Restore vẫn hoạt động.
- IndexedDB/SRS vẫn hoạt động.
- Data Tools vẫn import JSON/CSV/TSV.
- Excel: Save As CSV UTF-8 trước khi import.

KHÔNG chạy:
npm audit fix --force

Không cần và có thể gây breaking changes.
