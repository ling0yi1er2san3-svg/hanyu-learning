export type ReviewState =
  | 'new'
  | 'learning'
  | 'review'
  | 'relearning'
  | 'mastered'

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'

export interface VocabularyProgress {
  vocabularyId: string
  seen: boolean
  learned: boolean
  correctCount: number
  wrongCount: number
  difficulty: number
  reviewState: ReviewState
  repetitions: number
  easeFactor: number
  interval: number
  lastReview?: string
  nextReview?: string
  updatedAt: string
}

export interface ReviewRecord {
  id?: number
  vocabularyId: string
  rating: ReviewRating
  reviewedAt: string
  previousInterval: number
  nextInterval: number
}

export interface LessonProgress {
  lessonId: string
  book: number
  lesson: number
  status: 'not-started' | 'learning' | 'completed'
  lastOpenedAt: string
  completedAt?: string
}

export interface AppSetting {
  key: string
  value: unknown
}
