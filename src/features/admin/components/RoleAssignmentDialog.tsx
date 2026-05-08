import { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import type { Admin, AdminRole } from '../types';
import { RoleBadge } from './RoleBadge';

interface RoleAssignmentDialogProps {
  admin: Admin | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (role: string) => Promise<void>;
  isSubmitting: boolean;
}

const ROLES: { value: AdminRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Admin', description: 'Toàn quyền quản lý hệ thống.' },
];

export function RoleAssignmentDialog({ admin, isOpen, onClose, onConfirm, isSubmitting }: RoleAssignmentDialogProps) {
  const [selectedRole, setSelectedRole] = useState<AdminRole>('admin');

  useEffect(() => {
    if (admin) {
      setSelectedRole(admin.role);
    }
  }, [admin]);

  if (!isOpen || !admin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-6 shadow-2xl border-background-muted">
        <h3 className="text-xl font-semibold text-text-primary mb-1">
          Cập nhật chức vụ
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Thay đổi quyền hạn cho tài khoản <span className="font-semibold text-text-primary">{admin.email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {ROLES.map((role) => (
              <label
                key={role.value}
                className={[
                  'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                  selectedRole === role.value 
                    ? 'bg-primary/10 border-primary/50' 
                    : 'bg-background-card/50 border-background-muted hover:border-gray-600'
                ].join(' ')}
              >
                <div className="flex items-center h-5">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={() => setSelectedRole(role.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-600 bg-black/50"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <RoleBadge role={role.value} />
                  </div>
                  <p className="text-xs text-text-secondary">{role.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-background-muted">
            <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || selectedRole === admin.role}
            >
              {isSubmitting ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
