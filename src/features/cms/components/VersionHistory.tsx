import React, { useState } from 'react';
import type { PageVersion } from '../types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { History, User, ChevronRight, RotateCcw } from 'lucide-react';
import { DiffViewer } from './DiffViewer';
import { Button } from '../../../shared/ui/Button';

interface VersionHistoryProps {
  versions: PageVersion[];
  currentContent: string;
  onRestore: (version: PageVersion) => void;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({ versions, currentContent, onRestore }) => {
  const [selectedVersion, setSelectedVersion] = useState<PageVersion | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-background-card border border-background-muted rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-background-muted bg-background-muted/30 flex items-center gap-2">
          <History size={18} className="text-primary" />
          <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest">Lịch sử chỉnh sửa</h4>
        </div>
        <div className="divide-y divide-background-muted">
          {versions.map((v) => (
            <div 
              key={v.id} 
              className={`p-4 transition-colors cursor-pointer hover:bg-background-muted/20 ${selectedVersion?.id === v.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
              onClick={() => setSelectedVersion(v)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">Phiên bản #{v.versionNumber}</span>
                    {v.id === versions[0].id && <span className="text-[10px] px-2 py-0.5 bg-status-active/10 text-status-active rounded-full font-bold">Hiện tại</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-text-muted">
                    <User size={10} />
                    <span>{v.authorName}</span>
                    <span>•</span>
                    <span>{format(new Date(v.createdAt), 'HH:mm dd/MM/yyyy', { locale: vi })}</span>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-text-muted transition-transform ${selectedVersion?.id === v.id ? 'rotate-90 text-primary' : ''}`} />
              </div>
              {v.changeSummary && (
                <p className="mt-2 text-xs text-text-secondary italic">"{v.changeSummary}"</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedVersion && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">So sánh thay đổi</h4>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2"
              onClick={() => onRestore(selectedVersion)}
            >
              <RotateCcw size={14} />
              Khôi phục phiên bản này
            </Button>
          </div>
          <DiffViewer oldContent={selectedVersion.content} newContent={currentContent} />
        </div>
      )}
    </div>
  );
};
