import type {
  ReviewRating,
  VocabularyProgress,
} from '../types/progress'

function isoNow() {
  return new Date().toISOString()
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function addMinutes(date: Date, minutes: number) {
  const next = new Date(date)
  next.setMinutes(next.getMinutes() + minutes)
  return next
}

export function createDefaultProgress(
  vocabularyId: string,
): VocabularyProgress {
  return {
    vocabularyId,
    seen: true,
    learned: false,
    correctCount: 0,
    wrongCount: 0,
    difficulty: 0,
    reviewState: 'new',
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0,
    updatedAt: isoNow(),
  }
}

export function applyReview(
  current: VocabularyProgress,
  rating: ReviewRating,
): VocabularyProgress {
  const now = new Date()
  let repetitions = current.repetitions
  let easeFactor = current.easeFactor || 2.5
  let interval = current.interval || 0
  let nextReview: Date
  let reviewState = current.reviewState
  let learned = current.learned
  let correctCount = current.correctCount
  let wrongCount = current.wrongCount
  let difficulty = current.difficulty

  if (rating === 'again') {
    repetitions = 0
    interval = 0
    easeFactor = Math.max(1.3, easeFactor - 0.2)
    nextReview = addMinutes(now, 10)
    reviewState = current.reviewState === 'new' ? 'learning' : 'relearning'
    learned = false
    wrongCount += 1
    difficulty = Math.min(5, difficulty + 1)
  } else if (rating === 'hard') {
    repetitions += 1
    interval = Math.max(1, Math.round(Math.max(1, interval) * 1.2))
    easeFactor = Math.max(1.3, easeFactor - 0.15)
    nextReview = addDays(now, interval)
    reviewState = 'learning'
    correctCount += 1
    difficulty = Math.min(5, difficulty + 0.5)
  } else if (rating === 'good') {
    repetitions += 1
    if (repetitions === 1) interval = 1
    else if (repetitions === 2) interval = 3
    else interval = Math.max(4, Math.round(Math.max(1, interval) * easeFactor))
    nextReview = addDays(now, interval)
    reviewState = repetitions >= 3 ? 'review' : 'learning'
    learned = repetitions >= 2
    correctCount += 1
    difficulty = Math.max(0, difficulty - 0.25)
  } else {
    repetitions += 1
    easeFactor = Math.min(3.0, easeFactor + 0.15)
    if (repetitions === 1) interval = 3
    else interval = Math.max(7, Math.round(Math.max(1, interval) * easeFactor * 1.3))
    nextReview = addDays(now, interval)
    reviewState = repetitions >= 4 ? 'mastered' : 'review'
    learned = true
    correctCount += 1
    difficulty = Math.max(0, difficulty - 0.5)
  }

  return {
    ...current,
    seen: true,
    learned,
    correctCount,
    wrongCount,
    difficulty,
    reviewState,
    repetitions,
    easeFactor,
    interval,
    lastReview: now.toISOString(),
    nextReview: nextReview.toISOString(),
    updatedAt: now.toISOString(),
  }
}
