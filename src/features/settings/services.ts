import { api } from '../../shared/lib/api';
import type { AppVersion, BroadcastConfig, MatchingConfig, ConfigHistoryEntry } from './types';

export const fetchAppVersions = async (): Promise<AppVersion[]> => {
  // TODO: GET /admin/settings/versions
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      version: '1.0.0',
      platform: 'both',
      minRequired: true,
      forceUpdate: true,
      notes: 'Initial release',
      createdAt: '2024-01-01T00:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      version: '1.1.0',
      platform: 'ios',
      minRequired: false,
      forceUpdate: false,
      notes: 'Bug fixes',
      createdAt: '2024-02-15T00:00:00Z',
      status: 'active'
    }
  ];
};

export const addAppVersion = async (version: Omit<AppVersion, 'id' | 'createdAt' | 'status'>): Promise<AppVersion> => {
  // TODO: POST /admin/settings/versions
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    ...version,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    status: 'active'
  };
};

export const sendBroadcast = async (config: any): Promise<{ jobId: string }> => {
  // TODO: POST /admin/settings/broadcast
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { jobId: 'job_' + Math.random().toString(36).substr(2, 9) };
};

export const fetchMatchingConfig = async (): Promise<MatchingConfig> => {
  // TODO: GET /admin/settings/matching
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    defaultRadius: 50,
    ageRange: [18, 35],
    allowSameGender: true,
    profileCompletenessThreshold: 60,
    reportThresholdAutoHide: 5,
    lastUpdatedBy: 'Admin Huy',
    lastUpdatedAt: '2024-05-01T10:00:00Z'
  };
};

export const updateMatchingConfig = async (config: Partial<MatchingConfig>): Promise<MatchingConfig> => {
  // TODO: PATCH /admin/settings/matching
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    ...config,
    lastUpdatedBy: 'Admin Huy',
    lastUpdatedAt: new Date().toISOString()
  } as MatchingConfig;
};

export const fetchConfigHistory = async (): Promise<ConfigHistoryEntry[]> => {
  // TODO: GET /admin/settings/matching/history
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: 'h1',
      adminName: 'Admin Huy',
      field: 'Search Radius',
      oldValue: 30,
      newValue: 50,
      timestamp: '2024-05-01T10:00:00Z'
    },
    {
      id: 'h2',
      adminName: 'Admin Huy',
      field: 'Age Range',
      oldValue: '18-25',
      newValue: '18-35',
      timestamp: '2024-04-20T15:30:00Z'
    }
  ];
};
