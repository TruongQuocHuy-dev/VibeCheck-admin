import React, { useState } from 'react'
import { useAdminUsers, useUpdateAdminUser } from '../hooks/useAdminUsers'
import { Card, Button } from '../../../../shared/ui'

export function AdminUsersPage() {
  const [page] = useState(1)
  const { data, isLoading, error } = useAdminUsers(page, 20, '')
  const update = useUpdateAdminUser()

  if (isLoading) return <div>Loading users...</div>
  if (error) return <div>Error loading users</div>

  const users = data?.users ?? []

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin — User Management</h2>
      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>ID</th>
              <th style={{ textAlign: 'left' }}>Phone / Email</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'left' }}>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u._id}>
                <td style={{ padding: 8 }}>{u._id}</td>
                <td style={{ padding: 8 }}>{u.phone ?? u.email}</td>
                <td style={{ padding: 8 }}>{u.displayName ?? u.fullName ?? '—'}</td>
                <td style={{ padding: 8 }}>{u.role}</td>
                <td style={{ padding: 8 }}>
                  <select defaultValue={u.role} onChange={(e) => update.mutate({ id: u._id, payload: { role: e.target.value } })}>
                    <option value="user">user</option>
                    <option value="mod">mod</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
