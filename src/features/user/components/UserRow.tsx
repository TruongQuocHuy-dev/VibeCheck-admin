import { StatusBadge } from './StatusBadge';
import type { User } from '../types';
import { useAuth } from '../../../shared/hooks/useAuth';

interface UserRowProps {
  user: User;
  onAction: (user: User) => void;
}

export function UserRow({ user, onAction }: UserRowProps) {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <tr className="border-b border-background-muted/50 hover:bg-background-hover/30 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-background-muted bg-background-muted flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-text-muted">
                {(user.fullName || user.displayName || '?').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {user.fullName || user.displayName || 'No Name'}
            </p>
            <p className="text-xs text-text-secondary">{user.email || user.phone}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {user.location ? 'Đã bật' : 'Chưa bật'}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
      </td>
      <td className="px-6 py-4">
        {isAdmin && (
          <button
            onClick={() => onAction(user)}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              user.status === 'active'
                ? 'border-status-banned/30 text-status-banned hover:bg-status-banned/10'
                : 'border-primary/30 text-primary hover:bg-primary/10'
            }`}
            title={user.status === 'active' ? 'Ban User' : 'Unban User'}
          >
            {user.status === 'active' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
          </button>
        )}
      </td>
    </tr>
  );
}
