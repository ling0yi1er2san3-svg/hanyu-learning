import type { Vocabulary } from '../types/lesson'
import type { QuizQuestion, QuizType } from '../types/quiz'

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function unique(values: string[]): string[] {
  return [...new Set(values)]
}

function makeOptions(correct: string, distractors: string[]) {
  const pool = unique([correct, ...distractors]).slice(0, 4)
  return shuffle(pool).map((text, index) => ({
    id: `opt-${index}-${text}`,
    text,
  }))
}

export function buildQuiz(
  vocabulary: Vocabulary[],
  type: QuizType,
  count = 5,
): QuizQuestion[] {
  if (vocabulary.length === 0) return []

  const source = shuffle(vocabulary).slice(0, Math.min(count, vocabulary.length))

  return source.map((item, index) => {
    const others = vocabulary.filter((v) => v.id !== item.id)
    let prompt = ''
    let promptZh: string | undefined
    let audioText: string | undefined
    let correctAnswer = ''
    let distractors: string[] = []

    switch (type) {
      case 'hanzi-meaning':
        promptZh = item.hanzi
        prompt = 'Chọn nghĩa đúng'
        correctAnswer = item.meaningVi
        distractors = others.map((v) => v.meaningVi)
        break
      case 'meaning-hanzi':
        prompt = item.meaningVi
        correctAnswer = item.hanzi
        distractors = others.map((v) => v.hanzi)
        break
      case 'hanzi-pinyin':
        promptZh = item.hanzi
        prompt = 'Chọn Pinyin đúng'
        correctAnswer = item.pinyin
        distractors = others.map((v) => v.pinyin)
        break
      case 'pinyin-hanzi':
        prompt = item.pinyin
        correctAnswer = item.hanzi
        distractors = others.map((v) => v.hanzi)
        break
      case 'audio-hanzi':
        prompt = 'Nghe và chọn chữ Hán đúng'
        audioText = item.hanzi
        correctAnswer = item.hanzi
        distractors = others.map((v) => v.hanzi)
        break
      case 'audio-meaning':
        prompt = 'Nghe và chọn nghĩa đúng'
        audioText = item.hanzi
        correctAnswer = item.meaningVi
        distractors = others.map((v) => v.meaningVi)
        break
    }

    return {
      id: `q-${item.id}-${index}-${type}`,
      vocabularyId: item.id,
      type,
      prompt,
      promptZh,
      audioText,
      correctAnswer,
      options: makeOptions(correctAnswer, distractors),
      explanation: {
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        meaningVi: item.meaningVi,
        hanViet: item.hanViet,
      },
    }
  })
}
