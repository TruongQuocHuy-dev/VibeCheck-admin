import { Card } from '../../../shared/ui/Card';
import { Skeleton } from '../../../shared/ui/Skeleton';
import type { Admin } from '../types';
import { RoleBadge } from './RoleBadge';
import { PermissionViewer } from './PermissionViewer';

interface AdminTableProps {
  admins: Admin[];
  isLoading: boolean;
  onEditRole: (admin: Admin) => void;
  onDeleteAdmin: (admin: Admin) => void;
  currentUserId?: string;
}

export function AdminTable({ admins, isLoading, onEditRole, onDeleteAdmin, currentUserId }: AdminTableProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden border-background-muted">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-card/50 text-text-secondary border-b border-background-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Quản trị viên</th>
                <th className="px-6 py-4 font-medium">Chức vụ</th>
                <th className="px-6 py-4 font-medium">Quyền hạn</th>
                <th className="px-6 py-4 font-medium">Ngày tạo</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-muted">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-6 py-4">
                    <Skeleton className="h-10 w-full rounded-2xl" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  if (admins.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 border-background-muted text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-text-primary">Chưa có quản trị viên nào</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Hệ thống hiện tại chưa có quản trị viên nào được thêm vào.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-background-muted">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background-card/50 text-text-secondary border-b border-background-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Quản trị viên</th>
              <th className="px-6 py-4 font-medium">Chức vụ</th>
              <th className="px-6 py-4 font-medium">Quyền hạn</th>
              <th className="px-6 py-4 font-medium">Ngày tạo</th>
              <th className="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-background-muted">
            {admins.map((admin) => (
              <tr key={admin._id} className="group hover:bg-background-card/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {(admin.fullName || admin.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary flex items-center gap-2">
                        {admin.fullName || 'No Name'}
                        {admin._id === currentUserId && (
                          <span className="text-[10px] bg-primary/20 text-primary px-1.5 rounded">Bạn</span>
                        )}
                      </div>
                      <div className="text-xs text-text-secondary">{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <RoleBadge role={admin.role} />
                </td>
                <td className="px-6 py-4">
                  <PermissionViewer role={admin.role} />
                </td>
                <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                  {new Date(admin.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditRole(admin)}
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Phân quyền"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    {admin._id !== currentUserId && (
                      <button
                        onClick={() => onDeleteAdmin(admin)}
                        className="p-2 text-text-secondary hover:text-status-banned hover:bg-status-banned/10 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
