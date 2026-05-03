import { UserRow } from './UserRow';
import { Skeleton } from '../../../shared/ui/Skeleton';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAction: (user: User) => void;
}

export function UserTable({ users, isLoading, page, totalPages, onPageChange, onAction }: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-background-muted bg-background-card/50 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-background-card border-b border-background-muted">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">Người dùng</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">Vai trò</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">Vị trí</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">Ngày tham gia</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-background-muted/30">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-6 py-4">
                    <Skeleton className="h-10 w-full rounded-2xl" />
                  </td>
                </tr>
              ))
            ) : users.length > 0 ? (
              users.map((user) => (
                <UserRow key={user._id} user={user} onAction={onAction} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-text-secondary font-medium">Không tìm thấy người dùng nào</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-background-muted px-6 py-4 bg-background-card/80">
        <p className="text-sm text-text-secondary">
          Trang <span className="font-semibold text-text-primary">{page}</span> trên{' '}
          <span className="font-semibold text-text-primary">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
            className="rounded-xl border border-background-muted bg-background/50 px-4 py-2 text-sm font-medium text-text-primary transition hover:bg-background-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
            className="rounded-xl border border-background-muted bg-background/50 px-4 py-2 text-sm font-medium text-text-primary transition hover:bg-background-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
