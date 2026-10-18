export type QuizType =
  | 'hanzi-meaning'
  | 'meaning-hanzi'
  | 'hanzi-pinyin'
  | 'pinyin-hanzi'
  | 'audio-hanzi'
  | 'audio-meaning'

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  vocabularyId: string
  type: QuizType
  prompt: string
  promptZh?: string
  audioText?: string
  correctAnswer: string
  options: QuizOption[]
  explanation?: {
    hanzi?: string
    pinyin?: string
    meaningVi?: string
    hanViet?: string
  }
}
