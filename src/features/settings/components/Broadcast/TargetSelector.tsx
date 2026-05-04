import React from 'react';
import type { BroadcastTarget } from '../../types';
import { Globe, UserPlus, UserX, MapPin, Users } from 'lucide-react';

interface TargetSelectorProps {
  target: BroadcastTarget;
  onChange: (target: BroadcastTarget) => void;
}

export const TargetSelector: React.FC<TargetSelectorProps> = ({ target, onChange }) => {
  const options = [
    { id: 'all', label: 'Tất cả người dùng', icon: Globe },
    { id: 'new_users', label: 'Người dùng mới', icon: UserPlus },
    { id: 'inactive', label: 'Người dùng không hoạt động', icon: UserX },
    { id: 'location', label: 'Theo vị trí', icon: MapPin },
    { id: 'segment', label: 'Theo phân khúc', icon: Users },
  ];

  return (
    <div className="bg-background-card border border-background-muted rounded-2xl p-6">
      <h3 className="text-lg font-bold text-text-primary mb-4">Đối tượng nhận tin</h3>
      
      <div className="space-y-3">
        {options.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => onChange({ type: opt.id as any })}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              target.type === opt.id 
                ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(124,58,237,0.1)]' 
                : 'bg-background-muted border-background-muted hover:border-text-muted'
            }`}
          >
            <div className={`p-2 rounded-lg ${target.type === opt.id ? 'bg-primary text-white' : 'bg-background-card text-text-secondary'}`}>
              <opt.icon size={18} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${target.type === opt.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                {opt.label}
              </p>
              {target.type === opt.id && opt.id === 'inactive' && (
                <div className="mt-2 flex items-center gap-2 animate-in slide-in-from-top-1">
                  <span className="text-xs text-text-muted whitespace-nowrap">Không hoạt động trong</span>
                  <input 
                    type="number" 
                    className="w-16 bg-background-card border border-background-muted rounded-lg px-2 py-1 text-xs text-text-primary focus:outline-none"
                    defaultValue={30}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-xs text-text-muted">ngày</span>
                </div>
              )}
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              target.type === opt.id ? 'border-primary' : 'border-background-muted'
            }`}>
              {target.type === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <p className="text-xs text-text-secondary flex justify-between">
          <span>Dự kiến tiếp cận:</span>
          <span className="text-primary font-bold">~12,450 người dùng</span>
        </p>
      </div>
    </div>
  );
};
