HANYU AUDIO MAPPER REPAIR V4

Sua 2 loi trong anh ngay 18/10/2026:
1) Mapper PowerShell ghi JSON UTF-8 sai -> chu Trung bi thanh ky tu rac -> release-check bao lesson/main mismatch in hanzi.
2) Mapper cu loi "Argument types do not match" khi tao report.

V4 se:
- Khoi phuc lesson JSON Q5-Q6 tu ban chuan.
- GIU LAI mapping audio da bam Y neu file audio van ton tai va SHA-256 dung.
- Doc/ghi JSON bang UTF-8 ro rang, khong phu thuoc encoding mac dinh cua Windows PowerShell 5.1.
- Bo qua yen lang cac candidate lesson chua co JSON (Q5 bai 11-13, Q6 bai 23-26 trong source hien tai).
- Dung mang PowerShell thuong cho report, tranh loi [pscustomobject] / Generic List.

CACH DUNG
1. Giai nen ZIP nay.
2. Copy TOAN BO noi dung vao:
   Downloads\hanyu-learning-v2-github-ready
3. Chon Replace the files in the destination.
4. Chay IMPORT_AUDIO_GOC.bat.
   - Buoc 1 tu sua lesson JSON bi hong.
   - Buoc 2 chay mapper moi.
5. Neu ban khong muon map tiep audio, co the chay REPAIR_ONLY.bat roi PUSH_TO_GITHUB.bat.
6. Sau khi mapper/repair xong, chay PUSH_TO_GITHUB.bat.

KHONG CAN XOA AUDIO Q1-Q6 DA CHEP TREN MAY.
