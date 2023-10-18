import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...className: ClassValue[]) {
  return twMerge(clsx(className))
}

export async function waitMs(ms: number) {
  console.log(`⏱️ Waiting ${ms}ms...`)
  return new Promise((resolve) => setTimeout(resolve, ms))
}
