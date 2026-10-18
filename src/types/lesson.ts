export interface Example {
  zh: string
  pinyin: string
  vi: string
  audio?: string
}

export interface Vocabulary {
  id: string
  book: number
  lesson: number
  hanzi: string
  traditional?: string
  pinyin: string
  pinyinNumber?: string
  hanViet?: string
  meaningVi: string
  wordType?: string
  examples: Example[]
  audio?: {
    source: 'original' | 'tts'
    file?: string
  }
  tags?: string[]
}

export interface Sentence {
  id: string
  zh: string
  pinyin: string
  vi: string
  speaker?: string
  audio?: string
}

export interface TextSection {
  id: string
  title: string
  sentences: Sentence[]
}

export interface Dialogue {
  id: string
  title: string
  speakers?: string[]
  sentences: Sentence[]
}

export interface GrammarPoint {
  id: string
  pattern: string
  explanationVi: string
  notes?: string[]
  examples: Example[]
}

export interface Lesson {
  id: string
  book: number
  lesson: number
  titleZh: string
  titlePinyin: string
  titleVi: string
  objectives: string[]
  vocabulary: Vocabulary[]
  texts: TextSection[]
  dialogues: Dialogue[]
  grammar: GrammarPoint[]
  exercises: unknown[]
  audioTracks: unknown[]
}

export interface LessonIndexItem {
  id: string
  book: number
  lesson: number
  titleZh: string
  titlePinyin: string
  titleVi: string
  dataPath: string
  sourcePageLabel?: number
  contentReady?: boolean
  catalogVerified?: boolean
}

export interface BookIndex {
  bookNumber: number
  titleVi?: string
  lessons: LessonIndexItem[]
}
