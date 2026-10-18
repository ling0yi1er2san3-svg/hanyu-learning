import Dexie, { type Table } from 'dexie'
import type {
  AppSetting,
  LessonProgress,
  ReviewRecord,
  VocabularyProgress,
} from '../types/progress'

export class HanyuDatabase extends Dexie {
  settings!: Table<AppSetting, string>
  lessonProgress!: Table<LessonProgress, string>
  vocabularyProgress!: Table<VocabularyProgress, string>
  reviewHistory!: Table<ReviewRecord, number>

  constructor() {
    super('HanyuDB')

    this.version(1).stores({
      settings: '&key',
      lessonProgress: '&lessonId, book, lesson, status, lastOpenedAt',
      vocabularyProgress:
        '&vocabularyId, learned, reviewState, nextReview, updatedAt',
      reviewHistory: '++id, vocabularyId, rating, reviewedAt',
    })
  }
}

export const db = new HanyuDatabase()
