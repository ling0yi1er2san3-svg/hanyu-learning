import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import HomePage from '../pages/Home/HomePage'
import BooksPage from '../pages/Books/BooksPage'
import LessonsPage from '../pages/Lessons/LessonsPage'
import LessonPage from '../pages/Lesson/LessonPage'
import ReviewPage from '../pages/Review/ReviewPage'
import FlashcardsPage from '../pages/Flashcards/FlashcardsPage'
import ListeningPage from '../pages/Listening/ListeningPage'
import ProgressPage from '../pages/Progress/ProgressPage'
import SettingsPage from '../pages/Settings/SettingsPage'
import SearchPage from '../pages/Search/SearchPage'
import QuizPage from '../pages/Quiz/QuizPage'

const DataToolsPage = lazy(() => import('../pages/DataTools/DataToolsPage'))

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/book/:bookNumber" element={<LessonsPage />} />
        <Route path="/book/:bookNumber/lesson/:lessonNumber" element={<LessonPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/listening" element={<ListeningPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/data-tools"
          element={
            <Suspense fallback={<div className="page"><div className="loading-box">Đang tải Data Tools...</div></div>}>
              <DataToolsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
