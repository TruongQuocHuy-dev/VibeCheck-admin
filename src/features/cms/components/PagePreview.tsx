import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, X } from 'lucide-react';

interface PagePreviewProps {
  title: string;
  content: string;
  onClose: () => void;
}

export const PagePreview: React.FC<PagePreviewProps> = ({ title, content, onClose }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const viewportWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background-card">
      <div className="flex items-center justify-between px-6 py-4 border-b border-background-muted">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-text-primary">Preview: {title}</h3>
          <div className="flex bg-background-muted p-1 rounded-xl">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-2 rounded-lg transition-all ${viewport === 'desktop' ? 'bg-background-card text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-2 rounded-lg transition-all ${viewport === 'tablet' ? 'bg-background-card text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-2 rounded-lg transition-all ${viewport === 'mobile' ? 'bg-background-card text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-text-muted hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 bg-background-muted/50 p-8 overflow-auto flex justify-center">
        <div 
          className={`${viewportWidths[viewport]} bg-background-card min-h-full shadow-2xl transition-all duration-300 overflow-hidden rounded-t-3xl border border-background-muted`}
        >
          {/* Mock Mobile/Tablet Status Bar */}
          {viewport !== 'desktop' && (
            <div className="h-12 border-b border-background-muted flex items-center justify-center">
              <div className="w-16 h-1 bg-background-muted rounded-full" />
            </div>
          )}
          
          <div className="prose prose-invert max-w-none p-10 custom-preview">
             <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>

      <style>{`
        .custom-preview h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1.5rem; color: white; }
        .custom-preview h2 { font-size: 1.8rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #f3f4f6; }
        .custom-preview p { line-height: 1.7; margin-bottom: 1.25rem; color: #9ca3af; }
        .custom-preview a { color: #7c3aed; text-decoration: underline; }
        .custom-preview ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .custom-preview li { margin-bottom: 0.5rem; }
        .custom-preview img { max-width: 100%; border-radius: 1rem; margin: 2rem 0; }
        .custom-preview blockquote { border-left: 4px solid #7c3aed; padding-left: 1.5rem; font-style: italic; color: #d1d5db; margin: 2rem 0; }
      `}</style>
    </div>
  );
};
