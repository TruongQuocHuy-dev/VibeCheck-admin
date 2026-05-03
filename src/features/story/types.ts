export interface Story {
  _id: string;
  user: {
    _id: string;
    fullName?: string;
    displayName?: string;
    avatar?: string;
  };
  mediaUrl: string;
  mediaType: 'image' | 'video';
  reports: {
    _id: string;
    user: string;
    reason: string;
    createdAt: string;
  }[];
  isFeatured?: boolean;
  createdAt: string;
  expiresAt: string;
}

export interface StoryQueryParams {
  reported?: boolean;
  featured?: boolean;
}

export interface StoryResponse {
  status: string;
  message: string;
  data: {
    stories: Story[];
  };
}
