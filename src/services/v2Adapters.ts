import type { Vocabulary } from '../types/lesson'
import type { VocabularyV2 } from '../types/dataV2'

export function vocabularyV2ToLegacy(word: VocabularyV2): Vocabulary {
  return {
    id: word.id,
    book: word.book,
    lesson: word.lesson,
    hanzi: word.hanzi,
    traditional: word.traditional,
    pinyin: word.pinyin,
    pinyinNumber: word.pinyinNumber,
    hanViet:
      word.hanVietStatus === 'verified' ? word.hanViet ?? undefined : undefined,
    meaningVi: word.meaningVi,
    wordType: word.partOfSpeech ?? word.wordType ?? undefined,
    examples: [],
    audio:
      word.audioStatus === 'verified' && word.audio
        ? { source: 'original', file: word.audio }
        : undefined,
    tags: [],
  }
}
