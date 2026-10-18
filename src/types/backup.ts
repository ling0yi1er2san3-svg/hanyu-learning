import type {
  AppSetting,
  LessonProgress,
  ReviewRecord,
  VocabularyProgress,
} from './progress'

export interface BackupPayload {
  backupVersion: 1
  appSchemaVersion: 1
  exportedAt: string
  appName: 'Hanyu Learning'
  data: {
    settings: AppSetting[]
    lessonProgress: LessonProgress[]
    vocabularyProgress: VocabularyProgress[]
    reviewHistory: ReviewRecord[]
  }
}

export interface BackupPreview {
  exportedAt: string
  settingsCount: number
  lessonProgressCount: number
  vocabularyProgressCount: number
  reviewHistoryCount: number
}

export type ImportMode = 'replace' | 'merge'
