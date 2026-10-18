import type {
  AudioMapItem,
  ImportRow,
  ValidationIssue,
} from '../types/dataTools'

function normalizeHeader(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[_-]/g, '')
}

const headerMap: Record<string, keyof ImportRow> = {
  id: 'id',
  book: 'book',
  booknumber: 'book',
  quyen: 'book',
  quyển: 'book',

  lesson: 'lesson',
  lessonnumber: 'lesson',
  bai: 'lesson',
  bài: 'lesson',

  hanzi: 'hanzi',
  chinese: 'hanzi',
  tuhan: 'hanzi',
  từhán: 'hanzi',
  chuhan: 'hanzi',
  chữhán: 'hanzi',

  traditional: 'traditional',
  phonthe: 'traditional',
  phồnthể: 'traditional',

  pinyin: 'pinyin',
  pinyinnumber: 'pinyinNumber',
  pinyinso: 'pinyinNumber',
  pinyinsố: 'pinyinNumber',

  hanviet: 'hanViet',
  hánviệt: 'hanViet',

  meaningvi: 'meaningVi',
  nghia: 'meaningVi',
  nghĩa: 'meaningVi',
  nghiaviet: 'meaningVi',
  nghĩaviệt: 'meaningVi',

  wordtype: 'wordType',
  tuloi: 'wordType',
  từloại: 'wordType',

  audio: 'audio',

  examplezh: 'exampleZh',
  vidutrunghoa: 'exampleZh',
  vídụtrunghoa: 'exampleZh',

  examplepinyin: 'examplePinyin',
  vidupinyin: 'examplePinyin',
  vídụpinyin: 'examplePinyin',

  examplevi: 'exampleVi',
  viduviet: 'exampleVi',
  vídụviệt: 'exampleVi',
}

function normalizeObject(input: Record<string, unknown>): ImportRow {
  const row: ImportRow = {}

  for (const [rawKey, value] of Object.entries(input)) {
    const mapped = headerMap[normalizeHeader(rawKey)]
    if (!mapped) continue

    if (mapped === 'book' || mapped === 'lesson') {
      const number = Number(value)
      if (Number.isFinite(number)) {
        row[mapped] = number
      }
    } else {
      ;(row as Record<string, unknown>)[mapped] =
        typeof value === 'string' ? value.trim() : String(value ?? '').trim()
    }
  }

  return row
}

export async function parseJsonFile(file: File): Promise<ImportRow[]> {
  const text = await file.text()
  const parsed = JSON.parse(text) as unknown

  if (Array.isArray(parsed)) {
    return parsed.map((item) =>
      normalizeObject(item as Record<string, unknown>),
    )
  }

  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    'vocabulary' in parsed &&
    Array.isArray((parsed as { vocabulary?: unknown[] }).vocabulary)
  ) {
    return (parsed as { vocabulary: Record<string, unknown>[] }).vocabulary.map(
      normalizeObject,
    )
  }

  throw new Error(
    'JSON phải là một mảng từ vựng hoặc object lesson có trường vocabulary.',
  )
}

function detectDelimiter(line: string): ',' | '\t' | ';' {
  const commaCount = (line.match(/,/g) || []).length
  const tabCount = (line.match(/\t/g) || []).length
  const semicolonCount = (line.match(/;/g) || []).length

  if (tabCount >= commaCount && tabCount >= semicolonCount) return '\t'
  if (semicolonCount > commaCount) return ';'
  return ','
}

function parseDelimitedLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let quoted = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        quoted = !quoted
      }
    } else if (char === delimiter && !quoted) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

export async function parseCsvFile(file: File): Promise<ImportRow[]> {
  const text = await file.text()
  const lines = text
    .replace(/^\uFEFF/, '')
    .replace(/\r/g, '')
    .split('\n')
    .filter((line) => line.trim().length > 0)

  if (lines.length < 2) {
    throw new Error('CSV/TSV không có dữ liệu.')
  }

  const delimiter = detectDelimiter(lines[0])
  const headers = parseDelimitedLine(lines[0], delimiter)

  return lines.slice(1).map((line) => {
    const values = parseDelimitedLine(line, delimiter)
    const raw: Record<string, unknown> = {}

    headers.forEach((header, index) => {
      raw[header] = values[index] ?? ''
    })

    return normalizeObject(raw)
  })
}

export function validateRows(rows: ImportRow[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  rows.forEach((row, index) => {
    const rowNumber = index + 2

    if (!row.hanzi) {
      issues.push({
        row: rowNumber,
        field: 'hanzi',
        level: 'error',
        message: 'Thiếu chữ Hán.',
      })
    }

    if (!row.pinyin) {
      issues.push({
        row: rowNumber,
        field: 'pinyin',
        level: 'warning',
        message: 'Thiếu Pinyin.',
      })
    }

    if (!row.meaningVi) {
      issues.push({
        row: rowNumber,
        field: 'meaningVi',
        level: 'warning',
        message: 'Thiếu nghĩa tiếng Việt.',
      })
    }

    if (!row.hanViet) {
      issues.push({
        row: rowNumber,
        field: 'hanViet',
        level: 'warning',
        message: 'Thiếu Hán Việt.',
      })
    }

    if (!row.book) {
      issues.push({
        row: rowNumber,
        field: 'book',
        level: 'warning',
        message: 'Chưa xác định quyển.',
      })
    }

    if (!row.lesson) {
      issues.push({
        row: rowNumber,
        field: 'lesson',
        level: 'warning',
        message: 'Chưa xác định bài.',
      })
    }
  })

  return issues
}

export function buildVocabularyJson(rows: ImportRow[]) {
  return rows.map((row, index) => {
    const book = row.book ?? 0
    const lesson = row.lesson ?? 0

    return {
      id:
        row.id ||
        `b${book}_l${String(lesson).padStart(2, '0')}_v${String(
          index + 1,
        ).padStart(3, '0')}`,
      book,
      lesson,
      hanzi: row.hanzi || '',
      traditional: row.traditional || '',
      pinyin: row.pinyin || '',
      pinyinNumber: row.pinyinNumber || '',
      hanViet: row.hanViet || '',
      meaningVi: row.meaningVi || '',
      wordType: row.wordType || '',
      examples:
        row.exampleZh || row.examplePinyin || row.exampleVi
          ? [
              {
                zh: row.exampleZh || '',
                pinyin: row.examplePinyin || '',
                vi: row.exampleVi || '',
              },
            ]
          : [],
      audio: {
        source: row.audio ? 'original' : 'tts',
        file: row.audio || '',
      },
      sourceVerified: false,
      pinyinVerified: false,
      meaningVerified: false,
      hanVietVerified: false,
      audioVerified: Boolean(row.audio),
      generatedTranslation: false,
      tags: [],
    }
  })
}

export function downloadJson(fileName: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: 'application/json;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function buildAudioMap(
  files: File[],
  lessonId: string,
): AudioMapItem[] {
  return files.map((file, index) => ({
    id: `${lessonId}_audio_${String(index + 1).padStart(3, '0')}`,
    fileName: file.name,
    lessonId,
    trackId: `track${String(index + 1).padStart(2, '0')}`,
  }))
}
