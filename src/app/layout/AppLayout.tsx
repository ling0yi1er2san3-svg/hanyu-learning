import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Học', icon: '学', end: true },
  { to: '/books', label: 'Giáo trình', icon: '册' },
  { to: '/search', label: 'Tra từ', icon: '搜' },
  { to: '/flashcards', label: 'Thẻ', icon: '卡' },
  { to: '/quiz', label: 'Quiz', icon: '测' },
  { to: '/review', label: 'Ôn tập', icon: '复' },
  { to: '/listening', label: 'Luyện nghe', icon: '听' },
  { to: '/progress', label: 'Tiến độ', icon: '进' },
  { to: '/settings', label: 'Cài đặt', icon: '设' },
  { to: '/data-tools', label: 'Data Tools', icon: '工' },
]

export default function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">汉</div>
          <div><strong>HÁN NGỮ</strong><span>Learning V2</span></div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot"><small>V2 · source-aware runtime</small></div>
      </aside>

      <main className="main-content"><Outlet /></main>

      <nav className="bottom-nav">
        {navItems
          .filter((item) => ['/', '/books', '/search', '/flashcards', '/progress'].includes(item.to))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `bottom-link ${isActive ? 'active' : ''}`}
            >
              <span>{item.icon}</span><small>{item.label}</small>
            </NavLink>
          ))}
      </nav>
    </div>
  )
}
