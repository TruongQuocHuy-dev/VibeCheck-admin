import React from 'react';
import { toast } from 'react-hot-toast';
import { useAnalytics } from '../hooks/useAnalytics';
import { useDateRange } from '../hooks/useDateRange';
import { useExportReport } from '../hooks/useExportReport';
import { StatsOverview } from '../components/StatsOverview';
import { DateRangePicker } from '../components/DateRangePicker';
import { ExportButton } from '../components/ExportButton';
import { GrowthChart } from '../components/GrowthChart';
import { ActivityMetrics } from '../components/ActivityMetrics';
import { SafetyChart } from '../components/SafetyChart';
import { RetentionChart } from '../components/RetentionChart';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';

export const AnalyticsPage: React.FC = () => {
  const { from, to, granularity, setRange, setPreset } = useDateRange();
  const { data, isLoading, isError, refetch } = useAnalytics({ from, to, granularity });
  const { exportCSV, exportPDF } = useExportReport();

  const handleExportCSV = () => {
    if (!data) return;
    
    const exportData = [
      // Header for metrics
      { 'Chỉ số': 'Người dùng mới', 'Giá trị': data.metrics.newUsers.value, 'Xu hướng': data.metrics.newUsers.trend },
      { 'Chỉ số': 'DAU', 'Giá trị': data.metrics.dau.value, 'Xu hướng': data.metrics.dau.trend },
      { 'Chỉ số': 'Báo cáo', 'Giá trị': data.metrics.reports.value, 'Xu hướng': data.metrics.reports.trend },
      {}, // Empty row separator
      { 'Ngày': '--- Dữ liệu tăng trưởng ---', 'Người dùng mới': '' },
      ...data.charts.growth.map(d => ({
        'Ngày': d.date,
        'Người dùng mới': d.users,
      }))
    ];
    
    exportCSV(exportData, `vibecheck-analytics-${from}-to-${to}`);
  };

  const handleExportPDF = () => {
    exportPDF('analytics-content', `vibecheck-report-${from}-to-${to}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Đã sao chép liên kết báo cáo!');
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Thống kê & Phân tích</h1>
          <p className="text-text-secondary text-sm mt-1">Theo dõi các chỉ số tăng trưởng và sức khỏe hệ thống</p>
        </div>
        <ExportButton 
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          onCopyLink={handleCopyLink}
        />
      </div>

      <div className="bg-background-card border border-background-muted rounded-xl p-4 sticky top-0 z-20 shadow-lg backdrop-blur-md bg-background-card/80">
        <DateRangePicker 
          from={from}
          to={to}
          granularity={granularity}
          onPresetChange={setPreset}
          onGranularityChange={(g) => setRange(from, to, g)}
          onCustomRangeChange={(f, t) => setRange(f, t)}
        />
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-20 bg-background-card border border-background-muted rounded-xl">
          <AlertCircle size={48} className="text-text-error mb-4" />
          <h3 className="text-lg font-semibold text-text-primary">Không thể tải dữ liệu thống kê</h3>
          <p className="text-text-secondary mb-6 text-center max-w-md">Đã có lỗi xảy ra khi kết nối với máy chủ. Vui lòng thử lại sau.</p>
          <Button onClick={() => refetch()} variant="secondary" className="gap-2">
            <RefreshCcw size={16} />
            Thử lại ngay
          </Button>
        </div>
      ) : (
        <div id="analytics-content" className="space-y-6">
          <StatsOverview data={data?.metrics} isLoading={isLoading} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GrowthChart data={data?.charts.growth || []} granularity={granularity} />
            <ActivityMetrics data={data?.charts.activity || { dauMauRatio: 0, totalMatches: 0, messagesSent: 0, avgSessionDuration: '0m' }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SafetyChart data={data?.charts.safety || []} granularity={granularity} />
            <RetentionChart data={data?.charts.retention || []} />
          </div>
        </div>
      )}
    </div>
  );
};
