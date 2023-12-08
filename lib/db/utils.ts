import '@/lib/utils/env/server-only'

import { SimpleKSortableIDGenerator } from '@/lib/utils/crypto/ksuidlib'
import { NOMISTAKES_ALPHABET } from '@/lib/utils/crypto/utils'
import nanoid from 'nanoid'
import { DB_PRIMARY_KEY_LENGTH, DB_PUBLIC_ID_LENGTH } from './column-types'

const KSUID_MAX_PREFIX_LENGTH = DB_PRIMARY_KEY_LENGTH - 19 // 19 = base ksuid length

const ksuidGenerator = new SimpleKSortableIDGenerator(undefined, DB_PRIMARY_KEY_LENGTH)

/**
 * Generates a new K-Sortable Unique ID, pseudo-random, and suitable for use as a primary key in a database.
 *
 * Length can vary from 19 to 24 characters, depending on the prefix (which cannot be more than 5 characters).
 */
export function generateNextId(prefix: string = 'k'): string {
  if (prefix.length > KSUID_MAX_PREFIX_LENGTH) {
    throw new Error('Prefix must be 3 characters or less.')
  }
  return ksuidGenerator.nextId(prefix, '')
}

const generatePublicIdNanoId = nanoid.customAlphabet(NOMISTAKES_ALPHABET, DB_PUBLIC_ID_LENGTH)
const generateApiKeyNanoId = nanoid.customAlphabet(NOMISTAKES_ALPHABET, 23)
const generateVoucherNanoId = nanoid.customAlphabet(NOMISTAKES_ALPHABET, 6)

/**
 * Generates a totally random alpha-numeric ID string, without any ambiguous characters.
 *
 * With 20 characters, around 136 thousand years (or 4.30e+12 seconds) are needed,
 * in order to have a 1% probability of at least one collision if 10,000 IDs are
 * generated every second.
 *
 * @example 'ESumLafaHy3qsg5geh5H'
 * @returns {string} 20 characters
 */
export function generatePublicId(): string {
  return generatePublicIdNanoId()
}

/**
 * Generates a totally random alpha-numeric ID string, without any ambiguous characters.
 *
 * @example 'Kcwbi0RidSMZn56J6uKS'
 * @returns {string} 20 characters
 */
export function generateSecretLinkId(): string {
  return generatePublicIdNanoId()
}

/**
 * Generates a totally random alpha-numericc string formatted as API Key, without any ambiguous characters.
 *
 * @example 'JRpfXC-ruPUTGzeSRwGAdFmbePXksJ'
 * @returns {string} 30 characters
 */
export function generateApiKey(): string {
  return [generateVoucherNanoId(), generateApiKeyNanoId()].join('-') // 6-23 (30 chars)
}

/**
 * Generates a totally random alpha-numeric string formatted as Voucher Code, without any ambiguous characters.
 *
 * @example 'haxU42-SpteJf-SwQ7FF'
 * @returns {string} 20 characters
 */
export function generateVoucherCode(): string {
  return [generateVoucherNanoId(), generateVoucherNanoId(), generateVoucherNanoId()].join('-') // 6-6-6 (20 chars)
}
