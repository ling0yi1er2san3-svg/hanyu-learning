import type { GrammarPoint } from '../../types/lesson'
import AudioButton from '../AudioPlayer/AudioButton'

interface Props {
  item: GrammarPoint
}

export default function GrammarCard({ item }: Props) {
  return (
    <article className="grammar-card rich-grammar-card">
      <div className="grammar-pattern">{item.pattern}</div>
      <p>{item.explanationVi}</p>

      {item.notes && item.notes.length > 0 && (
        <div className="grammar-notes">
          {item.notes.map((note, index) => (
            <div key={`${item.id}-note-${index}`}>• {note}</div>
          ))}
        </div>
      )}

      <div className="grammar-examples">
        {item.examples.map((example, index) => (
          <div className="grammar-example" key={`${item.id}-${index}`}>
            <div className="grammar-example-top">
              <strong>{example.zh}</strong>
              <AudioButton text={example.zh} label="" />
            </div>
            <span>{example.pinyin}</span>
            <span>{example.vi}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
