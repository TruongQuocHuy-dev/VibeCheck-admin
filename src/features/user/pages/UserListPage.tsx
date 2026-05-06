import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { useBanUser } from '../hooks/useBanUser';
import { UserTable } from '../components/UserTable';
import { SearchFilter } from '../components/SearchFilter';
import { BanDialog } from '../components/BanDialog';
import type { User, UserStatus } from '../types';

export function UserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');
  const status = (searchParams.get('status') || 'all') as UserStatus | 'all';
  const search = searchParams.get('search') || '';

  const { data, isLoading } = useUsers({ page, limit, status, search });
  const banMutation = useBanUser();

  const handleParamChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const handleBan = async (reason: string) => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === 'active' ? 'banned' : 'active';
    
    try {
      await banMutation.mutateAsync({
        userId: selectedUser._id,
        status: newStatus,
        reason,
      });
      setSelectedUser(null);
      // TODO: Implement Toast success
      console.log('Success: User status updated');
    } catch (error: any) {
      // TODO: Handle 403, 500 error Toast
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Quản lý người dùng</h1>
        <p className="mt-2 text-text-secondary">
          Xem danh sách, tìm kiếm và kiểm soát trạng thái hoạt động của người dùng hệ thống.
        </p>
      </div>

      <SearchFilter
        search={search}
        status={status}
        onSearchChange={(v) => handleParamChange('search', v)}
        onStatusChange={(v) => handleParamChange('status', v)}
      />

      <UserTable
        users={data?.users || []}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        onPageChange={(p) => handleParamChange('page', String(p))}
        onAction={(user) => setSelectedUser(user)}
      />

      {selectedUser && (
        <BanDialog
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onConfirm={handleBan}
          isSubmitting={banMutation.isPending}
        />
      )}
    </div>
  );
}
