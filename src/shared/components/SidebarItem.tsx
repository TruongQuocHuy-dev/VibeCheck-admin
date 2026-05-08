import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface SubMenuItem {
  label: string;
  to: string;
  icon?: React.ReactNode;
}

export interface SidebarItemProps {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  isSidebarCollapsed: boolean;
  hasSubmenu?: boolean;
  subItems?: SubMenuItem[];
}

export function SidebarItem({
  label,
  to,
  icon,
  isSidebarCollapsed,
  hasSubmenu,
  subItems,
}: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (hasSubmenu) {
      const savedState = localStorage.getItem(`submenu_open_${label}`);
      if (savedState !== null) {
        setIsOpen(savedState === 'true');
      } else {
        const isChildActive = subItems?.some(item => location.pathname.startsWith(item.to));
        setIsOpen(isChildActive || false);
      }
    }
  }, [hasSubmenu, label, subItems, location.pathname]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(`submenu_open_${label}`, String(newState));
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
      isActive && !hasSubmenu
        ? 'bg-[#262626] text-white'
        : 'text-[#b4b4b4] hover:bg-[#171717] hover:text-white',
      isSidebarCollapsed ? 'justify-center' : '',
    ].join(' ');

  if (hasSubmenu && subItems) {
    const isChildActive = subItems.some(item => location.pathname.startsWith(item.to));

    return (
      <div className="flex flex-col">
        <button
          onClick={handleToggle}
          className={[
            'group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
            isChildActive && !isOpen ? 'text-white' : 'text-[#b4b4b4] hover:bg-[#171717] hover:text-white',
            isSidebarCollapsed ? 'justify-center' : '',
          ].join(' ')}
          title={isSidebarCollapsed ? label : ''}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center opacity-70 group-hover:opacity-100">
              {icon}
            </span>
            {!isSidebarCollapsed && <span className="truncate whitespace-nowrap">{label}</span>}
          </div>
          {!isSidebarCollapsed && (
            <svg
              className={['h-3 w-3 transition-transform duration-300', isOpen ? 'rotate-180' : ''].join(' ')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        <div
          className={[
            'overflow-hidden transition-all duration-300 ease-in-out',
            isOpen && !isSidebarCollapsed ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="pl-4 space-y-1">
            {subItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-lg py-2 pl-3 pr-2 text-sm font-medium transition-all duration-200 relative',
                    isActive
                      ? 'text-white'
                      : 'text-[#b4b4b4] hover:bg-[#171717] hover:text-white',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={[
                        'absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3/4 bg-primary transition-opacity duration-200',
                        isActive ? 'opacity-100' : 'opacity-0',
                      ].join(' ')}
                    />
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center opacity-70 group-hover:opacity-100">
                      {item.icon}
                    </span>
                    <span className="truncate whitespace-nowrap">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink to={to || '#'} end className={navLinkClass} title={isSidebarCollapsed ? label : ''}>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center opacity-70 group-hover:opacity-100">
        {icon}
      </span>
      {!isSidebarCollapsed && <span className="truncate whitespace-nowrap">{label}</span>}
    </NavLink>
  );
}
