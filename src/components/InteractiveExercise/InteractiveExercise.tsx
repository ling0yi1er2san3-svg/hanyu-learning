import { useMemo, useState } from 'react'
import type { ExerciseGroupV2, LessonSentenceV2, LessonV2, VocabularyV2 } from '../../types/dataV2'

type Choice = { id: string; text: string }

type Question =
  | { kind: 'choice'; prompt: string; subprompt?: string; choices: Choice[]; correctId: string; explanation?: string }
  | { kind: 'order'; prompt: string; tokens: { id: string; text: string }[]; correct: string }
  | { kind: 'open'; prompt: string; hint: string }

function seedNumber(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function deterministicShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items]
  let x = seedNumber(seed) || 1
  for (let i = result.length - 1; i > 0; i -= 1) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0
    const j = x % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function uniqBy<T>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>()
  return items.filter((item) => {
    const value = key(item)
    if (!value || seen.has(value)) return false
    seen.add(value)
    return true
  })
}

function allSentences(lesson: LessonV2): LessonSentenceV2[] {
  const rows: LessonSentenceV2[] = []
  for (const dialogue of lesson.dialogues ?? []) rows.push(...dialogue.lines)
  for (const text of lesson.texts ?? []) {
    if (text.sentences?.length) rows.push(...text.sentences)
    else if (text.chinese?.trim()) rows.push({ chinese: text.chinese.trim(), vietnamese: text.vietnamese })
  }
  return rows.filter((row) => row.chinese?.trim())
}

function pickVocabulary(lesson: LessonV2, seed: string) {
  return deterministicShuffle(lesson.vocabulary.filter((w) => w.hanzi && w.pinyin && w.meaningVi), seed)
}

function makePinyinQuestion(lesson: LessonV2, seed: string): Question | null {
  const vocab = pickVocabulary(lesson, seed)
  if (vocab.length < 2) return null
  const target = vocab[0]
  const distractors = uniqBy(vocab.slice(1), (w) => w.pinyin).filter((w) => w.pinyin !== target.pinyin).slice(0, 3)
  const choices = deterministicShuffle(
    [{ id: target.id, text: target.pinyin }, ...distractors.map((w) => ({ id: w.id, text: w.pinyin }))],
    `${seed}-choices`,
  )
  return {
    kind: 'choice',
    prompt: `Chọn Pinyin đúng của “${target.hanzi}”`,
    subprompt: target.meaningVi,
    choices,
    correctId: target.id,
    explanation: `${target.hanzi} — ${target.pinyin} — ${target.meaningVi}`,
  }
}

function makeMeaningQuestion(lesson: LessonV2, seed: string): Question | null {
  const vocab = pickVocabulary(lesson, seed)
  if (vocab.length < 2) return null
  const target = vocab[0]
  const distractors = uniqBy(vocab.slice(1), (w) => w.meaningVi).filter((w) => w.meaningVi !== target.meaningVi).slice(0, 3)
  const choices = deterministicShuffle(
    [{ id: target.id, text: target.meaningVi }, ...distractors.map((w) => ({ id: w.id, text: w.meaningVi }))],
    `${seed}-choices`,
  )
  return {
    kind: 'choice',
    prompt: `Chọn nghĩa đúng của “${target.hanzi}”`,
    subprompt: target.pinyin,
    choices,
    correctId: target.id,
    explanation: `${target.hanzi} — ${target.pinyin} — ${target.meaningVi}`,
  }
}

function findFillCandidate(lesson: LessonV2, seed: string): { sentence: LessonSentenceV2; word: VocabularyV2 } | null {
  const sentences = deterministicShuffle(allSentences(lesson), `${seed}-sentences`)
  const vocab = pickVocabulary(lesson, `${seed}-vocab`)
  for (const sentence of sentences) {
    const clean = sentence.chinese.trim()
    if (clean.length < 4 || clean.length > 48) continue
    const word = vocab.find((item) => item.hanzi.length >= 1 && clean.includes(item.hanzi))
    if (word) return { sentence, word }
  }
  return null
}

function makeFillQuestion(lesson: LessonV2, seed: string): Question | null {
  const candidate = findFillCandidate(lesson, seed)
  if (!candidate) return makeMeaningQuestion(lesson, seed)
  const { sentence, word } = candidate
  const vocab = pickVocabulary(lesson, `${seed}-distractors`)
  const distractors = uniqBy(vocab.filter((w) => w.id !== word.id), (w) => w.hanzi).slice(0, 3)
  const prompt = sentence.chinese.replace(word.hanzi, '＿＿＿')
  const choices = deterministicShuffle(
    [{ id: word.id, text: `${word.hanzi}  ${word.pinyin}` }, ...distractors.map((w) => ({ id: w.id, text: `${w.hanzi}  ${w.pinyin}` }))],
    `${seed}-choices`,
  )
  return {
    kind: 'choice',
    prompt,
    subprompt: sentence.vietnamese || 'Chọn từ phù hợp để hoàn thành câu.',
    choices,
    correctId: word.id,
    explanation: `${sentence.chinese}${sentence.vietnamese ? ` — ${sentence.vietnamese}` : ''}`,
  }
}

function makeDialogueQuestion(lesson: LessonV2, seed: string): Question | null {
  const pairs: { a: LessonSentenceV2; b: LessonSentenceV2; id: string }[] = []
  for (const dialogue of lesson.dialogues ?? []) {
    for (let i = 0; i < dialogue.lines.length - 1; i += 1) {
      pairs.push({ a: dialogue.lines[i], b: dialogue.lines[i + 1], id: `${dialogue.id}-${i}` })
    }
  }
  if (!pairs.length) return makeFillQuestion(lesson, seed)
  const pair = deterministicShuffle(pairs, seed)[0]
  const allLines = uniqBy(allSentences(lesson), (line) => line.chinese)
  const decoys = deterministicShuffle(allLines.filter((line) => line.chinese !== pair.b.chinese), `${seed}-decoys`).slice(0, 3)
  const correctId = `${pair.id}-correct`
  const choices = deterministicShuffle(
    [{ id: correctId, text: pair.b.chinese }, ...decoys.map((line, index) => ({ id: `${pair.id}-d${index}`, text: line.chinese }))],
    `${seed}-choices`,
  )
  return {
    kind: 'choice',
    prompt: pair.a.chinese,
    subprompt: 'Chọn câu phù hợp để tiếp tục hội thoại.',
    choices,
    correctId,
    explanation: `${pair.b.chinese}${pair.b.vietnamese ? ` — ${pair.b.vietnamese}` : ''}`,
  }
}

function splitChineseChunks(text: string) {
  const clean = text.replace(/[\s。！？!?，,；;：“”‘’]/g, '')
  const chars = Array.from(clean)
  if (chars.length < 4 || chars.length > 22) return []
  const chunkSize = chars.length >= 10 ? 2 : 1
  const chunks: string[] = []
  for (let i = 0; i < chars.length; i += chunkSize) chunks.push(chars.slice(i, i + chunkSize).join(''))
  return chunks
}

function makeOrderQuestion(lesson: LessonV2, seed: string): Question | null {
  const candidates = deterministicShuffle(allSentences(lesson), seed)
    .map((row) => ({ row, chunks: splitChineseChunks(row.chinese) }))
    .filter((item) => item.chunks.length >= 3)
  if (!candidates.length) return makeFillQuestion(lesson, seed)
  const chosen = candidates[0]
  const tokens = deterministicShuffle(
    chosen.chunks.map((text, index) => ({ id: `${index}-${text}`, text })),
    `${seed}-order`,
  )
  return {
    kind: 'order',
    prompt: chosen.row.vietnamese ? `Sắp xếp thành câu: ${chosen.row.vietnamese}` : 'Bấm các mảnh theo đúng thứ tự để tạo câu.',
    tokens,
    correct: chosen.chunks.join(''),
  }
}

function makeCorrectionQuestion(lesson: LessonV2, seed: string): Question | null {
  const candidates = deterministicShuffle(allSentences(lesson), seed)
    .map((row) => row.chinese.trim())
    .filter((text) => splitChineseChunks(text).length >= 3)
  if (!candidates.length) return makeFillQuestion(lesson, seed)
  const correct = candidates[0]
  const chunks = splitChineseChunks(correct)
  if (chunks.length < 3) return makeFillQuestion(lesson, seed)
  const bad1 = [...chunks]
  ;[bad1[0], bad1[1]] = [bad1[1], bad1[0]]
  const bad2 = [...chunks]
  const n = bad2.length
  ;[bad2[n - 2], bad2[n - 1]] = [bad2[n - 1], bad2[n - 2]]
  const correctId = `${seed}-correct`
  const choices = deterministicShuffle([
    { id: correctId, text: correct },
    { id: `${seed}-bad1`, text: bad1.join('') },
    { id: `${seed}-bad2`, text: bad2.join('') },
  ], `${seed}-choices`)
  return {
    kind: 'choice',
    prompt: 'Chọn câu có trật tự đúng.',
    subprompt: 'Đây là bài luyện do app tạo từ câu thật trong bài học.',
    choices,
    correctId,
    explanation: correct,
  }
}

function makeOpenQuestion(lesson: LessonV2, group: ExerciseGroupV2, seed: string): Question {
  const sentences = deterministicShuffle(allSentences(lesson), seed)
  const hint = sentences[0]?.chinese || lesson.titleZh
  const type = group.type || ''
  const prompt = type === 'writing'
    ? `Viết lại bằng chữ Hán một câu hoặc cụm từ trong Bài ${lesson.lesson}.`
    : type === 'speaking'
      ? `Nói 2–3 câu bằng tiếng Trung về chủ đề “${lesson.titleZh}”.`
      : `Trả lời bằng tiếng Trung dựa trên nội dung Bài ${lesson.lesson}: “${lesson.titleZh}”.`
  return { kind: 'open', prompt, hint }
}

function buildQuestion(lesson: LessonV2, group: ExerciseGroupV2, round: number): Question {
  const seed = `${lesson.id}-${group.id}-${round}`
  switch (group.type) {
    case 'phonetics': return makePinyinQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'fill': return makeFillQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'substitution': return makeFillQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'grammar': return makeFillQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'sentence': return makeOrderQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'dialogue': return makeDialogueQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'correction': return makeCorrectionQuestion(lesson, seed) ?? makeMeaningQuestion(lesson, seed)!
    case 'speaking':
    case 'qa':
    case 'writing': return makeOpenQuestion(lesson, group, seed)
    default: return makeMeaningQuestion(lesson, seed) ?? makeOpenQuestion(lesson, group, seed)
  }
}

export default function InteractiveExercise({ lesson, group }: { lesson: LessonV2; group: ExerciseGroupV2 }) {
  const [round, setRound] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [ordered, setOrdered] = useState<{ id: string; text: string }[]>([])
  const [orderChecked, setOrderChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [openText, setOpenText] = useState('')

  const question = useMemo(() => buildQuestion(lesson, group, round), [lesson, group, round])

  function nextQuestion() {
    setRound((value) => value + 1)
    setSelected(null)
    setChecked(false)
    setOrdered([])
    setOrderChecked(false)
    setShowHint(false)
    setOpenText('')
  }

  function checkChoice() {
    if (question.kind !== 'choice' || !selected || checked) return
    setChecked(true)
    setScore((current) => ({
      correct: current.correct + (selected === question.correctId ? 1 : 0),
      total: current.total + 1,
    }))
  }

  function checkOrder() {
    if (question.kind !== 'order' || ordered.length !== question.tokens.length || orderChecked) return
    setOrderChecked(true)
    const answer = ordered.map((token) => token.text).join('')
    setScore((current) => ({
      correct: current.correct + (answer === question.correct ? 1 : 0),
      total: current.total + 1,
    }))
  }

  if (question.kind === 'choice') {
    const isCorrect = checked && selected === question.correctId
    return (
      <div className="interactive-exercise">
        <div className="exercise-score">Điểm: {score.correct}/{score.total}</div>
        <div className="exercise-prompt">{question.prompt}</div>
        {question.subprompt && <div className="exercise-subprompt">{question.subprompt}</div>}
        <div className="exercise-choice-grid">
          {question.choices.map((choice) => {
            let className = selected === choice.id ? 'exercise-choice selected' : 'exercise-choice'
            if (checked && choice.id === question.correctId) className += ' correct'
            if (checked && selected === choice.id && choice.id !== question.correctId) className += ' wrong'
            return <button key={choice.id} className={className} onClick={() => !checked && setSelected(choice.id)}>{choice.text}</button>
          })}
        </div>
        <div className="exercise-actions">
          <button className="primary-button" disabled={!selected || checked} onClick={checkChoice}>Chấm đáp án</button>
          <button className="secondary-button" onClick={nextQuestion}>Câu khác</button>
        </div>
        {checked && <div className={isCorrect ? 'exercise-feedback correct' : 'exercise-feedback wrong'}>
          <strong>{isCorrect ? '✓ Chính xác' : '✕ Chưa đúng'}</strong>
          {question.explanation && <span>{question.explanation}</span>}
        </div>}
      </div>
    )
  }

  if (question.kind === 'order') {
    const available = question.tokens.filter((token) => !ordered.some((picked) => picked.id === token.id))
    const answer = ordered.map((token) => token.text).join('')
    const isCorrect = orderChecked && answer === question.correct
    return (
      <div className="interactive-exercise">
        <div className="exercise-score">Điểm: {score.correct}/{score.total}</div>
        <div className="exercise-prompt">{question.prompt}</div>
        <div className="exercise-order-answer">
          {ordered.length === 0 && <span className="muted">Bấm các mảnh bên dưới...</span>}
          {ordered.map((token) => <button key={token.id} onClick={() => !orderChecked && setOrdered((current) => current.filter((x) => x.id !== token.id))}>{token.text}</button>)}
        </div>
        <div className="exercise-token-bank">
          {available.map((token) => <button key={token.id} onClick={() => !orderChecked && setOrdered((current) => [...current, token])}>{token.text}</button>)}
        </div>
        <div className="exercise-actions">
          <button className="primary-button" disabled={ordered.length !== question.tokens.length || orderChecked} onClick={checkOrder}>Chấm đáp án</button>
          <button className="secondary-button" onClick={() => { setOrdered([]); setOrderChecked(false) }}>Làm lại</button>
          <button className="secondary-button" onClick={nextQuestion}>Câu khác</button>
        </div>
        {orderChecked && <div className={isCorrect ? 'exercise-feedback correct' : 'exercise-feedback wrong'}>
          <strong>{isCorrect ? '✓ Chính xác' : '✕ Chưa đúng'}</strong>
          {!isCorrect && <span>Đáp án: {question.correct}</span>}
        </div>}
      </div>
    )
  }

  return (
    <div className="interactive-exercise">
      <div className="exercise-prompt">{question.prompt}</div>
      <textarea className="exercise-open-input" value={openText} onChange={(event) => setOpenText(event.target.value)} placeholder="Nhập câu trả lời của bạn ở đây..." />
      <div className="exercise-actions">
        <button className="secondary-button" onClick={() => setShowHint((value) => !value)}>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý từ bài học'}</button>
        <button className="secondary-button" onClick={nextQuestion}>Đề khác</button>
      </div>
      {showHint && <div className="exercise-feedback neutral"><strong>Gợi ý:</strong><span>{question.hint}</span></div>}
      <div className="exercise-note">Dạng tự luận được dùng để luyện viết/nói; app không tự chấm đúng sai vì có nhiều cách trả lời hợp lệ.</div>
    </div>
  )
}
