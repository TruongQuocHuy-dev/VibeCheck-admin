import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import type { BlacklistType } from '../types';

interface AddWordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (word: string, type: BlacklistType) => void;
  isSubmitting: boolean;
}

export function AddWordDialog({ isOpen, onClose, onAdd, isSubmitting }: AddWordDialogProps) {
  const [word, setWord] = useState('');
  const [type, setType] = useState<BlacklistType>('strict');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word.length < 2) return;
    onAdd(word, type);
    setWord('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-6 shadow-2xl border-[#262626] bg-[#0d0d0d]">
        <h3 className="text-xl font-bold text-white">Thêm từ khóa cấm</h3>
        <p className="mt-1 text-sm text-text-secondary">Hệ thống sẽ tự động lọc các nội dung chứa từ khóa này.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#676767]">Từ khóa</label>
            <input 
              type="text" 
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
              placeholder="Ví dụ: bậy bạ, spam..."
              className="w-full rounded-xl border border-[#262626] bg-black/30 px-4 py-3 text-sm text-text-primary outline-none focus:border-primary transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#676767]">Loại vi phạm</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as BlacklistType)}
              className="w-full rounded-xl border border-[#262626] bg-[#0d0d0d] px-4 py-3 text-sm text-text-primary outline-none focus:border-primary transition"
            >
              <option value="strict">Strict (Cấm hoàn toàn)</option>
              <option value="warning">Warning (Cảnh báo)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={isSubmitting || word.length < 2}>
              {isSubmitting ? 'Đang thêm...' : 'Thêm từ khóa'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
