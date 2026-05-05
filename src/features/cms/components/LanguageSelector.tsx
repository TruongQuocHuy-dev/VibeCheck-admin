import React from 'react';
import type { PageLanguage } from '../types';

interface LanguageSelectorProps {
  value: PageLanguage;
  onChange: (value: PageLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex bg-background-muted p-1 rounded-xl w-fit">
      <button
        onClick={() => onChange('vi')}
        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
          value === 'vi' ? 'bg-background-card text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        Tiếng Việt
      </button>
      <button
        onClick={() => onChange('en')}
        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
          value === 'en' ? 'bg-background-card text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        English
      </button>
    </div>
  );
};
