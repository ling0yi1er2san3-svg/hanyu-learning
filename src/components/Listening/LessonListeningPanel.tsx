import { useState } from 'react'
import type { Lesson } from '../../types/lesson'
import AudioButton from '../AudioPlayer/AudioButton'

interface Props {
  lesson: Lesson
}

export default function LessonListeningPanel({ lesson }: Props) {
  const [showText, setShowText] = useState(false)
  const [showPinyin, setShowPinyin] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)

  const sentences = [
    ...lesson.dialogues.flatMap((dialogue) => dialogue.sentences),
    ...lesson.texts.flatMap((text) => text.sentences),
  ]

  return (
    <div>
      <div className="listening-controls">
        <button
          className={showText ? 'display-chip active' : 'display-chip'}
          onClick={() => setShowText((value) => !value)}
        >
          {showText ? 'Ẩn chữ Hán' : 'Hiện chữ Hán'}
        </button>

        <button
          className={showPinyin ? 'display-chip active' : 'display-chip'}
          onClick={() => setShowPinyin((value) => !value)}
        >
          {showPinyin ? 'Ẩn Pinyin' : 'Hiện Pinyin'}
        </button>

        <button
          className={showMeaning ? 'display-chip active' : 'display-chip'}
          onClick={() => setShowMeaning((value) => !value)}
        >
          {showMeaning ? 'Ẩn nghĩa' : 'Hiện nghĩa'}
        </button>
      </div>

      <div className="listening-list">
        {sentences.map((sentence, index) => (
          <article className="listening-card" key={`${sentence.id}-${index}`}>
            <div className="listening-number">{index + 1}</div>

            <div className="grow">
              <AudioButton text={sentence.zh} label="Nghe câu" />

              {showText && (
                <div className="listening-zh">{sentence.zh}</div>
              )}

              {showPinyin && (
                <div className="listening-pinyin">{sentence.pinyin}</div>
              )}

              {showMeaning && (
                <div className="listening-vi">{sentence.vi}</div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
