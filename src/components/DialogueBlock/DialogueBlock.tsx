import type { Dialogue, Vocabulary } from '../../types/lesson'
import AudioButton from '../AudioPlayer/AudioButton'

interface Props {
  dialogue: Dialogue
  showPinyin: boolean
  showVietnamese: boolean
  vocabMap: Map<string, Vocabulary>
  onOpenWord: (word: Vocabulary) => void
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default function DialogueBlock({
  dialogue,
  showPinyin,
  showVietnamese,
  vocabMap,
  onOpenWord,
}: Props) {
  const keys = [...vocabMap.keys()].sort((a, b) => b.length - a.length)
  const regex =
    keys.length > 0
      ? new RegExp(`(${keys.map(escapeRegex).join('|')})`, 'g')
      : null

  const renderChinese = (sentence: string) => {
    if (!regex) return sentence

    return sentence.split(regex).map((part, index) => {
      const item = vocabMap.get(part)
      if (!item) return <span key={`${part}-${index}`}>{part}</span>

      return (
        <button
          key={`${part}-${index}`}
          className="inline-word"
          onClick={() => onOpenWord(item)}
        >
          {part}
        </button>
      )
    })
  }

  return (
    <section className="dialogue-block">
      <div className="section-heading compact-heading">
        <div>
          <span className="section-kicker">Hội thoại</span>
          <h2>{dialogue.title}</h2>
        </div>
      </div>

      <div className="dialogue-stack">
        {dialogue.sentences.map((sentence) => (
          <article className="dialogue-row" key={sentence.id}>
            <div className="speaker-badge">{sentence.speaker || '•'}</div>
            <div className="dialogue-content">
              <div className="dialogue-zh">
                {renderChinese(sentence.zh)}
              </div>
              {showPinyin && (
                <div className="dialogue-pinyin">{sentence.pinyin}</div>
              )}
              {showVietnamese && (
                <div className="dialogue-vi">{sentence.vi}</div>
              )}
            </div>
            <AudioButton text={sentence.zh} label="" />
          </article>
        ))}
      </div>
    </section>
  )
}
