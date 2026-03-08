import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: '首頁', end: true },
  { path: '/collocations', label: '搭配詞' },
  { path: '/grammar', label: '英文必備句型' },
  { path: '/junyi', label: '均一自學工具' },
]

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-6 h-14 overflow-x-auto scrollbar-hide">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-black text-sm">
              G
            </div>
            <span className="text-white font-black text-base leading-none whitespace-nowrap">
              GSAT English Hub
            </span>
          </NavLink>

          {/* Divider */}
          <div className="h-5 w-px bg-white/30 flex-shrink-0" />

          {/* Nav */}
          <nav className="flex items-center gap-1 flex-shrink-0">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-white border-b-2 border-white pb-1'
                      : 'text-white/75 hover:text-white hover:bg-white/15'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}