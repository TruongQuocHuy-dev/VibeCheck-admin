export type ReportType = 'user' | 'vibe' | 'story' | 'all';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';
export type ReportPriority = 'high' | 'normal';
export type ResolveAction = 'dismiss' | 'warning' | 'content_deleted' | 'user_banned';

export interface Report {
  _id: string;
  type: ReportType;
  reporter: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
  targetId: string;
  targetType: ReportType;
  targetData?: any;
  reason: string;
  description?: string;
  priority: ReportPriority;
  status: ReportStatus;
  evidence: string[];
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
  createdAt: string;
}

export interface ReportQueryParams {
  status?: ReportStatus;
  type?: ReportType;
  priority?: ReportPriority;
  page?: number;
  limit?: number;
}

export interface ReportResponse {
  status: string;
  data: {
    reports: Report[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ResolveReportPayload {
  action: ResolveAction;
  note?: string;
  targetAction?: boolean;
}
