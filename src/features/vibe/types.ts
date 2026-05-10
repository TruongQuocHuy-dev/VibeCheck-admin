export type VibeStatus = 'active' | 'hidden' | 'deleted' | 'pending';

export interface VibeReport {
  _id: string;
  user: {
    _id: string;
    fullName?: string;
    displayName?: string;
    avatar?: string;
  };
  reason: string;
  createdAt: string;
}

export interface Vibe {
  _id: string;
  user: {
    _id: string;
    fullName?: string;
    displayName?: string;
    avatar?: string;
  };
  caption: string;
  media: {
    type: 'image' | 'video';
    url: string;
  }[];
  status: VibeStatus;
  reports: VibeReport[];
  createdAt: string;
}

export interface VibeQueryParams {
  page?: number;
  limit?: number;
  status?: VibeStatus | 'all' | 'reported';
  search?: string;
}

export interface VibeResponse {
  status: string;
  message: string;
  data: {
    vibes: Vibe[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
