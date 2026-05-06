export interface AdminProfile {
  _id: string;
  email: string;
  fullName: string;
  displayName?: string;
  avatarUrl?: string;
  role: 'admin' | 'mod';
  status: 'active' | 'banned';
  createdAt: string;
  lastLogin?: {
    time: string;
    ip: string;
  };
}

export interface UpdateProfilePayload {
  fullName: string;
  avatarUrl?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AdminSession {
  _id: string;
  device: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ActivityLog {
  _id: string;
  timestamp: string;
  action: string;
  target: string;
  ip: string;
  details?: string;
}
