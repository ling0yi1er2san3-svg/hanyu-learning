export interface ImportRow {
  id?: string
  book?: number
  lesson?: number
  hanzi?: string
  traditional?: string
  pinyin?: string
  pinyinNumber?: string
  hanViet?: string
  meaningVi?: string
  wordType?: string
  audio?: string
  exampleZh?: string
  examplePinyin?: string
  exampleVi?: string
}

export interface ValidationIssue {
  row: number
  field: string
  level: 'error' | 'warning'
  message: string
}

export interface AudioMapItem {
  id: string
  fileName: string
  lessonId: string
  trackId: string
  note?: string
}
