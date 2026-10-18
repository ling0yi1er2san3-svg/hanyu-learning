import { useMemo, useState } from 'react'
import type { Vocabulary } from '../../types/lesson'
import type { QuizType } from '../../types/quiz'
import { buildQuiz } from '../../services/quizService'
import AudioButton from '../AudioPlayer/AudioButton'
import { recordQuizVocabulary } from '../../services/progressService'

interface Props {
  vocabulary: Vocabulary[]
}

const quizTypes: { value: QuizType; label: string }[] = [
  { value: 'hanzi-meaning', label: 'Hán → nghĩa' },
  { value: 'meaning-hanzi', label: 'Nghĩa → Hán' },
  { value: 'hanzi-pinyin', label: 'Hán → Pinyin' },
  { value: 'pinyin-hanzi', label: 'Pinyin → Hán' },
  { value: 'audio-hanzi', label: 'Nghe → Hán' },
  { value: 'audio-meaning', label: 'Nghe → nghĩa' },
]

export default function QuizPanel({ vocabulary }: Props) {
  const [type, setType] = useState<QuizType>('hanzi-meaning')
  const [seed, setSeed] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const questions = useMemo(
    () => buildQuiz(vocabulary, type, 5),
    [vocabulary, type, seed],
  )

  const current = questions[currentIndex]

  const reset = (nextType = type) => {
    setType(nextType)
    setSeed((value) => value + 1)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
  }

  if (!current) {
    return <div className="empty-state">Chưa có đủ dữ liệu để tạo quiz.</div>
  }

  const answered = selected !== null
  const isCorrect = selected === current.correctAnswer

  const choose = (answer: string) => {
    if (answered) return
    const correct = answer === current.correctAnswer
    setSelected(answer)
    if (correct) {
      setScore((value) => value + 1)
    }
    void recordQuizVocabulary(current.vocabularyId, correct)
  }

  const next = () => {
    if (currentIndex >= questions.length - 1) {
      reset(type)
      return
    }
    setCurrentIndex((value) => value + 1)
    setSelected(null)
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-toolbar">
        <div className="quiz-type-list">
          {quizTypes.map((item) => (
            <button
              key={item.value}
              className={type === item.value ? 'quiz-type active' : 'quiz-type'}
              onClick={() => reset(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="quiz-score">
          Điểm {score}/{questions.length}
        </div>
      </div>

      <section className="quiz-card">
        <div className="quiz-counter">
          Câu {currentIndex + 1}/{questions.length}
        </div>

        <p className="quiz-prompt">{current.prompt}</p>

        {current.promptZh && (
          <div className="quiz-main-hanzi">{current.promptZh}</div>
        )}

        {current.audioText && (
          <div className="quiz-audio-center">
            <AudioButton text={current.audioText} label="Nghe" />
          </div>
        )}

        <div className="quiz-options">
          {current.options.map((option) => {
            const classNames = ['quiz-option']
            if (answered && option.text === current.correctAnswer) {
              classNames.push('correct')
            } else if (answered && option.text === selected) {
              classNames.push('wrong')
            }

            return (
              <button
                key={option.id}
                className={classNames.join(' ')}
                onClick={() => choose(option.text)}
              >
                {option.text}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className={isCorrect ? 'quiz-feedback correct' : 'quiz-feedback wrong'}>
            <strong>{isCorrect ? '✓ Chính xác' : '✗ Chưa đúng'}</strong>
            <span>
              Đáp án: {current.correctAnswer}
            </span>
            {current.explanation && (
              <div className="quiz-explanation">
                <span>{current.explanation.hanzi}</span>
                <span>{current.explanation.pinyin}</span>
                <span>{current.explanation.meaningVi}</span>
                {current.explanation.hanViet && (
                  <span>Hán Việt: {current.explanation.hanViet}</span>
                )}
              </div>
            )}
          </div>
        )}

        <button
          className="primary-button quiz-next"
          disabled={!answered}
          onClick={next}
        >
          {currentIndex === questions.length - 1 ? 'Làm bộ mới' : 'Câu tiếp theo'}
        </button>
      </section>
    </div>
  )
}
