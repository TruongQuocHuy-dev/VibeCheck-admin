import React, { useState } from 'react';
import { useChangePassword } from '../hooks/useChangePassword';
import { validatePassword, getPasswordStrength, getStrengthColor } from '../validators';
import { Button } from '../../../shared/ui/Button';
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ChangePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const changeMutation = useChangePassword();

  const strength = getPasswordStrength(formData.newPassword);
  const strengthColor = getStrengthColor(strength);
  const passwordError = formData.newPassword ? validatePassword(formData.newPassword) : null;
  const isMatch = formData.newPassword === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordError || !isMatch || !formData.currentPassword) return;

    try {
      await changeMutation.mutateAsync({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Đổi mật khẩu thành công');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Không thể đổi mật khẩu');
    }
  };

  const toggleVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const canSubmit = !passwordError && isMatch && formData.currentPassword && formData.newPassword;

  return (
    <div className="bg-background-card border border-background-muted rounded-2xl p-8 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-primary rounded-full" />
        <h3 className="text-lg font-bold text-text-primary">Bảo mật tài khoản</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full bg-[#121212] border border-[#262626] text-text-primary rounded-xl pl-12 pr-12 py-3 text-sm focus:border-primary transition-all outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('current')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4d4d4d] hover:text-white transition-colors"
            >
              {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
              Mật khẩu mới
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full bg-[#121212] border border-[#262626] text-text-primary rounded-xl pl-12 pr-12 py-3 text-sm focus:border-primary transition-all outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => toggleVisibility('new')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4d4d4d] hover:text-white transition-colors"
              >
                {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {/* Strength Bar */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Độ mạnh</span>
                <span className="text-[10px] font-bold text-text-muted">{strength}%</span>
              </div>
              <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${strengthColor}`} 
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full bg-[#121212] border ${!isMatch && formData.confirmPassword ? 'border-status-banned' : 'border-[#262626]'} text-text-primary rounded-xl pl-12 pr-12 py-3 text-sm focus:border-primary transition-all outline-none`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => toggleVisibility('confirm')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4d4d4d] hover:text-white transition-colors"
              >
                {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formData.confirmPassword && (
              <p className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide ${isMatch ? 'text-status-active' : 'text-status-banned'}`}>
                {isMatch ? <CheckCircle2 size={12} /> : <ShieldAlert size={12} />}
                {isMatch ? 'Mật khẩu trùng khớp' : 'Mật khẩu không khớp'}
              </p>
            )}
          </div>
        </div>

        {passwordError && formData.newPassword && (
          <div className="bg-status-banned/5 border border-status-banned/20 rounded-xl p-3">
             <p className="text-[10px] text-status-banned font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={14} /> {passwordError}
             </p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={changeMutation.isPending}
            disabled={!canSubmit}
            className="px-8"
          >
            Đổi mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
};
