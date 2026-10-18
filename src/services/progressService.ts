import { db } from '../db/database'
import type {
  LessonProgress,
  ReviewRating,
  VocabularyProgress,
} from '../types/progress'
import { applyReview, createDefaultProgress } from '../utils/srs'

export async function getVocabularyProgress(
  vocabularyId: string,
): Promise<VocabularyProgress> {
  const existing = await db.vocabularyProgress.get(vocabularyId)
  return existing ?? createDefaultProgress(vocabularyId)
}

export async function markVocabularySeen(
  vocabularyId: string,
): Promise<VocabularyProgress> {
  const existing = await db.vocabularyProgress.get(vocabularyId)
  if (existing) return existing

  const next = createDefaultProgress(vocabularyId)
  await db.vocabularyProgress.put(next)
  return next
}

export async function reviewVocabulary(
  vocabularyId: string,
  rating: ReviewRating,
): Promise<VocabularyProgress> {
  const current = await getVocabularyProgress(vocabularyId)
  const previousInterval = current.interval
  const next = applyReview(current, rating)

  await db.transaction(
    'rw',
    db.vocabularyProgress,
    db.reviewHistory,
    async () => {
      await db.vocabularyProgress.put(next)
      await db.reviewHistory.add({
        vocabularyId,
        rating,
        reviewedAt: new Date().toISOString(),
        previousInterval,
        nextInterval: next.interval,
      })
    },
  )

  return next
}

export async function recordQuizVocabulary(
  vocabularyId: string,
  correct: boolean,
): Promise<VocabularyProgress> {
  return reviewVocabulary(vocabularyId, correct ? 'good' : 'again')
}

export async function markLessonOpened(
  book: number,
  lesson: number,
): Promise<void> {
  const lessonId = `b${book}_l${String(lesson).padStart(2, '0')}`
  const existing = await db.lessonProgress.get(lessonId)

  const next: LessonProgress = {
    lessonId,
    book,
    lesson,
    status: existing?.status === 'completed' ? 'completed' : 'learning',
    lastOpenedAt: new Date().toISOString(),
    completedAt: existing?.completedAt,
  }

  await db.lessonProgress.put(next)
}

export async function markLessonCompleted(
  book: number,
  lesson: number,
): Promise<void> {
  const lessonId = `b${book}_l${String(lesson).padStart(2, '0')}`

  await db.lessonProgress.put({
    lessonId,
    book,
    lesson,
    status: 'completed',
    lastOpenedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  })
}

export async function getDueVocabularyIds(): Promise<string[]> {
  const now = new Date().toISOString()
  const all = await db.vocabularyProgress.toArray()

  return all
    .filter((item) => !item.nextReview || item.nextReview <= now)
    .map((item) => item.vocabularyId)
}

export async function getAllVocabularyProgress(): Promise<VocabularyProgress[]> {
  return db.vocabularyProgress.toArray()
}

export async function getProgressSummary() {
  const vocabulary = await db.vocabularyProgress.toArray()
  const lessons = await db.lessonProgress.toArray()
  const reviews = await db.reviewHistory.toArray()
  const now = new Date()
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).toISOString()

  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const dueToday = vocabulary.filter(
    (item) => !item.nextReview || item.nextReview <= now.toISOString(),
  ).length

  const learned = vocabulary.filter((item) => item.learned).length
  const mastered = vocabulary.filter(
    (item) => item.reviewState === 'mastered',
  ).length

  const review7Days = reviews.filter(
    (item) => item.reviewedAt >= sevenDaysAgo.toISOString(),
  ).length

  const correct = vocabulary.reduce((sum, item) => sum + item.correctCount, 0)
  const wrong = vocabulary.reduce((sum, item) => sum + item.wrongCount, 0)
  const totalAnswers = correct + wrong
  const accuracy =
    totalAnswers === 0 ? 0 : Math.round((correct / totalAnswers) * 100)

  return {
    seen: vocabulary.length,
    learned,
    mastered,
    dueToday,
    review7Days,
    accuracy,
    lessonsStarted: lessons.length,
    lessonsCompleted: lessons.filter((item) => item.status === 'completed')
      .length,
    reviewedToday: reviews.filter((item) => item.reviewedAt >= todayStart)
      .length,
  }
}
