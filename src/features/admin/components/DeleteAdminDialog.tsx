import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import type { Admin } from '../types';

interface DeleteAdminDialogProps {
  admin: Admin | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transferToAdminId?: string) => Promise<void>;
  isSubmitting: boolean;
  availableAdmins: Admin[]; // to select who to transfer to
}

export function DeleteAdminDialog({ admin, isOpen, onClose, onConfirm, isSubmitting, availableAdmins }: DeleteAdminDialogProps) {
  const [transferTo, setTransferTo] = useState<string>('');

  if (!isOpen || !admin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(transferTo || undefined);
  };

  const otherAdmins = availableAdmins.filter(a => a._id !== admin._id && a.role === 'admin');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-6 shadow-2xl border-background-muted border-status-banned/30">
        <div className="flex items-center gap-3 text-status-banned mb-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-semibold">Xóa Quản trị viên</h3>
        </div>
        
        <p className="text-sm text-text-secondary mb-4">
          Bạn đang xóa tài khoản quản trị viên <span className="font-semibold text-text-primary">{admin.email}</span>. Hành động này không thể hoàn tác.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {admin.role === 'admin' && otherAdmins.length > 0 && (
            <div className="space-y-2 p-4 bg-status-banned/5 border border-status-banned/20 rounded-xl">
              <label className="text-sm font-medium text-text-primary">
                Chuyển quyền sở hữu cho admin khác?
              </label>
              <p className="text-xs text-text-secondary mb-2">
                Nếu tài khoản này sở hữu các cấu hình quan trọng, vui lòng chuyển quyền cho một Super Admin khác.
              </p>
              <select
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="w-full rounded-xl border border-background-muted bg-black/30 px-3 py-2 text-sm text-text-primary outline-none focus:border-status-banned transition"
              >
                <option value="">-- Không chuyển quyền --</option>
                {otherAdmins.map(a => (
                  <option key={a._id} value={a._id}>{a.email} ({a.fullName || 'Admin'})</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="danger"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xóa...' : 'Xác nhận xóa'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
