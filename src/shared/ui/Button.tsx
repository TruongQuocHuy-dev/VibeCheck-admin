import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'border border-primary/40 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-hover hover:border-primary-hover',
  secondary:
    'border border-background-muted bg-background-card text-text-primary hover:border-background-hover hover:bg-background-hover/30',
  ghost:
    'border border-transparent bg-transparent text-text-secondary hover:border-background-muted hover:bg-background-hover/20 hover:text-text-primary',
  danger:
    'border border-status-banned/40 bg-status-banned/10 text-status-banned hover:bg-status-banned/20 hover:border-status-banned/60',
}

const sizeClassNames: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60',
        variantClassNames[variant],
        sizeClassNames[size],
        className,
      ].join(' ')}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  )
}