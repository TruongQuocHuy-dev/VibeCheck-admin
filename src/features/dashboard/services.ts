import { api } from '../../shared/lib/api'
import type { DashboardStats, RecentActivityItem, RecentActivityKind } from './types'

type ApiRecord = Record<string, unknown>

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function toArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[]
  }

  if (!isRecord(payload)) {
    return []
  }

  const candidates = [
    payload.data,
    payload.items,
    payload.results,
    payload.users,
    payload.vibes,
    payload.reports,
  ]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as T[]
    }
  }

  if (isRecord(payload.data) && Array.isArray(payload.data.items)) {
    return payload.data.items as T[]
  }

  return []
}

function toNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function toText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function pickTimestamp(record: ApiRecord) {
  const candidates = [
    record.timestamp,
    record.createdAt,
    record.updatedAt,
    record.lastActiveAt,
    record.lastLoginAt,
    record.reportedAt,
    record.submittedAt,
    record.time,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && !Number.isNaN(Date.parse(candidate))) {
      return candidate
    }
  }

  return new Date().toISOString()
}

function getDayKey(value: string) {
  return new Date(value).toLocaleDateString('en-CA')
}

function sortByTimestampDesc(left: RecentActivityItem, right: RecentActivityItem) {
  return Date.parse(right.timestamp) - Date.parse(left.timestamp)
}

function normalizeActivities(items: RecentActivityItem[]) {
  return items.sort(sortByTimestampDesc).slice(0, 12)
}

function buildActivityFromUsers(users: ApiRecord[]) {
  return users.slice(0, 6).map<RecentActivityItem>((user, index) => {
    const timestamp = pickTimestamp(user)
    const status = toText(user.status, 'active')
    const label = toText(user.name ?? user.email, `User ${index + 1}`)

    return {
      id: `${toText(user._id ?? user.id, `user-${index}`)}`,
      title: label,
      description: status === 'banned' ? 'Account was flagged or suspended' : 'Account is active and available',
      timestamp,
      kind: 'user',
      tone: status === 'banned' ? 'danger' : 'success',
    }
  })
}

function buildActivityFromVibes(vibes: ApiRecord[]) {
  return vibes.slice(0, 6).map<RecentActivityItem>((vibe, index) => {
    const timestamp = pickTimestamp(vibe)
    const status = toText(vibe.status ?? vibe.moderationStatus, 'published')
    const title = toText(vibe.title ?? vibe.name, `Vibe ${index + 1}`)

    return {
      id: `${toText(vibe._id ?? vibe.id, `vibe-${index}`)}`,
      title,
      description:
        status === 'reported'
          ? 'Content was reported by the community'
          : 'New vibe event captured in the moderation stream',
      timestamp,
      kind: 'vibe',
      tone: status === 'reported' ? 'warning' : 'primary',
    }
  })
}

function buildActivityFromReports(reports: ApiRecord[]) {
  return reports.slice(0, 6).map<RecentActivityItem>((report, index) => {
    const timestamp = pickTimestamp(report)
    const status = toText(report.status ?? report.state, 'pending')
    const target = toText(report.reason ?? report.title ?? report.target, `Report ${index + 1}`)

    return {
      id: `${toText(report._id ?? report.id, `report-${index}`)}`,
      title: target,
      description:
        status === 'resolved'
          ? 'Report has been reviewed and closed'
          : 'Report is waiting for moderation follow-up',
      timestamp,
      kind: 'report',
      tone: status === 'resolved' ? 'success' : 'warning',
    }
  })
}

function getApiStatsResponse(payload: unknown) {
  if (!isRecord(payload)) {
    return null
  }

  const stats = isRecord(payload.stats) ? payload.stats : payload

  if (
    typeof stats.totalUsers === 'number' ||
    typeof stats.activeToday === 'number' ||
    typeof stats.reportedVibes === 'number' ||
    typeof stats.pendingReports === 'number'
  ) {
    return stats as ApiRecord
  }

  return null
}

function buildStatsFromCollections(users: ApiRecord[], vibes: ApiRecord[], reports: ApiRecord[]): DashboardStats {
  const today = new Date().toLocaleDateString('en-CA')

  const totalUsers = users.length
  const activeToday = users.filter((user) => {
    const timestamp = pickTimestamp(user)
    const status = toText(user.status, 'active')
    return status === 'active' && getDayKey(timestamp) === today
  }).length

  const reportedVibes = vibes.filter((vibe) => {
    const status = toText(vibe.status ?? vibe.moderationStatus, '')
    const reportCount = toNumber(vibe.reportCount ?? vibe.reportsCount ?? vibe.flagsCount, 0)
    return status === 'reported' || reportCount > 0 || vibe.reported === true
  }).length

  const pendingReports = reports.filter((report) => {
    const status = toText(report.status ?? report.state, 'pending')
    return ['pending', 'open', 'new', 'queued'].includes(status)
  }).length

  const recentActivity = normalizeActivities([
    ...buildActivityFromUsers(users),
    ...buildActivityFromVibes(vibes),
    ...buildActivityFromReports(reports),
  ])

  return {
    totalUsers,
    activeToday,
    reportedVibes,
    pendingReports,
    recentActivity,
    lastUpdated: new Date().toISOString(),
  }
}

function normalizeStatsFromApi(stats: ApiRecord): DashboardStats {
  const recentActivity = normalizeActivities(
    toArray<ApiRecord>(stats.recentActivity ?? stats.activities).map((item, index) => {
      const timestamp = pickTimestamp(item)
      const kind = toText(item.kind, 'user') as RecentActivityKind

      return {
        id: toText(item._id ?? item.id, `activity-${index}`),
        title: toText(item.title ?? item.label, 'Recent activity'),
        description: toText(item.description, 'Latest moderation update'),
        timestamp,
        kind,
        tone: (toText(item.tone, 'neutral') as DashboardStats['recentActivity'][number]['tone']) ?? 'neutral',
      }
    }),
  )

  return {
    totalUsers: toNumber(stats.totalUsers ?? stats.usersCount),
    activeToday: toNumber(stats.activeToday ?? stats.activeUsersToday),
    reportedVibes: toNumber(stats.reportedVibes ?? stats.reportedCount),
    pendingReports: toNumber(stats.pendingReports ?? stats.pendingReportsCount),
    recentActivity,
    lastUpdated: toText(stats.lastUpdated ?? stats.updatedAt, new Date().toISOString()),
  }
}

async function fetchDashboardStatsFromApi() {
  const { data } = await api.get('/admin/stats')
  const stats = getApiStatsResponse(data)

  if (stats) {
    return normalizeStatsFromApi(stats)
  }

  return null
}

async function fetchDashboardStatsFallback() {
  // Fallback: call available endpoints individually and tolerate 404/other errors.
  // This avoids Promise.all failing when some admin endpoints are not exposed.
  let users: ApiRecord[] = []
  let vibes: ApiRecord[] = []
  let reports: ApiRecord[] = []

  try {
    const resp = await api.get('/users')
    users = toArray<ApiRecord>(resp.data)
  } catch (err) {
    // ignore - endpoint may not exist for non-admin backends
    users = []
  }

  try {
    const resp = await api.get('/vibes')
    vibes = toArray<ApiRecord>(resp.data)
  } catch (err) {
    vibes = []
  }

  try {
    const resp = await api.get('/reports')
    reports = toArray<ApiRecord>(resp.data)
  } catch (err) {
    reports = []
  }

  return buildStatsFromCollections(users, vibes, reports)
}

export async function fetchDashboardStats() {
  try {
    const stats = await fetchDashboardStatsFromApi()

    if (stats) {
      return stats
    }
  } catch {
    // Fallback below.
  }

  return fetchDashboardStatsFallback()
}