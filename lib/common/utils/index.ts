import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isDebugEnabled } from '../env/utils'

export function cn(...className: ClassValue[]) {
  return twMerge(clsx(className))
}

export async function waitMs(ms: number) {
  console.log(`⏱️ Waiting ${ms}ms...`)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function dd(...args: any[]): void {
  if (!isDebugEnabled()) {
    return
  }
  console.log('[app.debug]', ...args)
}
