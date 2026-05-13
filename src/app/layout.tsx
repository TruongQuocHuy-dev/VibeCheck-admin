import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  Layers, 
  CircleDashed, 
  ShieldAlert, 
  Tags, 
  FileText, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  ChevronRight,
  Menu,
  LogOut,
  User as UserIcon,
  Lock
} from 'lucide-react'
import { useAuth } from '../shared/hooks/useAuth'
import { NotificationBell } from '../features/notification'
import { SidebarItem } from '../shared/components/SidebarItem'

interface NavSection {
  title: string;
  items: any[];
}

export function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved ? saved === 'true' : false;
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const navSections: NavSection[] = [
    {
      title: 'Tổng quan',
      items: [
        { label: 'Bảng điều khiển', to: '/admin', icon: <LayoutDashboard size={18} /> },
      ]
    },
    {
      title: 'Quản lý người dùng',
      items: [
        { 
          label: 'Quản lý tài khoản', 
          icon: <Users size={18} />,
          hasSubmenu: true,
          subItems: [
            { label: 'Người dùng', to: '/admin/users', icon: <Users size={14} /> },
            { label: 'Admin', to: '/admin/admins', icon: <ShieldCheck size={14} /> },
          ]
        },
        { label: 'Quản lý Báo cáo', to: '/admin/reports', icon: <Flag size={18} /> },
      ]
    },
    {
      title: 'Kiểm duyệt nội dung',
      items: [
        { label: 'Kiểm duyệt Vibes', to: '/admin/vibes', icon: <Layers size={18} /> },
        { label: 'Kiểm duyệt Stories', to: '/admin/stories', icon: <CircleDashed size={18} /> },
        { label: 'Quản lý Blacklist', to: '/admin/blacklist', icon: <ShieldAlert size={18} /> },
        { label: 'Quản lý VibeTag', to: '/admin/vibe-tags', icon: <Tags size={18} /> },
      ]
    },
    {
      title: 'Nội dung & CMS',
      items: [
        { label: 'CMS Pages', to: '/admin/cms', icon: <FileText size={18} /> },
      ]
    },
    {
      title: 'Thống kê & Phân tích',
      items: [
        { label: 'Analytics Dashboard', to: '/admin/analytics', icon: <BarChart3 size={18} /> },
      ]
    },
    {
      title: 'Hệ thống',
      items: [
        { label: 'Cài đặt hệ thống', to: '/admin/settings', icon: <Settings size={18} /> },
        // Add Admin Management here if needed in the future, currently we have admins under User Management
      ]
    }
  ];

  // Find current active item for breadcrumb
  const allItems = navSections.flatMap(s => s.items.flatMap(i => i.hasSubmenu ? [i, ...i.subItems] : [i]));
  const activeItem = allItems.find(i => location.pathname === i.to);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0d0d] text-[#ececec]">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={[
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-[#000000] border-r border-[#262626] transition-all duration-300',
          'md:sticky md:top-0 md:h-screen',
          isSidebarCollapsed ? 'w-[70px]' : 'w-[280px]',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ].join(' ')}
      >
        <div className="flex h-full flex-col px-3 py-4">
          {/* Logo / Toggle */}
          <div className="mb-6 flex items-center justify-between px-2">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3 overflow-hidden transition-all duration-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-white shadow-lg shadow-primary/20">V</div>
                <span className="truncate text-sm font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">VibeCheck Admin</span>
              </div>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-[#676767] hover:text-white"
              title={isSidebarCollapsed ? "Mở rộng" : "Thu gọn"}
            >
              <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto custom-scrollbar px-1">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {!isSidebarCollapsed && (
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#525252] mt-4 first:mt-0">
                    {section.title}
                  </div>
                )}
                
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <SidebarItem
                      key={item.label}
                      label={item.label}
                      to={item.to}
                      icon={item.icon}
                      isSidebarCollapsed={isSidebarCollapsed}
                      hasSubmenu={item.hasSubmenu}
                      subItems={item.subItems}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Footer */}
          <div className="mt-auto border-t border-[#262626] pt-4 px-1">
            <div className={['flex items-center gap-3 rounded-xl p-2 transition-all duration-200', isSidebarCollapsed ? 'justify-center' : 'hover:bg-white/5 group'].join(' ')}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary border border-primary/20">
                {(user?.fullName || 'A').charAt(0)}
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-1 flex-col overflow-hidden">
                  <p className="truncate text-sm font-semibold text-white group-hover:text-primary transition-colors">{user?.fullName || user?.displayName || 'Admin'}</p>
                  <p className="truncate text-[10px] text-[#676767] uppercase tracking-widest font-medium">{user?.role || 'Administrator'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <header className="flex h-16 items-center justify-between border-b border-[#262626] bg-[#000000]/40 px-4 md:px-8 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-[#b4b4b4] hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#676767]">
              <span className="hover:text-white cursor-pointer transition-colors">Admin</span>
              <ChevronRight size={12} />
              <span className="text-white uppercase tracking-widest font-bold">
                {activeItem?.label || 'Bảng điều khiển'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
             {/* Notifications */}
             <NotificationBell />

             <div className="h-4 w-[1px] bg-[#262626]" />

             {/* User Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-white/5 pr-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-xs font-bold text-primary border border-primary/20">
                    {(user?.fullName || 'A').charAt(0)}
                  </div>
                  <ChevronRight size={14} className={['text-[#676767] transition-transform duration-300', isUserMenuOpen ? 'rotate-90' : ''].join(' ')} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-[#262626] bg-[#0d0d0d] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#262626] mb-1">
                        <p className="text-sm font-bold text-white">{user?.fullName || 'Administrator'}</p>
                        <p className="text-[10px] text-[#676767] truncate mt-0.5">{user?.email || 'admin@vibecheck.app'}</p>
                      </div>
                      <div className="p-1 space-y-1">
                        <Link 
                          to="/admin/profile" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#b4b4b4] hover:bg-white/5 hover:text-white transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20">
                            <UserIcon size={14} />
                          </div>
                          Thông tin cá nhân
                        </Link>
                        <Link 
                          to="/admin/profile?tab=security" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#b4b4b4] hover:bg-white/5 hover:text-white transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20">
                            <Lock size={14} />
                          </div>
                          Bảo mật & Mật khẩu
                        </Link>
                        <div className="h-[1px] bg-[#262626] my-2 mx-2" />
                        <button 
                          onClick={logout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-status-banned hover:bg-status-banned/10 transition-all font-semibold group"
                        >
                          <div className="p-1.5 rounded-lg bg-status-banned/10 text-status-banned group-hover:bg-status-banned/20">
                            <LogOut size={14} />
                          </div>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                )}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#0d0d0d] p-4 md:p-8 custom-scrollbar">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}