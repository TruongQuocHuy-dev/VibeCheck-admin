import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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
  depth?: number;
}

export function SidebarItem({
  label,
  to,
  icon,
  isSidebarCollapsed,
  hasSubmenu,
  subItems,
  depth = 0,
}: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if any child is active
  const isChildActive = subItems?.some(item => location.pathname.startsWith(item.to));
  const isActive = to ? location.pathname === to || (to !== '/admin' && location.pathname.startsWith(to)) : isChildActive;

  useEffect(() => {
    if (hasSubmenu) {
      const savedState = localStorage.getItem(`submenu_open_${label}`);
      if (savedState !== null) {
        setIsOpen(savedState === 'true');
      } else if (isChildActive) {
        setIsOpen(true);
      }
    }
  }, [hasSubmenu, label, isChildActive]);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault();
      const newState = !isOpen;
      setIsOpen(newState);
      localStorage.setItem(`submenu_open_${label}`, String(newState));
    }
  };

  const baseClasses = [
    'group flex items-center gap-3 rounded-lg px-3 py-[10px] text-sm font-medium transition-all duration-200 relative',
    isSidebarCollapsed ? 'justify-center' : '',
  ].join(' ');

  const activeClasses = isActive 
    ? 'text-white bg-white/5' 
    : 'text-[#b4b4b4] hover:bg-white/5 hover:text-white';

  const indentStyle = !isSidebarCollapsed && depth > 0 ? { paddingLeft: `${12 + depth * 16}px` } : {};

  return (
    <div className="flex flex-col w-full">
      {to ? (
        <NavLink
          to={to}
          end={to === '/admin'}
          className={({ isActive: linkActive }) => `${baseClasses} ${linkActive ? 'text-white bg-white/5' : 'text-[#b4b4b4] hover:bg-white/5 hover:text-white'}`}
          style={indentStyle}
          title={isSidebarCollapsed ? label : ''}
        >
          {({ isActive: linkActive }) => (
            <>
              {linkActive && !isSidebarCollapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${linkActive ? 'text-primary' : 'opacity-70 group-hover:opacity-100 group-hover:text-white'}`}>
                {icon}
              </span>
              {!isSidebarCollapsed && <span className="truncate whitespace-nowrap">{label}</span>}
            </>
          )}
        </NavLink>
      ) : (
        <button
          onClick={handleToggle}
          className={`${baseClasses} ${activeClasses}`}
          style={indentStyle}
          title={isSidebarCollapsed ? label : ''}
        >
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${isActive ? 'text-primary' : 'opacity-70 group-hover:opacity-100 group-hover:text-white'}`}>
              {icon}
            </span>
            {!isSidebarCollapsed && <span className="truncate whitespace-nowrap">{label}</span>}
          </div>
          {!isSidebarCollapsed && hasSubmenu && (
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-[#676767]'}`} 
            />
          )}
        </button>
      )}

      {hasSubmenu && subItems && (
        <div
          className={[
            'overflow-hidden transition-all duration-300 ease-in-out',
            isOpen && !isSidebarCollapsed ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="flex flex-col w-full">
            {subItems.map((item) => (
              <SidebarItem
                key={item.to}
                label={item.label}
                to={item.to}
                icon={item.icon}
                isSidebarCollapsed={isSidebarCollapsed}
                depth={depth + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

