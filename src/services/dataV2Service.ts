import type {
  CatalogLessonV2,
  CatalogV2,
  LessonV2,
  VocabularyIndexV2,
  VocabularyV2,
} from '../types/dataV2'

const basePath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

let catalogCache: CatalogV2 | null = null
let vocabularyCache: VocabularyIndexV2 | null = null
let searchCache: VocabularyIndexV2 | null = null
const lessonCache = new Map<string, LessonV2>()

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Không tải được dữ liệu: ${url} (${response.status})`)
  }
  return response.json() as Promise<T>
}

export async function loadCatalogV2(): Promise<CatalogV2> {
  if (!catalogCache) {
    catalogCache = await getJson<CatalogV2>(basePath('data-v2/catalog-v2.json'))
  }
  return catalogCache
}

export async function findCatalogLessonV2(
  book: number,
  lesson: number,
): Promise<CatalogLessonV2 | null> {
  const catalog = await loadCatalogV2()
  return (
    catalog.lessons.find(
      (item) => item.book === book && item.lesson === lesson,
    ) ?? null
  )
}

function lessonPath(book: number, lesson: number): string {
  return basePath(
    `data-v2/book${book}/lesson${String(lesson).padStart(2, '0')}.json`,
  )
}

export async function loadLessonV2(
  book: number,
  lesson: number,
): Promise<LessonV2 | null> {
  const catalogItem = await findCatalogLessonV2(book, lesson)
  if (!catalogItem || catalogItem.sourceStatus !== 'core_structured') {
    return null
  }

  const key = `${book}:${lesson}`
  const cached = lessonCache.get(key)
  if (cached) return cached

  try {
    const data = await getJson<LessonV2>(lessonPath(book, lesson))
    lessonCache.set(key, data)
    return data
  } catch {
    return null
  }
}

export async function loadVocabularyIndexV2(): Promise<VocabularyIndexV2> {
  if (!vocabularyCache) {
    vocabularyCache = await getJson<VocabularyIndexV2>(
      basePath('data-v2/vocabulary-index.json'),
    )
  }
  return vocabularyCache
}

export async function loadVocabularySearchIndexV2(): Promise<VocabularyIndexV2> {
  if (!searchCache) {
    searchCache = await getJson<VocabularyIndexV2>(
      basePath('data-v2/vocabulary-search-index.json'),
    )
  }
  return searchCache
}

export async function getVocabularyForLessonV2(
  book: number,
  lesson: number,
): Promise<VocabularyV2[]> {
  const index = await loadVocabularyIndexV2()
  return index.entries.filter(
    (entry) => entry.book === book && entry.lesson === lesson,
  )
}

export function normalizeSearchV2(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
}

export async function searchVocabularyV2(query: string): Promise<VocabularyV2[]> {
  const q = normalizeSearchV2(query)
  if (!q) return []

  const index = await loadVocabularySearchIndexV2()
  return index.entries.filter((entry) => {
    const fields = [
      entry.hanzi,
      entry.pinyin,
      entry.pinyinPlain ?? '',
      entry.pinyinNumber ?? '',
      entry.hanViet ?? '',
      entry.meaningVi,
      ...(entry.searchKeys ?? []),
    ]
    return fields.some((field) => normalizeSearchV2(field).includes(q))
  })
}

export function clearDataV2Cache(): void {
  catalogCache = null
  vocabularyCache = null
  searchCache = null
  lessonCache.clear()
}
