import { randomBytes } from 'crypto'

export function generateRandomHexString(length: number) {
  return randomBytes(length).toString('hex')
}
