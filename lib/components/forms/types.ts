import type { ComponentPropsWithoutRef } from 'react'

export type ApiFormProps = { children: React.ReactNode; method: string; action: string } & Omit<
  ComponentPropsWithoutRef<'form'>,
  'method' | 'action'
>
