import { cn } from '@/lib/utils'
import { ReactElement, ReactNode } from 'react'

type OverlayProps = {
  className?: string
  children?: ReactNode
}

export function Overlay({ className, children }: OverlayProps): ReactElement {
  return (
    <div
      role="dialog"
      className={cn(
        'fixed inset-0 z-50 flex h-full w-full animate-opacity items-center justify-center bg-primary/70 text-black',
        className,
      )}
    >
      {children}
    </div>
  )
}
