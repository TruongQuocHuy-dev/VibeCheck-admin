import React, { useState } from 'react';
import type { MatchingConfig } from '../../types';
import { Button } from '../../../../shared/ui/Button';
import { Save, RotateCcw, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ConfigCardProps {
  config: MatchingConfig;
  onSave: (config: Partial<MatchingConfig>) => Promise<void>;
  isUpdating: boolean;
}

export const ConfigCard: React.FC<ConfigCardProps> = ({ config, onSave, isUpdating }) => {
  const [radius, setRadius] = useState(config.defaultRadius);
  const [ageRange, setAgeRange] = useState(config.ageRange);
  const [allowSameGender, setAllowSameGender] = useState(config.allowSameGender);
  const [threshold, setThreshold] = useState(config.profileCompletenessThreshold);
  const [reportLimit, setReportLimit] = useState(config.reportThresholdAutoHide);

  const hasChanges = 
    radius !== config.defaultRadius ||
    ageRange[0] !== config.ageRange[0] ||
    ageRange[1] !== config.ageRange[1] ||
    allowSameGender !== config.allowSameGender ||
    threshold !== config.profileCompletenessThreshold ||
    reportLimit !== config.reportThresholdAutoHide;

  const handleSave = () => {
    onSave({
      defaultRadius: radius,
      ageRange,
      allowSameGender,
      profileCompletenessThreshold: threshold,
      reportThresholdAutoHide: reportLimit,
    });
  };

  const handleReset = () => {
    setRadius(config.defaultRadius);
    setAgeRange(config.ageRange);
    setAllowSameGender(config.allowSameGender);
    setThreshold(config.profileCompletenessThreshold);
    setReportLimit(config.reportThresholdAutoHide);
  };

  return (
    <div className="space-y-6">
      <div className="bg-background-card border border-background-muted rounded-2xl p-6 lg:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-background-muted pb-6">
          <div>
            <h3 className="text-xl font-bold text-text-primary">Tham số Matching</h3>
            <p className="text-sm text-text-secondary">Cấu hình các tham số mặc định cho thuật toán tìm kiếm</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background-muted rounded-lg text-text-secondary">
              <User size={14} />
              <span>{config.lastUpdatedBy}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background-muted rounded-lg text-text-secondary">
              <Clock size={14} />
              <span>{format(new Date(config.lastUpdatedAt), 'HH:mm dd/MM/yyyy', { locale: vi })}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Radius Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-primary">Bán kính mặc định</label>
              <span className="text-sm font-bold text-primary">{radius} km</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={100} 
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider">
              <span>1 km</span>
              <span>100 km</span>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-primary">Yêu cầu hoàn thiện Profile</label>
              <span className="text-sm font-bold text-primary">{threshold}%</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={100} 
              step={5}
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Age Range - Simple Dual Range Mock */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-primary">Độ tuổi mặc định</label>
              <span className="text-sm font-bold text-primary">{ageRange[0]} - {ageRange[1]} tuổi</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Min</p>
                 <input 
                  type="number" 
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                  className="w-full bg-background-muted border border-background-muted rounded-lg px-3 py-2 text-sm text-text-primary"
                 />
               </div>
               <div>
                 <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Max</p>
                 <input 
                  type="number" 
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                  className="w-full bg-background-muted border border-background-muted rounded-lg px-3 py-2 text-sm text-text-primary"
                 />
               </div>
            </div>
          </div>

          {/* Report Threshold */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-primary">Số báo cáo để tự động ẩn</label>
              <span className="text-sm font-bold text-text-error">{reportLimit} lần</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={20} 
              value={reportLimit}
              onChange={(e) => setReportLimit(parseInt(e.target.value))}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer accent-status-banned"
            />
            <div className="flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider">
              <span>1 report</span>
              <span>20 reports</span>
            </div>
          </div>

          {/* Same Gender Matching */}
          <div className="flex items-center justify-between p-5 bg-background-muted rounded-2xl md:col-span-2">
            <div>
              <p className="text-base font-bold text-text-primary">Cho phép matching cùng giới tính</p>
              <p className="text-xs text-text-secondary mt-1">Bật tính năng này để cho phép hiển thị các đối tượng cùng giới tính trong feed mặc định</p>
            </div>
            <button
              onClick={() => setAllowSameGender(!allowSameGender)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                allowSameGender ? 'bg-primary' : 'bg-[#262626]'
              }`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                allowSameGender ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-background-muted">
          <Button 
            variant="secondary" 
            className="gap-2" 
            disabled={!hasChanges || isUpdating}
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Hủy thay đổi
          </Button>
          <Button 
            variant="primary" 
            className="gap-2 px-8" 
            disabled={!hasChanges || isUpdating}
            isLoading={isUpdating}
            onClick={handleSave}
          >
            <Save size={16} />
            Lưu cấu hình
          </Button>
        </div>
      </div>
    </div>
  );
};
