import React from 'react';
import * as diff from 'diff';

interface DiffViewerProps {
  oldContent: string;
  newContent: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ oldContent, newContent }) => {
  // Strip HTML for simple text diffing
  const strip = (html: string) => html.replace(/<[^>]*>/g, '\n').trim();
  const diffs = diff.diffLines(strip(oldContent), strip(newContent));

  return (
    <div className="bg-background-card border border-background-muted rounded-xl overflow-hidden font-mono text-sm leading-relaxed">
      <div className="grid grid-cols-1 divide-y divide-background-muted">
        {diffs.map((part, index) => (
          <div 
            key={index}
            className={`px-4 py-1 flex gap-4 ${
              part.added ? 'bg-status-active/10 text-status-active' : 
              part.removed ? 'bg-status-banned/10 text-status-banned' : 
              'text-text-secondary'
            }`}
          >
            <span className="w-4 shrink-0 text-center select-none opacity-50">
              {part.added ? '+' : part.removed ? '-' : ' '}
            </span>
            <pre className="whitespace-pre-wrap flex-1">{part.value}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
