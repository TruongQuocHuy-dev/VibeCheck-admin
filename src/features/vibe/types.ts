export type VibeStatus = 'active' | 'hidden' | 'deleted' | 'pending';

export interface Vibe {
  _id: string;
  photos: string[];
  status: VibeStatus;
  createdAt: string;
  user: {
    _id: string;
    fullName: string;
    displayName?: string;
    avatar?: string;
    gender?: string;
    birthYear?: number;
    bio?: string;
    vibeTags?: string[];
  };
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
  };
}

export interface VibeStats {
  totalVibes: number;
  activeVibes: number;
  hiddenVibes: number;
  pendingVibes: number;
  reportedVibes: number;
}
