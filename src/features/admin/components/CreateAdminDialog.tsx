import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import type { AdminRole, CreateAdminData } from '../types';
import { RoleBadge } from './RoleBadge';

interface CreateAdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CreateAdminData) => Promise<void>;
  isSubmitting: boolean;
}

const ROLES: { value: AdminRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Admin', description: 'Toàn quyền quản lý hệ thống.' },
];

export function CreateAdminDialog({ isOpen, onClose, onConfirm, isSubmitting }: CreateAdminDialogProps) {
  const [formData, setFormData] = useState<CreateAdminData>({
    email: '',
    fullName: '',
    role: 'admin',
    tempPassword: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    await onConfirm(formData);
    // Reset form on success is handled by the parent closing the dialog
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-6 shadow-2xl border-background-muted">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary">
            Thêm Quản trị viên mới
          </h3>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-text-secondary pl-1">
                Địa chỉ Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full rounded-2xl border border-background-muted bg-background-card/50 px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-sm font-medium text-text-secondary pl-1">
                Họ và Tên
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="w-full rounded-2xl border border-background-muted bg-background-card/50 px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tempPassword" className="text-sm font-medium text-text-secondary pl-1">
                Mật khẩu tạm thời
              </label>
              <input
                id="tempPassword"
                name="tempPassword"
                type="password"
                value={formData.tempPassword}
                onChange={handleChange}
                placeholder="Để trống nếu muốn hệ thống tự tạo"
                className="w-full rounded-2xl border border-background-muted bg-background-card/50 px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary pl-1">
                Vai trò
              </label>
              <div className="space-y-2">
                {ROLES.map((role) => (
                  <label
                    key={role.value}
                    className={[
                      'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                      formData.role === role.value 
                        ? 'bg-primary/10 border-primary/50' 
                        : 'bg-background-card/50 border-background-muted hover:border-gray-600'
                    ].join(' ')}
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={() => setFormData(prev => ({ ...prev, role: role.value }))}
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
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-background-muted mt-2">
            <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !formData.email}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang xử lý...
                </div>
              ) : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
