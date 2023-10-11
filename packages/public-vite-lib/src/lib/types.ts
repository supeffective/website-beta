import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from 'react'

// Utility types:
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ResponsiveSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full'
export type Font = 'sans' | 'comic' | 'mono'
export type Orientation = 'vertical' | 'horizontal'

// React types:
export type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T>
export type PropsWithRefOf<T extends ElementType> = ComponentPropsWithRef<T>
