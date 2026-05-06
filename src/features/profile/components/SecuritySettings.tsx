import React, { useState, useEffect } from 'react';
import { getSessions, revokeSession } from '../services';
import type { AdminSession } from '../types';
import { Smartphone, Monitor, Globe, LogOut, ShieldCheck, Fingerprint } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const data = await getSessions();
      setSessions(data);
    } catch (err) {
      // TODO: Handle mock sessions if BE not ready
      setSessions([
        { _id: '1', device: 'Chrome on macOS', ip: '192.168.1.1', lastActive: new Date().toISOString(), isCurrent: true },
        { _id: '2', device: 'Safari on iPhone 15', ip: '1.1.1.1', lastActive: new Date(Date.now() - 3600000).toISOString(), isCurrent: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = async (id: string) => {
    if (window.confirm('Đăng xuất khỏi thiết bị này?')) {
      try {
        await revokeSession(id);
        setSessions(prev => prev.filter(s => s._id !== id));
      } catch (err) {
        alert('Không thể đăng xuất thiết bị');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 2FA Card */}
      <div className="bg-background-card border border-background-muted rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">Xác thực 2 lớp (2FA)</h4>
              <p className="text-[11px] text-text-muted mt-0.5">Tăng cường bảo mật bằng mã OTP</p>
            </div>
          </div>
          <button 
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${is2FAEnabled ? 'bg-primary' : 'bg-[#262626]'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="bg-[#121212] border border-dashed border-[#262626] rounded-xl p-4">
           <div className="flex items-start gap-3">
             <Fingerprint size={16} className="text-[#4d4d4d] mt-0.5" />
             <p className="text-xs text-text-muted leading-relaxed">
               {is2FAEnabled ? 'Bạn đã kích hoạt 2FA. Mỗi lần đăng nhập sẽ yêu cầu mã OTP.' : 'Chưa kích hoạt. Bạn nên bật 2FA để bảo vệ tài khoản khỏi truy cập trái phép.'}
               <br />
               <span className="text-[10px] text-primary mt-1 block">TODO: Cần tích hợp Google Authenticator API</span>
             </p>
           </div>
        </div>
      </div>

      {/* Sessions Card */}
      <div className="bg-background-card border border-background-muted rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Monitor size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">Phiên đăng nhập</h4>
              <p className="text-[11px] text-text-muted mt-0.5">Các thiết bị đang truy cập tài khoản</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session._id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#171717] transition-colors border border-transparent hover:border-[#262626]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#121212] border border-[#262626] flex items-center justify-center text-[#676767]">
                  {session.device.toLowerCase().includes('phone') ? <Smartphone size={18} /> : <Monitor size={18} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary flex items-center gap-2">
                    {session.device}
                    {session.isCurrent && (
                      <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase tracking-widest font-black">Hiện tại</span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-text-muted flex items-center gap-1">
                      <Globe size={10} /> {session.ip}
                    </span>
                    <span className="text-[10px] text-[#4d4d4d]">•</span>
                    <span className="text-[10px] text-text-muted">
                      {session.isCurrent ? 'Đang hoạt động' : `Hoạt động lần cuối: ${new Date(session.lastActive).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              </div>
              
              {!session.isCurrent && (
                <button 
                  onClick={() => handleRevoke(session._id)}
                  className="p-2 text-text-muted hover:text-status-banned hover:bg-status-banned/10 rounded-lg transition-all"
                  title="Đăng xuất thiết bị"
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>
          ))}
          
          {sessions.length === 0 && !isLoading && (
            <div className="py-8 text-center text-text-muted text-xs italic">
              Không có phiên đăng nhập nào khác.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
