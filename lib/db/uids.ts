import nanoid from 'nanoid'
import { SimpleKSortableIDGenerator } from '../crypto/ksuidlib'
import { NOMISTAKES_ALPHABET, RUNTIME_PROCESS_UID, UNIX_EPOCH_MS } from '../crypto/utils'
import { DB_PRIMARY_KEY_LENGTH, DB_PUBLIC_ID_LENGTH } from './column-types'

const KSUID_MAX_PREFIX_LENGTH = DB_PRIMARY_KEY_LENGTH - 21 // 21 = base ksuid length

const ksuidGenerator = new SimpleKSortableIDGenerator(UNIX_EPOCH_MS, RUNTIME_PROCESS_UID, DB_PRIMARY_KEY_LENGTH)

/**
 * Generates a new K-Sortable Unique ID, pseudo-random, and suitable for use as a primary key in a database.
 *
 * Length can vary from 17 to 20 characters, depending on the prefix (which cannot be more than 3 characters).
 */
export function generateNextId(prefix: string = 'k'): string {
  const separator = ''
  if (prefix.length > KSUID_MAX_PREFIX_LENGTH) {
    throw new Error('Prefix must be 3 characters or less.')
  }
  return ksuidGenerator.nextId(prefix, separator)
}

const generatePublicIdNanoId = nanoid.customAlphabet(NOMISTAKES_ALPHABET, DB_PUBLIC_ID_LENGTH)
const generateApiKeyNanoId = nanoid.customAlphabet(NOMISTAKES_ALPHABET, 23)
const generateVoucherNanoId = nanoid.customAlphabet(NOMISTAKES_ALPHABET, 6)

/**
 * Generates a totally random alpha-numeric ID string, without any ambiguous characters.
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
