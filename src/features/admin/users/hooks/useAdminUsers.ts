import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAdminUsers, updateAdminUser } from '../services'

export function useAdminUsers(page = 1, limit = 20, search = '') {
  return useQuery(['admin-users', page, limit, search], () => fetchAdminUsers(page, limit, search))
}

export function useUpdateAdminUser() {
  const qc = useQueryClient()
  return useMutation((vars: { id: string; payload: Record<string, unknown> }) => updateAdminUser(vars.id, vars.payload), {
    onSuccess: () => qc.invalidateQueries(['admin-users']),
  })
}
