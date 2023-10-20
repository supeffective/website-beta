'use client'

import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './dialog'

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
        <DialogHeader>{header && <DialogTitle>{header}</DialogTitle>}</DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
