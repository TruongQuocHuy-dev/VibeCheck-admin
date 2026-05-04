export type Platform = 'ios' | 'android' | 'both';
export type BroadcastStatus = 'pending' | 'sending' | 'sent' | 'failed';

export interface AppVersion {
  id: string;
  version: string;
  platform: Platform;
  minRequired: boolean;
  forceUpdate: boolean;
  notes: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface BroadcastTarget {
  type: 'all' | 'new_users' | 'inactive' | 'location' | 'segment';
  days?: number;
  location?: string;
  segment?: string;
}

export interface BroadcastConfig {
  id: string;
  title: string;
  body: string;
  mediaUrl?: string;
  deepLink?: string;
  target: BroadcastTarget;
  scheduledAt?: string;
  status: BroadcastStatus;
  estimatedReach: number;
  createdAt: string;
}

export interface MatchingConfig {
  defaultRadius: number; // 1-100
  ageRange: [number, number]; // 18-80
  allowSameGender: boolean;
  profileCompletenessThreshold: number; // 0-100
  reportThresholdAutoHide: number; // 1-10
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

export interface ConfigHistoryEntry {
  id: string;
  adminName: string;
  field: string;
  oldValue: string | number | boolean;
  newValue: string | number | boolean;
  timestamp: string;
}
