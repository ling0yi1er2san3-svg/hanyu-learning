export type SourceStatus =
  | 'core_structured'
  | 'partial_source'
  | 'missing_source'

export type VerificationStatus = 'verified' | 'pending'
export type AudioStatus = 'verified' | 'pending_mapping' | 'missing'

export interface VocabularyV2 {
  id: string
  book: number
  lesson: number
  lessonId: string
  lessonTitleZh?: string
  hanzi: string
  traditional?: string
  pinyin: string
  pinyinPlain?: string
  pinyinNumber?: string
  hanViet?: string | null
  hanVietStatus?: VerificationStatus
  meaningVi: string
  meaningViStatus?: string
  partOfSpeech?: string | null
  wordType?: string | null
  sourceVerified: boolean
  audio?: string | null
  audioStatus?: AudioStatus
  searchKeys?: string[]
}

export interface LessonSentenceV2 {
  id?: string
  speaker?: string
  chinese: string
  pinyin?: string
  vietnamese?: string
  audio?: string | null
  audioStatus?: AudioStatus
}

export interface LessonTextV2 {
  id: string
  title?: string
  chinese?: string
  vietnamese?: string
  audio?: string | null
  audioStatus?: AudioStatus
  vietnameseStatus?: 'source' | 'assistant_translation'
  sentences?: LessonSentenceV2[]
  sourceVerified: boolean
}

export interface DialogueV2 {
  id: string
  title?: string
  lines: LessonSentenceV2[]
  sourceVerified: boolean
}

export interface GrammarV2 {
  id: string
  pattern: string
  explanationVi?: string
  notes?: string[]
  examples?: {
    chinese: string
    pinyin?: string
    vietnamese?: string
  }[]
  sourceVerified: boolean
}

export interface ExerciseGroupV2 {
  id: string
  title: string
  type?: string
  sourceVerified: boolean
}

export interface AudioTrackV2 {
  id: string
  src: string
  label?: string
  mappingVerified: boolean
  sha256?: string
  verificationMethod?: string
}

export interface LessonV2 {
  id: string
  book: number
  lesson: number
  titleZh: string
  titlePinyin?: string
  titleVi?: string
  sourceStatus: SourceStatus
  contentStatus?: string
  vocabularyExpectedCount?: number
  vocabulary: VocabularyV2[]
  supplementalVocabulary?: VocabularyV2[]
  properNames?: VocabularyV2[]
  texts?: LessonTextV2[]
  dialogues?: DialogueV2[]
  grammar?: GrammarV2[]
  usage?: GrammarV2[]
  phonetics?: GrammarV2[]
  exerciseGroups?: ExerciseGroupV2[]
  audio?: {
    tracks: AudioTrackV2[]
    mappingVerified: boolean
  }
  verification?: {
    vocabularyVerified: boolean
    textsVerified: boolean
    grammarVerified: boolean
    exercisesVerified: boolean
    audioVerified: boolean
  }
}

export interface CatalogLessonV2 {
  id: string
  book: number
  lesson: number
  titleZh: string
  titleVi?: string
  sourceStatus: SourceStatus
  studyAvailable: boolean
}

export interface CatalogV2 {
  version: number
  totalLessons: number
  coreLessons: number
  partialLessons: number
  missingLessons: number
  lessons: CatalogLessonV2[]
}

export interface VocabularyIndexV2 {
  version: number
  count: number
  status?: 'ready' | 'partial_build' | 'not_generated'
  entries: VocabularyV2[]
}
