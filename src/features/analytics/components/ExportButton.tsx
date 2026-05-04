import React from 'react';
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
  return (
    <div className="relative group">
      <Button variant="primary" size="sm" className="gap-2">
        <Download size={16} />
        <span>Xuất báo cáo</span>
        <ChevronDown size={14} />
      </Button>
      
      <div className="absolute right-0 mt-2 w-48 bg-background-card border border-background-muted rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 overflow-hidden">
        <button 
          onClick={onExportCSV}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-background-muted hover:text-white rounded-lg transition-colors"
        >
          <Table size={16} className="text-status-active" />
          <span>Xuất file CSV</span>
        </button>
        <button 
          onClick={onExportPDF}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-background-muted hover:text-white rounded-lg transition-colors"
        >
          <FileText size={16} className="text-text-error" />
          <span>Xuất file PDF</span>
        </button>
        <div className="h-[1px] bg-background-muted my-1" />
        <button 
          onClick={onCopyLink}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-background-muted hover:text-white rounded-lg transition-colors"
        >
          <Link size={16} className="text-primary" />
          <span>Sao chép liên kết</span>
        </button>
      </div>
    </div>
  );
};
