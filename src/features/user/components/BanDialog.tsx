import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import type { User } from '../types';

interface BanDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  isSubmitting: boolean;
}

export function BanDialog({ user, isOpen, onClose, onConfirm, isSubmitting }: BanDialogProps) {
  const [reason, setReason] = useState('');
  const isBan = user.status === 'active';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBan && !reason.trim()) return;
    await onConfirm(reason);
    onClose();
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-6 shadow-2xl border-background-muted">
        <h3 className="text-xl font-semibold text-text-primary">
          {isBan ? 'Khóa tài khoản người dùng' : 'Mở khóa tài khoản'}
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Bạn có chắc chắn muốn {isBan ? 'khóa' : 'mở khóa'} tài khoản của{' '}
          <span className="font-semibold text-text-primary">{user.fullName || user.displayName || user.phone}</span>?
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isBan && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Lý do khóa <span className="text-status-banned">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Nhập lý do vi phạm..."
                className="w-full min-h-[100px] rounded-2xl border border-background-muted bg-black/30 px-4 py-3 text-sm text-text-primary outline-none focus:border-primary transition"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant={isBan ? 'danger' : 'primary'}
              disabled={isSubmitting || (isBan && !reason.trim())}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
