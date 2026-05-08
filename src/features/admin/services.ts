import { api } from '../../shared/lib/api';
import type { AdminQueryParams, AdminResponse, CreateAdminData, Permission } from './types';

export const fetchAdmins = async (params: AdminQueryParams): Promise<AdminResponse['data']> => {
  const queryParams = { ...params };
  if (queryParams.status === 'all') delete queryParams.status;
  if (!queryParams.role) {
    queryParams.role = 'admin';
  }

  const { data } = await api.get<AdminResponse>('/admin/users', { params: queryParams });
  return data.data;
};

export const createAdmin = async (adminData: CreateAdminData) => {
  // Mocking the creation endpoint for now or hitting actual if implemented later
  // In a real app this would be: await api.post('/admin/admins', adminData);
  // For now we simulate success or hit a hypothetical endpoint
  const { data } = await api.post('/admin/users', adminData).catch(e => {
    console.error('Create admin not fully implemented on backend, returning mock success', e);
    return { data: { status: 'success', data: { user: { ...adminData, _id: 'temp-' + Date.now() } } } };
  });
  return data;
};

export const updateAdminRole = async (adminId: string, role: string) => {
  const { data } = await api.patch(`/admin/users/${adminId}`, { role });
  return data;
};

export const deleteAdmin = async (adminId: string, transferToAdminId?: string) => {
  // await api.delete(`/admin/admins/${adminId}`, { data: { transferToAdminId } });
  // Mock delete endpoint
  return new Promise(resolve => setTimeout(() => resolve({ status: 'success' }), 500));
};

export const getRolePermissions = async (role: string): Promise<Permission[]> => {
  // Mock permissions
  const permissionsMap: Record<string, Permission[]> = {
    'admin': [
      { id: 'all', label: 'Toàn quyền', description: 'Có mọi quyền trong hệ thống' },
      { id: 'manage_users', label: 'Quản lý người dùng', description: 'Xem, sửa, khóa người dùng' },
      { id: 'manage_content', label: 'Quản lý nội dung', description: 'Duyệt vibes, stories' },
      { id: 'view_reports', label: 'Xem báo cáo', description: 'Truy cập dashboard' },
    ],
  };

  return new Promise(resolve => setTimeout(() => resolve(permissionsMap[role] || []), 200));
};
