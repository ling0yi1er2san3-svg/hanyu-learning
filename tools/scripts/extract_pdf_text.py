import json
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Chưa cài PyMuPDF. Chạy: pip install pymupdf")
    raise

def main():
    if len(sys.argv) < 3:
        print('Cách dùng: python extract_pdf_text.py "input.pdf" "output.json"')
        raise SystemExit(1)

    input_pdf = Path(sys.argv[1])
    output_json = Path(sys.argv[2])

    doc = fitz.open(input_pdf)
    pages = []

    for index, page in enumerate(doc):
        text = page.get_text("text").strip()
        pages.append({
            "page": index + 1,
            "text": text,
            "hasText": bool(text),
        })

    output_json.write_text(
        json.dumps(pages, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Đã xử lý {len(pages)} trang.")
    print(f"Đã lưu: {output_json}")

if __name__ == "__main__":
    main()
