import { db } from '../db/database'
import type { BackupPayload, BackupPreview, ImportMode } from '../types/backup'
import type {
  AppSetting,
  LessonProgress,
  ReviewRecord,
  VocabularyProgress,
} from '../types/progress'

const BACKUP_VERSION = 1
const APP_SCHEMA_VERSION = 1

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

function validateArray<T>(
  value: unknown,
  name: string,
): asserts value is T[] {
  if (!isArray(value)) {
    throw new Error(`Backup không hợp lệ: "${name}" phải là mảng.`)
  }
}

export async function createBackup(): Promise<BackupPayload> {
  const [settings, lessonProgress, vocabularyProgress, reviewHistory] =
    await Promise.all([
      db.settings.toArray(),
      db.lessonProgress.toArray(),
      db.vocabularyProgress.toArray(),
      db.reviewHistory.toArray(),
    ])

  return {
    backupVersion: BACKUP_VERSION,
    appSchemaVersion: APP_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    appName: 'Hanyu Learning',
    data: {
      settings,
      lessonProgress,
      vocabularyProgress,
      reviewHistory,
    },
  }
}

export async function exportBackupFile(): Promise<void> {
  const backup = await createBackup()
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json;charset=utf-8',
  })

  const now = new Date()
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')

  const fileName = `hanyu-backup-${date}.json`

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function parseBackupText(text: string): BackupPayload {
  let parsed: unknown

  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('File không phải JSON hợp lệ.')
  }

  if (!isObject(parsed)) {
    throw new Error('Backup không hợp lệ.')
  }

  if (parsed.backupVersion !== BACKUP_VERSION) {
    throw new Error(
      `Không hỗ trợ backupVersion ${String(parsed.backupVersion)}.`,
    )
  }

  if (parsed.appSchemaVersion !== APP_SCHEMA_VERSION) {
    throw new Error(
      `Không hỗ trợ appSchemaVersion ${String(parsed.appSchemaVersion)}.`,
    )
  }

  if (!isObject(parsed.data)) {
    throw new Error('Backup thiếu vùng data.')
  }

  validateArray<AppSetting>(parsed.data.settings, 'settings')
  validateArray<LessonProgress>(
    parsed.data.lessonProgress,
    'lessonProgress',
  )
  validateArray<VocabularyProgress>(
    parsed.data.vocabularyProgress,
    'vocabularyProgress',
  )
  validateArray<ReviewRecord>(
    parsed.data.reviewHistory,
    'reviewHistory',
  )

  if (typeof parsed.exportedAt !== 'string') {
    throw new Error('Backup thiếu exportedAt.')
  }

  return parsed as unknown as BackupPayload
}

export function previewBackup(backup: BackupPayload): BackupPreview {
  return {
    exportedAt: backup.exportedAt,
    settingsCount: backup.data.settings.length,
    lessonProgressCount: backup.data.lessonProgress.length,
    vocabularyProgressCount: backup.data.vocabularyProgress.length,
    reviewHistoryCount: backup.data.reviewHistory.length,
  }
}

function mergeByKey<T>(
  current: T[],
  incoming: T[],
  getKey: (item: T) => string,
  pickWinner?: (a: T, b: T) => T,
): T[] {
  const map = new Map<string, T>()

  for (const item of current) {
    map.set(getKey(item), item)
  }

  for (const item of incoming) {
    const key = getKey(item)
    const existing = map.get(key)

    if (!existing) {
      map.set(key, item)
    } else if (pickWinner) {
      map.set(key, pickWinner(existing, item))
    } else {
      map.set(key, item)
    }
  }

  return [...map.values()]
}

function newerLesson(a: LessonProgress, b: LessonProgress): LessonProgress {
  const aDate = a.completedAt ?? a.lastOpenedAt
  const bDate = b.completedAt ?? b.lastOpenedAt
  return bDate >= aDate ? b : a
}

function newerVocabulary(
  a: VocabularyProgress,
  b: VocabularyProgress,
): VocabularyProgress {
  return b.updatedAt >= a.updatedAt ? b : a
}

export async function importBackup(
  backup: BackupPayload,
  mode: ImportMode,
): Promise<void> {
  await db.transaction(
    'rw',
    db.settings,
    db.lessonProgress,
    db.vocabularyProgress,
    db.reviewHistory,
    async () => {
      if (mode === 'replace') {
        await Promise.all([
          db.settings.clear(),
          db.lessonProgress.clear(),
          db.vocabularyProgress.clear(),
          db.reviewHistory.clear(),
        ])

        await db.settings.bulkPut(backup.data.settings)
        await db.lessonProgress.bulkPut(backup.data.lessonProgress)
        await db.vocabularyProgress.bulkPut(
          backup.data.vocabularyProgress,
        )
        await db.reviewHistory.bulkAdd(
          backup.data.reviewHistory.map(({ id, ...record }) => record),
        )

        return
      }

      const [
        currentSettings,
        currentLessons,
        currentVocabulary,
        currentReviews,
      ] = await Promise.all([
        db.settings.toArray(),
        db.lessonProgress.toArray(),
        db.vocabularyProgress.toArray(),
        db.reviewHistory.toArray(),
      ])

      const mergedSettings = mergeByKey(
        currentSettings,
        backup.data.settings,
        (item) => item.key,
      )

      const mergedLessons = mergeByKey(
        currentLessons,
        backup.data.lessonProgress,
        (item) => item.lessonId,
        newerLesson,
      )

      const mergedVocabulary = mergeByKey(
        currentVocabulary,
        backup.data.vocabularyProgress,
        (item) => item.vocabularyId,
        newerVocabulary,
      )

      const reviewMap = new Map<string, Omit<ReviewRecord, 'id'>>()

      const allReviews = [
        ...currentReviews,
        ...backup.data.reviewHistory,
      ]

      for (const { id: _id, ...record } of allReviews) {
        const key = [
          record.vocabularyId,
          record.rating,
          record.reviewedAt,
          record.previousInterval,
          record.nextInterval,
        ].join('|')

        reviewMap.set(key, record)
      }

      await Promise.all([
        db.settings.clear(),
        db.lessonProgress.clear(),
        db.vocabularyProgress.clear(),
        db.reviewHistory.clear(),
      ])

      await db.settings.bulkPut(mergedSettings)
      await db.lessonProgress.bulkPut(mergedLessons)
      await db.vocabularyProgress.bulkPut(mergedVocabulary)
      await db.reviewHistory.bulkAdd([...reviewMap.values()])
    },
  )
}
