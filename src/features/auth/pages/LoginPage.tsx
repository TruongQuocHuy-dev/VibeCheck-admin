import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { queryClient } from '../../../app/providers'
import { api } from '../../../shared/lib/api'
import { setAuthToken } from '../../../shared/lib/auth'

type LocationState = {
  from?: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const from = (location.state as LocationState | null)?.from ?? '/admin'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedPhone = phone.trim()
    const normalizedPassword = password.trim()

    if (!normalizedPhone || !normalizedPassword) {
      setErrorMessage('Vui lòng nhập đầy đủ số điện thoại và mật khẩu.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const response = await api.post('/auth/login', {
        phone: normalizedPhone,
        password: normalizedPassword,
      })

      const accessToken = response.data?.data?.accessToken as string | undefined
      const userRole = response.data?.data?.user?.role as string | undefined

      if (!accessToken) {
        setErrorMessage('Không nhận được access token từ máy chủ.')
        return
      }

      if (userRole && userRole !== 'admin' && userRole !== 'mod') {
        setErrorMessage('Tài khoản này không có quyền truy cập admin.')
        return
      }

      console.log('Login success — setting token, from=', from)
      setAuthToken(accessToken)
      queryClient.clear()
      navigate(from, { replace: true })
    } catch (error) {
      const responseMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Đăng nhập không thành công. Kiểm tra lại số điện thoại và mật khẩu.'

      setErrorMessage(responseMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 text-text-primary md:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full gap-6 rounded-[2rem] border border-background-muted bg-background-card/90 p-6 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary-soft/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-soft">
              Admin access gate
            </div>
            <div className="space-y-3">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">
                Sign in with the admin account to enter `/admin`.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-text-secondary md:text-base">
                Use one of the seeded management accounts and the panel will
                store the returned JWT as `vibe_token` automatically.
              </p>
            </div>

            <ul className="grid gap-3 text-sm text-text-secondary md:grid-cols-3">
              <li className="rounded-2xl border border-background-muted bg-black/20 p-4">JWT saved to <span className="font-medium text-text-primary">localStorage</span>.</li>
              <li className="rounded-2xl border border-background-muted bg-black/20 p-4">Requests attach <span className="font-medium text-text-primary">Bearer</span> automatically.</li>
              <li className="rounded-2xl border border-background-muted bg-black/20 p-4">React Query cache is ready for admin data.</li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-background-muted bg-background/80 p-5"
          >
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Admin credentials</h2>
              <p className="text-sm text-text-secondary">
                Sign in with the phone number and password of an admin account.
              </p>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-text-secondary">Phone</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+84990000001"
                className="w-full rounded-2xl border border-background-muted bg-black/30 px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-text-secondary">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin@12345"
                className="w-full rounded-2xl border border-background-muted bg-black/30 px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            {errorMessage ? (
              <div className="rounded-2xl border border-status-banned/30 bg-status-banned/10 px-4 py-3 text-sm text-status-banned">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}