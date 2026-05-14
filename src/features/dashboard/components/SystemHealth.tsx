import { Server, Database, Clock, ShieldCheck } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Card } from '../../../shared/ui/Card'
import type { SystemHealth as SystemHealthType } from '../types'

type SystemHealthProps = {
  health: SystemHealthType
}

export function SystemHealth({ health }: SystemHealthProps) {
  return (
    <Card className="p-6 bg-background-card border border-background-muted shadow-sm h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-1">Tình trạng hệ thống</h2>
        <p className="text-sm text-text-secondary mb-6">Trạng thái hoạt động của các dịch vụ cốt lõi.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-background-muted/20">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${health.serverStatus === 'online' ? 'bg-status-active/20 text-status-active' : 'bg-status-banned/20 text-status-banned'}`}>
              <Server size={18} />
            </div>
            <span className="text-sm font-medium text-text-primary">Server API</span>
          </div>
          <span className={`text-sm font-semibold ${health.serverStatus === 'online' ? 'text-status-active' : 'text-status-banned'}`}>
            {health.serverStatus === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-background-muted/20">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${health.dbConnection === 'connected' ? 'bg-primary/20 text-primary' : 'bg-status-pending/20 text-status-pending'}`}>
              <Database size={18} />
            </div>
            <span className="text-sm font-medium text-text-primary">Database</span>
          </div>
          <span className={`text-sm font-semibold ${health.dbConnection === 'connected' ? 'text-primary' : 'text-status-pending'}`}>
            {health.dbConnection === 'connected' ? 'Connected' : health.dbConnection}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-background-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-text-secondary/10 text-text-secondary">
              <Clock size={18} />
            </div>
            <span className="text-sm font-medium text-text-primary">Last Backup</span>
          </div>
          <span className="text-sm text-text-secondary">
            {formatDistanceToNow(new Date(health.lastBackup), { addSuffix: true, locale: vi })}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-background-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-pending/20 text-status-pending">
              <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-medium text-text-primary">Active Admins</span>
          </div>
          <span className="text-sm font-semibold text-text-primary">{health.activeAdmins}</span>
        </div>
      </div>
    </Card>
  )
}
