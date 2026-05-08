import type { UserStatus } from '../user/types';

export type AdminRole = 'admin';

export interface Permission {
  id: string;
  label: string;
  description: string;
}

export interface Admin {
  _id: string;
  email: string;
  phone?: string;
  fullName?: string;
  displayName?: string;
  role: AdminRole;
  status: UserStatus;
  createdAt: string;
  permissions?: Permission[];
}

export interface AdminQueryParams {
  page?: number;
  limit?: number;
  status?: UserStatus | 'all';
  search?: string;
  role?: string;
}

export interface AdminResponse {
  status: string;
  message: string;
  data: {
    users: Admin[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateAdminData {
  email: string;
  fullName?: string;
  role: AdminRole;
  tempPassword?: string;
}
