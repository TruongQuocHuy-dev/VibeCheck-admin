import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVibesModeration, useVibeStats } from '../hooks/useVibes';
import { useModerateVibeAction } from '../hooks/useModerateVibe';
import { 
  Check, 
  X, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User as UserIcon,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  Image as ImageIcon,
  Heart
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export function VibeModerationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || 'pending';

  const { data: vibes, isLoading, isError } = useVibesModeration(status);
  const { data: stats } = useVibeStats();
  const { moderateVibe, deleteVibe } = useModerateVibeAction();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Reset index when status or vibe changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [status]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [currentIndex]);

  const currentVibe = vibes?.[currentIndex];
  const allPhotos = currentVibe ? [currentVibe.user?.avatar, ...(currentVibe.photos || [])].filter(Boolean) : [];
  const hasMultiplePhotos = allPhotos.length > 1;

  const handleNext = useCallback(() => {
    if (vibes && currentIndex < vibes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, vibes]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allPhotos.length > 0 && photoIndex < allPhotos.length - 1) {
      setPhotoIndex(prev => prev + 1);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(prev => prev - 1);
    }
  };

  const handleApprove = useCallback(async () => {
    if (currentVibe) {
      await moderateVibe.mutateAsync({ id: currentVibe._id, status: 'active' });
      if (status === 'pending') handleNext();
    }
  }, [currentVibe, moderateVibe, handleNext, status]);

  const handleHide = useCallback(async () => {
    if (currentVibe) {
      await moderateVibe.mutateAsync({ id: currentVibe._id, status: 'hidden' });
      if (status !== 'hidden') handleNext();
    }
  }, [currentVibe, moderateVibe, handleNext, status]);

  const handleDelete = useCallback(async () => {
    if (currentVibe && window.confirm('Xóa vĩnh viễn vibe này?')) {
      await deleteVibe.mutateAsync(currentVibe._id);
      handleNext();
    }
  }, [currentVibe, deleteVibe, handleNext]);

  const handleStatusChange = (newStatus: string) => {
    setSearchParams({ status: newStatus });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Enter') handleApprove();
      if (e.key === 'Escape') handleHide();
      if (e.key === 'Delete') handleDelete();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleApprove, handleHide, handleDelete]);

  const calculateAge = (birthYear?: number) => {
    if (!birthYear) return null;
    return new Date().getFullYear() - birthYear;
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header & Stats */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Kiểm duyệt Vibes</h1>
          <p className="mt-2 text-text-secondary">Quản lý bài đăng của người dùng hệ thống.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Layers size={18} />} label="Tổng" value={stats?.totalVibes || 0} color="text-white" />
          <StatCard icon={<Clock size={18} />} label="Chờ duyệt" value={stats?.pendingVibes || 0} color="text-warning" />
          <StatCard icon={<Eye size={18} />} label="Đã duyệt" value={stats?.activeVibes || 0} color="text-success" />
          <StatCard icon={<EyeOff size={18} />} label="Đã ẩn" value={stats?.hiddenVibes || 0} color="text-error" />
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex justify-center">
        <div className="flex rounded-2xl bg-[#171717] p-1.5 border border-white/5">
          {['pending', 'active', 'hidden', 'all'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                status === s 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {s === 'pending' ? 'Chờ duyệt' : s === 'active' ? 'Đã duyệt' : s === 'hidden' ? 'Đã ẩn' : 'Tất cả'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-primary" />
          </div>
        ) : isError || !vibes ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-4 text-text-secondary">
            <AlertCircle size={48} className="text-error" />
            <p>Đã có lỗi xảy ra khi tải dữ liệu.</p>
          </div>
        ) : vibes.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-4 text-text-secondary text-center">
            <div className="rounded-full bg-white/5 p-8">
              <Check size={64} className="text-success/50" />
            </div>
            <h2 className="text-2xl font-bold text-white">Trống trải!</h2>
            <p>Không có vibe nào trong danh sách này.</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <p className="text-text-secondary font-medium">
                Vibe {currentIndex + 1} / {vibes.length}
              </p>
            </div>

            <div className="relative w-full max-w-[420px] aspect-[3/4]">
              {/* Navigation Buttons - Floating */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute -left-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-[#171717] border border-white/10 text-white hover:bg-[#262626] transition-all disabled:opacity-0"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === vibes.length - 1}
                className="absolute -right-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-[#171717] border border-white/10 text-white hover:bg-[#262626] transition-all disabled:opacity-0"
              >
                <ChevronRight size={32} />
              </button>

              {/* Card Container */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#171717] border border-white/10 shadow-2xl group/card">
                {allPhotos[photoIndex] ? (
                  <img
                    src={allPhotos[photoIndex]}
                    alt={`Vibe photo ${photoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#262626] text-white/10">
                    <ImageIcon size={64} />
                  </div>
                )}

                {/* Photo Gallery Navigation Overlays */}
                {hasMultiplePhotos && (
                  <>
                    <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                      {allPhotos.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 rounded-full transition-all ${
                            i === photoIndex ? 'w-6 bg-white' : 'w-2 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <div 
                      className="absolute inset-y-0 left-0 w-1/3 cursor-pointer z-10" 
                      onClick={handlePrevPhoto}
                    />
                    <div 
                      className="absolute inset-y-0 right-0 w-1/3 cursor-pointer z-10" 
                      onClick={handleNextPhoto}
                    />
                  </>
                )}

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 pointer-events-none">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Display */}
                      <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden bg-[#262626] shrink-0">
                        {currentVibe.user.avatar ? (
                          <img src={currentVibe.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30">
                            <UserIcon size={20} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-end gap-2">
                          <h2 className="text-xl font-bold text-white line-clamp-1">
                            {currentVibe.user.fullName || 'Người dùng'}
                          </h2>
                          {currentVibe.user.birthYear && (
                            <span className="text-lg text-white/70 font-medium">
                              {calculateAge(currentVibe.user.birthYear)}
                            </span>
                          )}
                          {currentVibe.user.gender && (
                             <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                               currentVibe.user.gender === 'male' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'
                             }`}>
                               {currentVibe.user.gender === 'male' ? '♂' : '♀'}
                             </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/50 text-[10px] uppercase tracking-wider font-bold">
                           <Clock size={10} />
                           {currentVibe?.createdAt ? (
                            (() => {
                              const date = new Date(currentVibe.createdAt);
                              return isNaN(date.getTime()) ? 'N/A' : format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
                            })()
                           ) : 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bio & Tags */}
                    <div className="space-y-3">
                      {currentVibe.user.bio && (
                        <p className="text-white/80 line-clamp-2 text-sm leading-relaxed">
                          {currentVibe.user.bio}
                        </p>
                      )}

                      {currentVibe.user.vibeTags && currentVibe.user.vibeTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {currentVibe.user.vibeTags.slice(0, 5).map((tag, idx) => (
                            <span key={idx} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/5 text-[10px] text-white/60">
                              <Heart size={8} className="text-primary" />
                              {tag}
                            </span>
                          ))}
                          {currentVibe.user.vibeTags.length > 5 && (
                            <span className="text-[10px] text-white/30">+{currentVibe.user.vibeTags.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1 uppercase tracking-widest font-bold text-[10px]">
                      <div className={`px-2 py-0.5 rounded-md ${
                        currentVibe.status === 'active' ? 'bg-success/20 text-success' : 
                        currentVibe.status === 'hidden' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                      }`}>
                        {currentVibe.status}
                      </div>
                      {hasMultiplePhotos && (
                        <div className="px-2 py-0.5 rounded-md bg-white/10 text-white/60">
                           {photoIndex + 1} / {allPhotos.length} 📸
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-5">
                <button
                  onClick={handleDelete}
                  className="p-4 rounded-full bg-[#171717] border border-white/10 text-error hover:bg-error/10 hover:border-error transition-all"
                >
                  <Trash2 size={24} />
                </button>
                
                <button
                  onClick={handleHide}
                  className={`p-5 rounded-full bg-[#171717] border border-white/10 transition-all ${
                    currentVibe.status === 'hidden' ? 'text-white/20' : 'text-white/60 hover:text-white hover:border-white'
                  }`}
                  disabled={currentVibe.status === 'hidden'}
                >
                  <X size={32} />
                </button>

                <button
                  onClick={handleApprove}
                  className={`p-6 rounded-full shadow-lg transition-all ${
                    currentVibe.status === 'active' 
                      ? 'bg-success/20 text-success border border-success/30' 
                      : 'bg-primary text-white hover:scale-110 active:scale-95 shadow-primary/30'
                  }`}
                  disabled={currentVibe.status === 'active'}
                >
                  <Check size={40} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Shortcuts Guide */}
      <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-widest font-bold text-white/20">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">← →</kbd> Card navigation
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Click Card Side</kbd> Photo gallery
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Enter</kbd> Approve
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Esc</kbd> Hide
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#171717] border border-white/5 min-w-[140px]">
      <div className={`${color} opacity-80 bg-white/5 p-2 rounded-xl`}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-wider font-bold text-white/30">{label}</p>
        <p className={`text-xl font-bold ${color}`}>{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
