import { cn } from '@/lib/utils'
import { Maven_Pro as HeadingFont } from 'next/font/google'

const fontFamily = HeadingFont({ subsets: ['latin'], weight: '800' })

type HeadingProps = {
  children: React.ReactNode
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6
} & React.HTMLAttributes<HTMLElement>

export function Heading({ children, className, level = 0, ...rest }: HeadingProps) {
  const fontClass = fontFamily.className + '  tracking-tight'
  switch (level) {
    case 1:
      return (
        <h1 className={cn('mb-4 text-4xl font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </h1>
      )
    case 2:
      return (
        <h2 className={cn('mb-4 text-3xl font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </h2>
      )
    case 3:
      return (
        <h3 className={cn('mb-4 text-2xl font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </h3>
      )
    case 4:
      return (
        <h4 className={cn('mb-4 text-xl font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </h4>
      )
    case 5:
      return (
        <h5 className={cn('mb-4 text-lg font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </h5>
      )
    case 6:
      return (
        <h6 className={cn('text-md mb-4 font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </h6>
      )
    default:
      return (
        <div className={cn('mb-4 text-xl font-bold leading-snug', fontClass, className)} {...rest}>
          {children}
        </div>
      )
  }
}
