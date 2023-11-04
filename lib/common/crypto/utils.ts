import '@/lib/common/env/server-only'

export const UNIX_EPOCH_MS = 1609459200000
export const RUNTIME_PROCESS_UID = Math.min((process.pid ?? 0) + (process.ppid ?? 0), 9999)

export const NOMISTAKES_ALPHABET = /*~*/ '0123456789abcdefghijkmnpqrstuwxyzABCDEFGHJKLMNPQRSTUWXYZ'
export const ALPHANUM_ALPHABET = /*~~~*/ '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const ALPHANUM_CI_ALPHABET = /**/ '0123456789abcdefghijklmnopqrstuvwxyz'

export function bigIntToBase36(num: bigint, numDigits?: number): string {
  const value = num.toString(36)

  if (numDigits) {
    return value.padStart(numDigits, '0')
  }

  return value
}

/**
 * Rotates a 64-bit number to the left by a given number of bits.
 */
export function rotlBigInt(num: bigint, rotationBits: bigint = 1n): bigint {
  if (rotationBits === 0n) {
    return num
  }
  return (num << rotationBits) | (num >> (64n - rotationBits))
}
