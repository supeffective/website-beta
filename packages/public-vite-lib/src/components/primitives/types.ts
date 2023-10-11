import type { Size } from '@/lib'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type BtnProps = {
  variant?: 'primary' | 'secondary'
  size?: Size
  children: ReactNode
} & ComponentPropsWithoutRef<'button'>
