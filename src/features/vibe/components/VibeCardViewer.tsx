import { useState, useEffect, useCallback } from 'react';
import type { Vibe } from '../types';

interface VibeCardViewerProps {
  vibes: Vibe[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason?: string) => void;
}

export function VibeCardViewer({ vibes, onApprove, onReject }: VibeCardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCaption, setExpandedCaption] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // If vibes array changes and current index is out of bounds, reset
  useEffect(() => {
    if (currentIndex >= vibes.length && vibes.length > 0) {
      setCurrentIndex(0);
    }
  }, [vibes, currentIndex]);

  const currentVibe = vibes[currentIndex];
  const remainingCount = vibes.length - currentIndex;

  const handleNext = useCallback(() => {
    if (currentIndex < vibes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setExpandedCaption(false);
    }
  }, [currentIndex, vibes.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setExpandedCaption(false);
    }
  }, [currentIndex]);

  const handleApprove = useCallback(() => {
    if (!currentVibe || isAnimating) return;
    setIsAnimating(true);
    onApprove(currentVibe._id);
    setTimeout(() => {
      setIsAnimating(false);
      handleNext();
    }, 300);
  }, [currentVibe, isAnimating, onApprove, handleNext]);

  const handleReject = useCallback(() => {
    if (!currentVibe || isAnimating) return;
    setIsAnimating(true);
    // Here we could open a modal for reason, but for speed we'll pass generic
    onReject(currentVibe._id, 'Vi phạm nội dung');
    setTimeout(() => {
      setIsAnimating(false);
      handleNext();
    }, 300);
  }, [currentVibe, isAnimating, onReject, handleNext]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Enter') handleApprove();
      if (e.key === 'Backspace' || e.key === 'Delete') handleReject();
      if (e.key === 'Escape') handleNext(); // Skip
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleApprove, handleReject]);

  if (!currentVibe) {
    return (
      <div className="flex h-[600px] flex-col items-center justify-center rounded-3xl border border-[#262626] bg-[#0a0a0a]">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Tất cả đã được duyệt!</h3>
        <p className="mt-2 text-text-secondary">Không còn vibe nào đang chờ duyệt.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90"
        >
          Làm mới
        </button>
      </div>
    );
  }

  const allPhotos = [currentVibe.user?.avatar, ...(currentVibe.photos || [])].filter(Boolean);
  const mainPhoto = allPhotos[0];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto h-[calc(100vh-140px)] min-h-[600px]">
      {/* Progress Indicator */}
      <div className="mb-4 flex w-full items-center justify-between text-sm font-medium text-text-secondary">
        <span>Đang duyệt: {currentIndex + 1} / {vibes.length}</span>
        <span>{remainingCount} vibes còn lại</span>
      </div>

      {/* Main Card */}
      <div 
        className={`relative flex h-full w-full max-h-[800px] flex-col overflow-hidden rounded-3xl border border-[#262626] bg-black shadow-2xl transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
        style={{ aspectRatio: '3/4' }}
      >
        {/* Media Background */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
          {mainPhoto ? (
            <img 
              src={mainPhoto} 
              className="h-full w-full object-cover" 
              alt="Vibe content" 
            />
          ) : (
             <div className="flex flex-col items-center text-text-muted">
               <span className="text-4xl mb-2">📸</span>
               <p>Không có media</p>
             </div>
          )}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />



        {/* User Info & Caption (Bottom) */}
        <div className="absolute bottom-24 left-0 right-0 p-6 z-10">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={currentVibe.user?.avatar || 'https://via.placeholder.com/48'} 
              className="h-12 w-12 rounded-full border-2 border-white/20 shadow-md"
              alt=""
            />
            <div>
              <p className="text-base font-bold text-white text-shadow">
                {currentVibe.user?.fullName || currentVibe.user?.displayName || 'Người dùng ẩn danh'}
              </p>
              <p className="text-xs text-white/70">
                {new Date(currentVibe.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>
          </div>
          
          <div 
            className="cursor-pointer"
            onClick={() => setExpandedCaption(!expandedCaption)}
          >
            <p className={`text-sm text-white/90 leading-relaxed ${expandedCaption ? '' : 'line-clamp-3'}`}>
              {currentVibe.user?.bio || 'Không có mô tả (Bio trống)'}
            </p>
            {!expandedCaption && currentVibe.user?.bio && currentVibe.user.bio.length > 100 && (
              <span className="text-xs font-semibold text-white/50 mt-1 block">Xem thêm...</span>
            )}
            
            {/* Vibe Tags */}
            {currentVibe.user?.vibeTags && currentVibe.user.vibeTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentVibe.user.vibeTags.map(tagId => (
                  <span key={tagId} className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-md">
                    #{tagId.substring(0, 6)}
                  </span>
                ))}
              </div>
            )}
            
            {/* Photos count */}
            {allPhotos.length > 1 && (
              <p className="mt-2 text-xs text-white/60 text-right">
                + {allPhotos.length - 1} ảnh khác
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons (Absolute Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-6 z-20">
          <button
            onClick={handleReject}
            disabled={isAnimating}
            className="group flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 shadow-lg shadow-red-900/50 backdrop-blur-md transition-all hover:scale-110 hover:bg-red-500"
            title="Từ chối (Del/Backspace)"
          >
            <svg className="h-8 w-8 text-white transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={handleApprove}
            disabled={isAnimating}
            className="group flex h-16 w-16 items-center justify-center rounded-full bg-green-600/90 shadow-lg shadow-green-900/50 backdrop-blur-md transition-all hover:scale-110 hover:bg-green-500"
            title="Duyệt (Enter)"
          >
            <svg className="h-8 w-8 text-white transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>


      </div>

      {/* Navigation Hint */}
      <p className="mt-6 text-xs text-text-muted hidden md:block">
        <span className="font-bold">Mẹo:</span> Dùng phím mũi tên ← → để chuyển, Enter để Duyệt, Backspace để Từ chối
      </p>
    </div>
  );
}
