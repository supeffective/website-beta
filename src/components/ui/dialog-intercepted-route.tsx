'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export default function DialogInterceptedRoute({
  header,
  children,
  footer,
  className,
}: ComponentPropsWithoutRef<'div'> & {
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
}) {
  const router = useRouter()
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back()
        }
      }}
    >
      <DialogContent className={className}>
        <DialogHeader>
          {header && <DialogTitle>{header}</DialogTitle>}
          <DialogDescription>{children}</DialogDescription>
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
