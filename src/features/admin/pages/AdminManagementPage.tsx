import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { AdminTable } from '../components/AdminTable';
import { RoleAssignmentDialog } from '../components/RoleAssignmentDialog';
import { DeleteAdminDialog } from '../components/DeleteAdminDialog';
import { useAdmins } from '../hooks/useAdmins';
import { useUpdateAdminRole } from '../hooks/useUpdateAdminRole';
import { deleteAdmin } from '../services';
import type { Admin } from '../types';
import { Button } from '../../../shared/ui/Button';

export function AdminManagementPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '10');
  
  const { data, isLoading, refetch } = useAdmins({ page, limit, search });
  const updateRoleMutation = useUpdateAdminRole();
  
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('search', e.target.value);
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleEditRole = (admin: Admin) => setEditingAdmin(admin);
  const handleDeleteClick = (admin: Admin) => setDeletingAdmin(admin);

  const handleConfirmRoleChange = async (role: string) => {
    if (!editingAdmin) return;
    await updateRoleMutation.mutateAsync({ adminId: editingAdmin._id, role });
    setEditingAdmin(null);
  };

  const handleConfirmDelete = async (transferToAdminId?: string) => {
    if (!deletingAdmin) return;
    setIsDeleting(true);
    try {
      await deleteAdmin(deletingAdmin._id, transferToAdminId);
      await refetch();
      setDeletingAdmin(null);
    } catch (e) {
      console.error('Delete failed', e);
    } finally {
      setIsDeleting(false);
    }
  };

  const availableAdmins = data?.users || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Quản trị viên</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Quản lý tài khoản quản trị và phân quyền hệ thống.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm admin..."
              className="w-full rounded-2xl border border-background-muted bg-background-card/50 pl-10 pr-4 py-2 text-sm text-text-primary outline-none focus:border-primary transition"
            />
          </div>
          <Button variant="primary" className="shrink-0" onClick={() => {/* Open Create Admin Modal */}}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm Admin
          </Button>
        </div>
      </div>

      <AdminTable
        admins={availableAdmins}
        isLoading={isLoading}
        currentUserId={user?._id}
        onEditRole={handleEditRole}
        onDeleteAdmin={handleDeleteClick}
      />

      <RoleAssignmentDialog
        admin={editingAdmin}
        isOpen={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onConfirm={handleConfirmRoleChange}
        isSubmitting={updateRoleMutation.isPending}
      />

      <DeleteAdminDialog
        admin={deletingAdmin}
        isOpen={!!deletingAdmin}
        onClose={() => setDeletingAdmin(null)}
        onConfirm={handleConfirmDelete}
        isSubmitting={isDeleting}
        availableAdmins={availableAdmins}
      />
    </div>
  );
}
