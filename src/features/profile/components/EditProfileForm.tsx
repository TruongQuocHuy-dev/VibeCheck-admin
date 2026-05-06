import React, { useState, useRef } from 'react';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { uploadAvatar } from '../services';
import { validateName } from '../validators';
import { Button } from '../../../shared/ui/Button';
import { Camera, Mail, User, AlertCircle } from 'lucide-react';
import type { AdminProfile } from '../types';

interface EditProfileFormProps {
  profile: AdminProfile;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ profile }) => {
  const [fullName, setFullName] = useState(profile.fullName);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const updateMutation = useUpdateProfile();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (file.size > 2 * 1024 * 1024) {
      alert('Ảnh tối đa 2MB');
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadAvatar(file);
      setAvatarUrl(url);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Không thể tải ảnh lên');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(fullName);
    if (nameError) {
      setError(nameError);
      return;
    }
    setError(null);

    try {
      await updateMutation.mutateAsync({
        fullName,
        avatarUrl
      });
      // Success toast would go here
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="bg-background-card border border-background-muted rounded-2xl p-8 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-primary rounded-full" />
        <h3 className="text-lg font-bold text-text-primary">Thông tin cá nhân</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Upload Preview */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#262626] bg-[#121212] group-hover:border-primary/50 transition-all">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <User size={32} />
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Camera size={14} />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/jpeg,image/png,image/webp"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary mb-1">Ảnh đại diện</p>
            <p className="text-xs text-text-muted">Định dạng JPG, PNG, WebP. Tối đa 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email (Readonly) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4d4d4d]" size={16} />
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full bg-[#171717] border border-[#262626] text-[#676767] rounded-xl pl-12 pr-4 py-3 text-sm cursor-not-allowed outline-none"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
              Họ và tên
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ tên..."
                className={`w-full bg-[#121212] border ${error ? 'border-status-banned' : 'border-[#262626]'} text-text-primary rounded-xl pl-12 pr-4 py-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none`}
              />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-[10px] font-bold text-status-banned uppercase tracking-wide">
                <AlertCircle size={12} /> {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={updateMutation.isPending}
            disabled={fullName === profile.fullName && avatarUrl === profile.avatarUrl}
            className="px-8"
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
};
