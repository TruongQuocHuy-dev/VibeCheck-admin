import React from 'react';
import { Smartphone, Apple } from 'lucide-react';

interface PreviewCardProps {
  title: string;
  body: string;
  image?: string;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ title, body, image }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* iOS Mockup */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-text-secondary">
          <Apple size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">iOS Preview</span>
        </div>
        <div className="bg-[#1c1c1e] rounded-[2.5rem] p-4 w-full max-w-[280px] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-[10px] font-bold text-white">V</div>
                <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider">VibeCheck</span>
              </div>
              <span className="text-[10px] text-white/50">bây giờ</span>
            </div>
            <p className="text-sm font-bold text-white leading-tight mb-0.5">{title}</p>
            <p className="text-xs text-white/80 leading-relaxed line-clamp-3">{body}</p>
            {image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-white/5 aspect-video">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Android Mockup */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-text-secondary">
          <Smartphone size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">Android Preview</span>
        </div>
        <div className="bg-[#000000] rounded-2xl p-3 w-full max-w-[280px] border border-white/5 shadow-2xl">
          <div className="bg-[#2a2a2a] rounded-xl p-3">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white">V</div>
                <span className="text-[10px] text-text-secondary">VibeCheck • 2m</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{title}</p>
                <p className="text-xs text-text-secondary line-clamp-2">{body}</p>
              </div>
              {image && (
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
