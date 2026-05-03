import { useState } from 'react';
import { useResolveReport } from '../hooks/useResolveReport';
import { Button } from '../../../shared/ui/Button';
import type { Report, ResolveAction } from '../types';

interface ResolveDialogProps {
  report: Report;
  onClose: () => void;
}

export function ResolveDialog({ report, onClose }: ResolveDialogProps) {
  const [action, setAction] = useState<ResolveAction>('dismiss');
  const [note, setNote] = useState('');
  const [confirm, setConfirm] = useState(false);
  
  const resolveMutation = useResolveReport(report._id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm) return;

    try {
      await resolveMutation.mutateAsync({
        action,
        note,
        targetAction: action !== 'dismiss'
      });
      onClose();
    } catch (err) {
      console.error('Lỗi khi xử lý báo cáo:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg rounded-[32px] border border-[#262626] bg-[#0d0d0d] p-8 shadow-[0_0_100px_rgba(0,0,0,1)] scale-in-center">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Xử lý báo cáo vi phạm</h3>
            <p className="mt-1 text-sm text-text-secondary">Mã định danh: <span className="font-mono text-primary">#{report._id.slice(-8)}</span></p>
          </div>
          <button onClick={onClose} className="rounded-full bg-[#171717] p-2 text-[#676767] hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d4d4d]">Quyết định xử lý</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: 'dismiss', label: 'Bỏ qua báo cáo', desc: 'Nội dung không vi phạm', icon: '🟢' },
                { val: 'warning', label: 'Cảnh cáo', desc: 'Gửi nhắc nhở cho người dùng', icon: '🟡' },
                { val: 'content_deleted', label: 'Xóa nội dung', desc: 'Gỡ bài đăng/story vi phạm', icon: '🔴' },
                { val: 'user_banned', label: 'Khóa tài khoản', desc: 'Cấm vĩnh viễn truy cập', icon: '🚫' },
              ].map((opt) => (
                <label 
                  key={opt.val}
                  className={`relative flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-all duration-200 ${
                    action === opt.val ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]' : 'border-[#262626] bg-black/40 grayscale hover:grayscale-0 hover:border-[#444]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{opt.icon}</span>
                    <input 
                      type="radio" 
                      name="action" 
                      value={opt.val} 
                      checked={action === opt.val} 
                      onChange={(e) => setAction(e.target.value as any)}
                      className="h-4 w-4 accent-primary"
                    />
                  </div>
                  <span className="mt-2 text-sm font-bold text-white">{opt.label}</span>
                  <span className="text-[10px] text-text-secondary leading-tight">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d4d4d]">Ghi chú (Note cho hệ thống)</p>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required={action !== 'dismiss'}
              placeholder="Nhập bằng chứng hoặc lý do cụ thể..."
              className="w-full h-32 rounded-2xl border border-[#262626] bg-black/50 p-4 text-sm text-text-primary outline-none focus:border-primary transition-all custom-scrollbar placeholder:text-[#333]"
            />
          </div>

          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={confirm} 
                onChange={(e) => setConfirm(e.target.checked)}
                className="mt-1 h-5 w-5 rounded-lg border-[#262626] bg-black accent-primary"
              />
              <span className="text-[11px] text-[#b4b4b4] leading-relaxed select-none">
                Tôi xác nhận đã kiểm tra kỹ lưỡng báo cáo này. Mọi hành động xóa nội dung hoặc khóa người dùng đều tuân thủ <span className="text-primary font-bold">Chính sách cộng đồng VibeCheck</span>.
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" className="h-14 flex-1 rounded-2xl" onClick={onClose} type="button">Hủy bỏ</Button>
            <Button 
              variant="primary" 
              className="h-14 flex-1 rounded-2xl shadow-lg shadow-primary/20" 
              type="submit"
              disabled={!confirm || resolveMutation.isPending}
            >
              {resolveMutation.isPending ? 'Đang thực thi...' : 'Hoàn tất xử lý'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
