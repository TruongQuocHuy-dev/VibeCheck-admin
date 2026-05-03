import { api } from '../../shared/lib/api';
import type { Report, ReportQueryParams, ReportResponse, ResolveReportPayload } from './types';

export const getReports = async (params: ReportQueryParams): Promise<ReportResponse['data']> => {
  const { data } = await api.get<ReportResponse>('/admin/reports', { params });
  return data.data;
};

export const getReportDetail = async (id: string): Promise<Report> => {
  const { data } = await api.get<{ data: Report }>(`/admin/reports/${id}`);
  return data.data;
};

export const resolveReport = async (id: string, payload: ResolveReportPayload) => {
  const { data } = await api.patch(`/admin/reports/${id}/resolve`, payload);
  return data;
};
