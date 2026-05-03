export type BlacklistType = 'strict' | 'warning';

export interface BlacklistWord {
  _id: string;
  word: string;
  type: BlacklistType;
  isActive: boolean;
  createdAt: string;
}

export interface BlacklistResponse {
  status: string;
  message: string;
  data: {
    words: BlacklistWord[];
  };
}
