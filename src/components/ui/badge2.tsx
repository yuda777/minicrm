import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ',
  {
    variants: {
      variant: {
        default: 'bg-surface-200 text-foreground-light border border-strong',
        brand: 'bg-brand-200 text-brand-primary border border-brand-400',
        secondary:
          'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
        destructive: 'bg-destructive-400 text-destructive border border-destructive-300',
        outline: 'bg-transparent text border border-foreground',
        scale: 'bg-background text-foreground-light border border-strong',
        red: 'bg-red-200 text-red-900 dark:text-red-100 dark:bg-red-600',
        crimson: 'bg-crimson-200 text-crimson-900 dark:text-crimson-100 dark:bg-crimson-600',
        pink: 'bg-pink-200 text-pink-900 dark:text-pink-100 dark:bg-pink-600',
        purple: 'bg-purple-200 text-purple-900 dark:text-purple-100 dark:bg-purple-600',
        violet: 'bg-violet-200 text-violet-900 dark:text-violet-100 dark:bg-violet-600',
        indigo: 'bg-indigo-200 text-indigo-900 dark:text-indigo-100 dark:bg-indigo-600',
        blue: 'bg-blue-200 text-blue-900 dark:text-blue-100 dark:bg-blue-600',
        green: 'bg-green-200 text-green-900 dark:text-green-100 dark:bg-green-600',
        lime: 'bg-lime-200 text-lime-900 dark:text-lime-50 dark:bg-lime-700',
        orange: 'bg-orange-200 text-orange-900 dark:text-orange-100 dark:bg-orange-600',
        yellow: 'bg-yellow-200 text-yellow-900 dark:text-yellow-100 dark:bg-yellow-600',
        amber: 'bg-amber-200 text-amber-900 dark:text-amber-100 dark:bg-amber-600',
        gold: 'bg-gold-200 text-gold-900 dark:text-gold-100 dark:bg-gold-600',
        gray: 'bg-gray-200 text-gray-900 dark:text-gray-100 dark:bg-gray-600',
        rose: 'bg-rose-200 text-rose-900 dark:text-rose-100 dark:bg-rose-600',
        slate: 'bg-slate-200 text-slate-900 dark:text-gray-100 dark:bg-gray-600'
      },
      size: {
        small: 'px-2.5 py-0.5 text-xs',
        large: 'px-3 py-0.5 rounded-full text-sm',
      },
      dot: {
        true: '-ml-0.5 mr-1.5 h-2 w-2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'small',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

// export interface Pompa extend VariantProps < typeof badgeVariants > {}
export type BadgeVariant = VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <svg className={badgeVariants({ dot })} fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }