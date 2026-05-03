import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../shared/hooks/useAuth'

const mainItems = [
  {
    label: 'Bảng điều khiển',
    to: '/admin',
    icon: 'dashboard',
  },
  {
    label: 'Người dùng',
    to: '/admin/users',
    icon: 'users',
  },
]

const moderationItems = [
  {
    label: 'Kiểm duyệt Vibes',
    to: '/admin/vibes',
    icon: 'vibe',
  },
  {
    label: 'Kiểm duyệt Stories',
    to: '/admin/stories',
    icon: 'story',
  },
  {
    label: 'Quản lý Blacklist',
    to: '/admin/blacklist',
    icon: 'blacklist',
  },
  {
    label: 'Quản lý Báo cáo',
    to: '/admin/reports',
    icon: 'report',
  },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isModerationOpen, setIsModerationOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-[#ececec]">
      {/* Sidebar */}
      <aside 
        className={[
          'fixed inset-y-0 z-50 flex flex-col bg-[#000000] border-r border-[#262626] transition-all duration-300 md:relative',
          isSidebarCollapsed ? 'w-[70px]' : 'w-[260px]'
        ].join(' ')}
      >
        <div className="flex h-full flex-col px-3 py-4">
          {/* Logo / Toggle */}
          <div className="mb-4 flex items-center justify-between px-2">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3 overflow-hidden transition-all duration-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-white">V</div>
                <span className="truncate text-sm font-semibold whitespace-nowrap">VibeCheck Admin</span>
              </div>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#171717] transition-colors"
              title={isSidebarCollapsed ? "Mở rộng" : "Thu gọn"}
            >
              <svg className="h-4 w-4 text-[#b4b4b4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
            {/* Main Items */}
            {mainItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#262626] text-white'
                      : 'text-[#b4b4b4] hover:bg-[#171717] hover:text-white',
                    isSidebarCollapsed ? 'justify-center' : ''
                  ].join(' ')
                }
                title={isSidebarCollapsed ? item.label : ''}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center opacity-70 group-hover:opacity-100">
                  {item.icon === 'dashboard' && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                  {item.icon === 'users' && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
                {!isSidebarCollapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
              </NavLink>
            ))}

            {/* Moderation Group */}
            <div className="pt-4">
              {!isSidebarCollapsed && (
                <button 
                  onClick={() => setIsModerationOpen(!isModerationOpen)}
                  className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#b4b4b4] transition-all duration-200 hover:bg-[#171717] hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center opacity-70 group-hover:opacity-100">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    Kiểm duyệt nội dung
                  </div>
                  <svg className={['h-3 w-3 transition-transform duration-300', isModerationOpen ? 'rotate-180' : ''].join(' ')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              <div className={[
                'mt-1 space-y-1 transition-all duration-300 overflow-hidden',
                !isSidebarCollapsed && !isModerationOpen ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'
              ].join(' ')}>
                {moderationItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      [
                        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-[#262626] text-white'
                          : 'text-[#b4b4b4] hover:bg-[#171717] hover:text-white',
                        isSidebarCollapsed ? 'justify-center' : 'pl-6'
                      ].join(' ')
                    }
                    title={isSidebarCollapsed ? item.label : ''}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center opacity-70 group-hover:opacity-100">
                      {item.icon === 'vibe' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      )}
                      {item.icon === 'story' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {item.icon === 'blacklist' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      )}
                      {item.icon === 'report' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      )}
                    </span>
                    {!isSidebarCollapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          {/* User Profile Footer (Mini version when collapsed) */}
          <div className="mt-auto border-t border-[#262626] pt-4">
            <div className={['flex items-center gap-3 rounded-lg p-2 transition-colors', isSidebarCollapsed ? 'justify-center' : 'hover:bg-[#171717]'].join(' ')}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary border border-primary/20">
                {(user?.fullName || 'A').charAt(0)}
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-1 flex-col overflow-hidden">
                  <p className="truncate text-sm font-medium">{user?.fullName || user?.displayName || 'Quản trị viên'}</p>
                  <p className="truncate text-[10px] text-[#676767] uppercase tracking-wider">{user?.role === 'admin' ? 'Quản trị viên' : 'Kiểm duyệt viên'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <header className="flex h-14 items-center justify-between border-b border-[#262626] bg-[#0d0d0d]/80 px-6 backdrop-blur-md z-30">
          <div className="flex items-center gap-2 text-sm text-[#b4b4b4]">
            <span className="cursor-default hover:text-white">Admin</span>
            <span className="text-[#4d4d4d]">/</span>
            <span className="font-medium text-white uppercase tracking-wide">
              {[...mainItems, ...moderationItems].find(i => window.location.pathname.endsWith(i.to))?.label || 'Bảng điều khiển'}
            </span>
          </div>

          <div className="flex items-center gap-4">
             {/* Notifications */}
             <button className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#171717] transition-colors text-[#b4b4b4] hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-primary border border-[#0d0d0d]" />
             </button>

             <div className="h-6 w-[1px] bg-[#262626]" />

             {/* User Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-[#171717]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary border border-primary/20">
                    {(user?.fullName || 'A').charAt(0)}
                  </div>
                  <svg className={['h-3 w-3 text-[#b4b4b4] transition-transform', isUserMenuOpen ? 'rotate-180' : ''].join(' ')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-[#262626] bg-[#171717] p-2 shadow-2xl z-50">
                      <div className="px-3 py-2 border-b border-[#262626] mb-1">
                        <p className="text-sm font-medium text-white">{user?.fullName || 'Administrator'}</p>
                        <p className="text-xs text-[#676767] truncate">{user?.email || 'admin@vibecheck.app'}</p>
                      </div>
                      <div className="space-y-1">
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#b4b4b4] hover:bg-[#262626] hover:text-white transition-colors text-left">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Thông tin cá nhân
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#b4b4b4] hover:bg-[#262626] hover:text-white transition-colors text-left">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                          Đổi mật khẩu
                        </button>
                        <div className="h-[1px] bg-[#262626] my-1" />
                        <button 
                          onClick={logout}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-status-banned hover:bg-status-banned/10 transition-colors text-left font-medium"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                )}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#0d0d0d] p-6 custom-scrollbar">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}