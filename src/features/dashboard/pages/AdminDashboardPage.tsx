import { useNavigate } from 'react-router-dom'
import { clearAuthToken, getAuthToken } from '../../../shared/lib/auth'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const token = getAuthToken()

  function handleSignOut() {
    clearAuthToken()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen px-4 py-8 text-text-primary md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-background-muted bg-background-card/90 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-full border border-status-active/30 bg-status-active/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-status-active">
                Admin shell ready
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Route guard passed, query client and axios are live.
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-text-secondary md:text-base">
                This page is the protected landing zone for `/admin`. Replace the
                placeholder blocks below with feature folders as real admin flows
                land.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center rounded-2xl border border-background-muted bg-black/20 px-4 py-3 text-sm font-semibold text-text-primary transition hover:border-status-banned hover:text-status-banned"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border border-background-muted bg-background-card p-5">
            <p className="text-sm font-medium text-text-secondary">Session</p>
            <p className="mt-2 break-all text-sm text-text-primary">
              {token ? token.slice(0, 16).concat('…') : 'No token found'}
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-background-muted bg-background-card p-5">
            <p className="text-sm font-medium text-text-secondary">API base URL</p>
            <p className="mt-2 text-sm text-text-primary">{apiBaseUrl}</p>
          </article>
          <article className="rounded-[1.5rem] border border-background-muted bg-background-card p-5">
            <p className="text-sm font-medium text-text-secondary">Query cache</p>
            <p className="mt-2 text-sm text-text-primary">Enabled with sane defaults for stale and retry behavior.</p>
          </article>
        </section>
      </div>
    </main>
  )
}