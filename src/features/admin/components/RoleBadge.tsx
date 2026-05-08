import type { AdminRole } from '../types';

interface RoleBadgeProps {
  role: AdminRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const getRoleStyle = () => {
    switch (role) {
      case 'admin':
        return 'bg-blue-900/30 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'admin':
        return 'Admin';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleStyle()}`}>
      {getRoleLabel()}
    </span>
  );
}
