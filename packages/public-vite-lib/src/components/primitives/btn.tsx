import { cn } from '@itsjavi/cn'
import type { ReactElement } from 'react'
import type { BtnProps } from './types'

/**
 * An stylable abstraction around the native HTML button element.
 */
export function Btn({ variant, size, children, className, ...rest }: BtnProps): ReactElement {
  const _className = cn([`btn-variant-${variant}`, variant], [`btn-size-${size}`, size], className)

  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  )
}
