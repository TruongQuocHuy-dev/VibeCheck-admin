export type UserStatus = 'active' | 'banned';
export type UserRole = 'user' | 'admin' | 'mod';

export interface User {
  _id: string;
  phone: string;
  email?: string;
  fullName?: string;
  displayName?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  location?: { 
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: string;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  status?: UserStatus | 'all';
  search?: string;
}

export interface UserResponse {
  status: string;
  message: string;
  data: {
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
