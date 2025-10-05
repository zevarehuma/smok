import * as React from 'react'
import { cn } from './utils'
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('glass', className)} {...props} /> }
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('px-5 pt-5', className)} {...props} /> }
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn('text-lg font-semibold', className)} {...props} /> }
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('px-5 pb-5', className)} {...props} /> }
