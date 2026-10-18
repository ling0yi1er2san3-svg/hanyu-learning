import type { BookIndex, Lesson } from '../types/lesson'
const assetPath=(path:string)=>`${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
export async function getBookIndex(bookNumber:number):Promise<BookIndex>{const r=await fetch(assetPath(`data/book${bookNumber}/index.json`));if(!r.ok) throw new Error(`Không tải được dữ liệu Quyển ${bookNumber}.`);return r.json()}
export async function getLesson(bookNumber:number,lessonNumber:number):Promise<Lesson>{const file=`lesson${String(lessonNumber).padStart(2,'0')}.json`;const r=await fetch(assetPath(`data/book${bookNumber}/${file}`));if(!r.ok) throw new Error(`Không tải được Bài ${lessonNumber} của Quyển ${bookNumber}.`);return r.json()}
