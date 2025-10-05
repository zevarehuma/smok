import * as React from 'react'
import { cn } from './utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant='default', size='md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-400/40 disabled:opacity-50 disabled:pointer-events-none'
    const variants = {
      default: 'bg-gradient-to-br from-sky-400 to-teal-300 text-slate-900 hover:opacity-90',
      outline: 'border border-white/15 bg-transparent text-slate-100 hover:bg-white/5',
      ghost: 'bg-transparent hover:bg-white/5 text-slate-100'
    } as const
    const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-11 px-6 text-base' } as const
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  }
)
Button.displayName = 'Button'
