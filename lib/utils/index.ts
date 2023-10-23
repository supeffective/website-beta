import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isProductionEnv } from '../env/utils'

export function cn(...className: ClassValue[]) {
  return twMerge(clsx(className))
}

export async function waitMs(ms: number) {
  console.log(`⏱️ Waiting ${ms}ms...`)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function dd(...args: any[]): void {
  if (isProductionEnv()) {
    return
  }
  console.log('🐛 Debug:', ...args)
}
