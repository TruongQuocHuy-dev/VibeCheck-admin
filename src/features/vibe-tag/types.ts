export type ColorType = 'cyan' | 'pink';

export interface VibeTag {
  _id: string;
  label: string;
  emoji: string;
  colorType: ColorType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VibeTagQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  colorType?: ColorType | 'all';
  status?: 'active' | 'inactive' | 'all';
}

export interface VibeTagResponse {
  status: string;
  data: {
    tags: VibeTag[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateVibeTagDTO {
  label: string;
  emoji: string;
  colorType: ColorType;
}

export interface UpdateVibeTagDTO {
  label?: string;
  emoji?: string;
  colorType?: ColorType;
  isActive?: boolean;
}
