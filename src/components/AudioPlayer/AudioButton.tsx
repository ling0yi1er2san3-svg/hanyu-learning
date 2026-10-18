import { openTtsPlayer } from '../../services/floatingMediaPlayer'

export default function AudioButton({text,label='Nghe'}:{text:string;label?:string}){
  return <button type="button" className="audio-button" onClick={e=>{e.stopPropagation();openTtsPlayer({ text, title: label, subtitle: 'TTS tiếng Trung' })}}>🔊 {label}</button>
}
