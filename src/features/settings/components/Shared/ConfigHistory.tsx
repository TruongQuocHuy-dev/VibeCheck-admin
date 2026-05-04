import React from 'react';
import type { ConfigHistoryEntry } from '../../types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { User, ArrowRight } from 'lucide-react';

interface ConfigHistoryProps {
  history: ConfigHistoryEntry[];
}

export const ConfigHistory: React.FC<ConfigHistoryProps> = ({ history }) => {
  return (
    <div className="bg-background-card border border-background-muted rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-background-muted bg-background-muted/30">
        <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest">Lịch sử thay đổi</h4>
      </div>
      <div className="divide-y divide-background-muted">
        {history.map((item) => (
          <div key={item.id} className="p-4 hover:bg-background-muted/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-text-primary">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md">{item.field}</span>
                  <div className="flex items-center gap-1 text-text-muted italic">
                    <span>{String(item.oldValue)}</span>
                    <ArrowRight size={12} />
                    <span className="text-status-active not-italic font-bold">{String(item.newValue)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-text-muted">
                  <User size={10} />
                  <span>{item.adminName}</span>
                  <span>•</span>
                  <span>{format(new Date(item.timestamp), 'HH:mm dd/MM/yyyy', { locale: vi })}</span>
                </div>
              </div>
              <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
