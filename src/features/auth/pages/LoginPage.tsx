import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn, ShieldCheck } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { api } from '../../../shared/lib/api'
import { useAuth } from '../../../shared/hooks/useAuth'

type LocationState = {
  from?: string
}

const AUTH_TOKEN_KEY = 'vibe_token'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()
  
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({})

  const from = (location.state as LocationState | null)?.from ?? '/admin'

  // Logic 1: Nếu đã login, tự động redirect về /admin
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, user, navigate, from])

  const validate = () => {
    const newErrors: { phone?: string; password?: string } = {}
    if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại hoặc email'
    if (!password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu'
    if (password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    try {
      setIsSubmitting(true)
      
      const response = await api.post('/auth/login', {
        phone: phone.trim(),
        password: password.trim(),
      })

      const { accessToken, user: userData } = response.data?.data || {}

      if (!accessToken) {
        toast.error('Không nhận được mã xác thực từ hệ thống.')
        return
      }

      // Kiểm tra quyền truy cập admin/mod
      if (userData?.role !== 'admin' && userData?.role !== 'mod') {
        toast.error('Tài khoản này không có quyền truy cập hệ thống quản trị.')
        return
      }

      // Lưu token (Dùng localStorage theo yêu cầu đồng bộ Mobile)
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken)
      
      toast.success('Đăng nhập thành công! Đang chuyển hướng...')
      
      // Chuyển hướng sau một khoảng trễ ngắn để user thấy feedback thành công
      setTimeout(() => {
        navigate(from, { replace: true })
        // Reload nhẹ để reset auth state
        window.location.reload()
      }, 800)
      
    } catch (error: any) {
      console.error('Login error:', error)
      const message = error.response?.data?.message || 'Sai thông tin đăng nhập. Vui lòng thử lại.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0f0f11] px-4 py-12">
      {/* Background Decor: Ambient Gradients */}
      <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">VibeCheck Admin</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Hệ thống quản trị nội dung & điều hành cộng đồng
          </p>
        </div>

        {/* Login Card with Glassmorphism */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-background-card/40 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="p-8 md:p-10">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-xl font-semibold text-white">Đăng nhập</h2>
              <p className="text-sm text-text-muted">Nhập thông tin quản trị viên để tiếp tục</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone/Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-text-secondary ml-1">
                  Số điện thoại / Email
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại của bạn"
                    className={`w-full rounded-2xl border ${errors.phone ? 'border-status-banned/50 bg-status-banned/5' : 'border-white/10 bg-white/5'} py-3.5 pl-11 pr-4 text-sm text-white outline-none ring-primary/20 transition-all placeholder:text-text-muted/50 focus:border-primary focus:ring-4`}
                  />
                </div>
                {errors.phone && <p className="ml-1 text-[11px] text-status-banned">{errors.phone}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Mật khẩu
                  </label>
                  <button type="button" className="text-[11px] font-medium text-primary hover:underline">
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-2xl border ${errors.password ? 'border-status-banned/50 bg-status-banned/5' : 'border-white/10 bg-white/5'} py-3.5 pl-11 pr-12 text-sm text-white outline-none ring-primary/20 transition-all placeholder:text-text-muted/50 focus:border-primary focus:ring-4`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="ml-1 text-[11px] text-status-banned">{errors.password}</p>}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between px-1">
                <label className="flex cursor-pointer items-center space-x-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/5 transition-all checked:border-primary checked:bg-primary"
                    />
                    <svg
                      className="absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100 left-0.5 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-text-secondary select-none">Ghi nhớ đăng nhập</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-primary py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    Đăng nhập hệ thống
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Footer Info */}
          <div className="border-t border-white/5 bg-black/20 p-6 text-center">
            <p className="text-xs text-text-muted">
              Yêu cầu quyền truy cập cấp cao. Mọi hành động được ghi lại nhật ký.
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 flex items-center justify-center space-x-4 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase">Secure Environment</span>
          <div className="h-px w-8 bg-white/20" />
        </div>
      </div>
    </main>
  )
}