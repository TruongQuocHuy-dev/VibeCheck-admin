import { api } from '../../../shared/lib/api'

export async function fetchAdminUsers(page = 1, limit = 20, search = '') {
  const res = await api.get('/admin/users', { params: { page, limit, search } })
  return res.data.data
}

export async function updateAdminUser(id: string, payload: Record<string, unknown>) {
  const res = await api.patch(`/admin/users/${id}`, payload)
  return res.data.data.user
}
