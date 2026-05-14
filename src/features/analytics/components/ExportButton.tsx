import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Download, FileText, Table, Link, ChevronDown } from 'lucide-react';

interface ExportButtonProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
  onCopyLink: () => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onExportCSV,
  onExportPDF,
  onCopyLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="primary" 
        size="sm" 
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Download size={16} />
        <span>Xuất báo cáo</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-card border border-background-muted rounded-xl shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <button 
            onClick={() => { onExportCSV(); setIsOpen(false); }}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-background-muted hover:text-white rounded-lg transition-colors"
          >
            <Table size={16} className="text-status-active" />
            <span>Xuất file CSV</span>
          </button>
          <button 
            onClick={() => { onExportPDF(); setIsOpen(false); }}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-background-muted hover:text-white rounded-lg transition-colors"
          >
            <FileText size={16} className="text-text-error" />
            <span>Xuất file PDF</span>
          </button>
          <div className="h-[1px] bg-background-muted my-1" />
          <button 
            onClick={() => { onCopyLink(); setIsOpen(false); }}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-background-muted hover:text-white rounded-lg transition-colors"
          >
            <Link size={16} className="text-primary" />
            <span>Sao chép liên kết</span>
          </button>
        </div>
      )}
    </div>
  );
};
