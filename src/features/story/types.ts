export type StoryStatus = 'active' | 'hidden' | 'deleted' | 'expired' | 'pending';

export interface Story {
  _id: string;
  user: {
    _id: string;
    fullName?: string;
    displayName?: string;
    avatar?: string;
    email?: string;
  };
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'text';
  caption: string;
  status: StoryStatus;
  reportCount: number;
  reports: {
    _id: string;
    user: {
      _id: string;
      displayName?: string;
      avatar?: string;
    };
    reason: string;
    createdAt: string;
  }[];
  createdAt: string;
  expiresAt: string;
  remainingTime?: string;
  isExpiringSoon?: boolean;
  location?: any;
}

export interface StoryQueryParams {
  page?: number;
  limit?: number;
  status?: StoryStatus | 'all' | 'reported' | 'expiring-soon';
  sortBy?: string;
}

export interface StoryResponse {
  status: string;
  message: string;
  data: {
    stories: Story[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface StoryStats {
  active: number;
  reported: number;
  expiringSoon: number;
  totalViews: number;
}
