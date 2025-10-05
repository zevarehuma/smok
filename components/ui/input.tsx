import * as React from 'react'
import { cn } from './utils'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn('w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm outline-none focus:border-sky-300/40', className)} {...props} />
))
Input.displayName = 'Input'
