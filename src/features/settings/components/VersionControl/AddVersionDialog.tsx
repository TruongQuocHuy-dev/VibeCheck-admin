import React, { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { validateSemver } from '../../validators';
import type { Platform } from '../../types';
import { X, AlertCircle } from 'lucide-react';

interface AddVersionDialogProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export const AddVersionDialog: React.FC<AddVersionDialogProps> = ({ onClose, onSubmit, isSubmitting }) => {
  const [version, setVersion] = useState('');
  const [platform, setPlatform] = useState<Platform>('both');
  const [minRequired, setMinRequired] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateSemver(version)) {
      setError('Định dạng phiên bản không hợp lệ (ví dụ: 1.0.0)');
      return;
    }

    try {
      await onSubmit({ version, platform, minRequired, notes, forceUpdate: minRequired });
      onClose();
    } catch (err) {
      setError('Có lỗi xảy ra khi lưu phiên bản');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background-card border border-background-muted rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-background-muted">
          <h3 className="text-lg font-bold text-text-primary">Thêm phiên bản mới</h3>
          <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-3 p-3 bg-status-banned/10 border border-status-banned/20 rounded-xl text-text-error text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
              Số phiên bản (Semver)
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
              className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
              Nền tảng
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['ios', 'android', 'both'] as Platform[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                    platform === p 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'bg-background-muted border-background-muted text-text-secondary hover:border-text-muted'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-background-muted rounded-xl">
            <div>
              <p className="text-sm font-bold text-text-primary">Bắt buộc cập nhật</p>
              <p className="text-[10px] text-text-muted mt-0.5">User phải update để tiếp tục dùng app</p>
            </div>
            <button
              type="button"
              onClick={() => setMinRequired(!minRequired)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                minRequired ? 'bg-primary' : 'bg-[#262626]'
              }`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                minRequired ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
              Release Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Mô tả các thay đổi trong phiên bản này..."
              className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" className="flex-1" isLoading={isSubmitting}>
              Thêm mới
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
