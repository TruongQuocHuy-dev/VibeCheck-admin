import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Card } from '../../../shared/ui/Card'
import type { RecentActivityItem } from '../types'

type ActivityTableProps = {
  items: RecentActivityItem[]
}

const statusColor = {
  completed: 'text-status-active bg-status-active/10',
  pending: 'text-status-pending bg-status-pending/10',
  failed: 'text-status-banned bg-status-banned/10',
}

const statusText = {
  completed: 'Hoàn thành',
  pending: 'Chờ duyệt',
  failed: 'Thất bại',
}

export function ActivityTable({ items }: ActivityTableProps) {
  return (
    <Card className="flex flex-col overflow-hidden bg-background-card shadow-sm border border-background-muted">
      <div className="p-5 border-b border-background-muted">
        <h2 className="text-xl font-semibold text-text-primary">Hoạt động gần đây</h2>
        <p className="mt-1 text-sm text-text-secondary">Các hành động quản trị, báo cáo và đăng ký mới nhất.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-background-muted/30 text-xs uppercase text-text-secondary">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Thời gian</th>
              <th scope="col" className="px-6 py-4 font-medium">Loại</th>
              <th scope="col" className="px-6 py-4 font-medium">Người dùng</th>
              <th scope="col" className="px-6 py-4 font-medium">Hành động</th>
              <th scope="col" className="px-6 py-4 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-background-muted">
            {items.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-background-muted/10 cursor-pointer">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-text-primary">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: vi })}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {item.type === 'admin_action' ? 'Quản trị' : item.type === 'new_user' ? 'Người dùng mới' : 'Báo cáo'}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {item.user}
                </td>
                <td className="px-6 py-4 max-w-[200px] truncate" title={item.action}>
                  {item.action}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[item.status]}`}>
                    {statusText[item.status]}
                  </span>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">
                  Không có hoạt động nào gần đây.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
