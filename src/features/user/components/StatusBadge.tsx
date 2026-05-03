import type { UserStatus } from '../types';

interface StatusBadgeProps {
  status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
        status === 'active'
          ? 'bg-green-900/30 text-status-active border-status-active/30'
          : 'bg-red-900/30 text-status-banned border-status-banned/30'
      }`}
    >
      {status === 'active' ? 'Hoạt động' : 'Đã khóa'}
    </span>
  );
}
