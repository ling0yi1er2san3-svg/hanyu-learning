import json
import sys
from pathlib import Path

AUDIO_EXTENSIONS = {".mp3", ".wav", ".m4a", ".aac", ".ogg"}

def main():
    if len(sys.argv) < 3:
        print('Cách dùng: python scan_audio_files.py "audio-folder" "output.json"')
        raise SystemExit(1)

    root = Path(sys.argv[1])
    output = Path(sys.argv[2])

    files = []
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.suffix.lower() in AUDIO_EXTENSIONS:
            files.append({
                "fileName": path.name,
                "relativePath": str(path.relative_to(root)).replace("\\", "/"),
                "extension": path.suffix.lower(),
            })

    output.write_text(
        json.dumps(files, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Tìm thấy {len(files)} file audio.")
    print(f"Đã lưu: {output}")

if __name__ == "__main__":
    main()
