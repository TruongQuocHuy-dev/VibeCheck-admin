import React, { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { TargetSelector } from './TargetSelector';
import { PreviewCard } from './PreviewCard';
import type { BroadcastTarget } from '../../types';
import { Send, Image as ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface BroadcastFormProps {
  onSend: (data: any) => Promise<void>;
  isSending: boolean;
}

export const BroadcastForm: React.FC<BroadcastFormProps> = ({ onSend, isSending }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [deepLink, setDeepLink] = useState('');
  const [target, setTarget] = useState<BroadcastTarget>({ type: 'all' });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSend = async () => {
    await onSend({ title, body, mediaUrl, deepLink, target });
    setShowConfirm(false);
    // Reset form
    setTitle('');
    setBody('');
    setMediaUrl('');
    setDeepLink('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 bg-background-card border border-background-muted rounded-2xl p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Nội dung thông báo</h3>
          
          <div>
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
              Tiêu đề (Max 100 ký tự)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Nhập tiêu đề thông báo..."
              maxLength={100}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
              Nội dung (Max 500 ký tự)
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Nhập nội dung thông báo..."
              maxLength={500}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                Hình ảnh (URL)
              </label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-4 top-3.5 text-text-muted" />
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-background-muted border border-background-muted rounded-xl pl-12 pr-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                Deep Link (Redirect)
              </label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-4 top-3.5 text-text-muted" />
                <input
                  type="text"
                  value={deepLink}
                  onChange={(e) => setDeepLink(e.target.value)}
                  className="w-full bg-background-muted border border-background-muted rounded-xl pl-12 pr-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="vibe://..."
                />
              </div>
            </div>
          </div>
        </div>

        <TargetSelector target={target} onChange={setTarget} />

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary" size="lg" className="gap-2 px-8">
            <Send size={18} />
            Gửi thông báo
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-text-primary">Xem trước thông báo</h3>
        <PreviewCard title={title || 'Tiêu đề thông báo'} body={body || 'Nội dung thông báo sẽ xuất hiện ở đây...'} image={mediaUrl} />
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative w-full max-w-md bg-background-card border border-background-muted rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-warning mb-4">
              <AlertCircle size={24} />
              <h3 className="text-xl font-bold text-text-primary">Xác nhận gửi?</h3>
            </div>
            <p className="text-text-secondary text-sm mb-6">
              Bạn sắp gửi thông báo này đến <span className="text-text-primary font-bold">tất cả người dùng</span>. Hành động này không thể hoàn tác. Bạn đã kiểm tra kỹ nội dung chưa?
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowConfirm(false)}>
                Kiểm tra lại
              </Button>
              <Button variant="primary" className="flex-1" onClick={confirmSend} isLoading={isSending}>
                Xác nhận gửi
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
