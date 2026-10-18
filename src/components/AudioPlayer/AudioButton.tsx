import { speakChinese } from '../../services/audioService'
export default function AudioButton({text,label='Nghe'}:{text:string;label?:string}){return <button type="button" className="audio-button" onClick={e=>{e.stopPropagation();speakChinese(text)}}>🔊 {label}</button>}
