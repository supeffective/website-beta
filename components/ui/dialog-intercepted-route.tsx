'use client'

import { useRouter } from 'next/navigation'
import React, { ComponentPropsWithoutRef, ReactNode, useState } from 'react'
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
  const [closing, setClosing] = useState(false)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open && !closing) {
          // Trigger an extra render to delay giving focus on backdrop elements
          setClosing(true)
          return
        }
        if (closing && !open) {
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
