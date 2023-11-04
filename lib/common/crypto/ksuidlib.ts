import '@/lib/common/env/server-only'

import { getMachineFootprint } from './machineid'
import { generateRandomHexString } from './random'
import { UNIX_EPOCH_MS, bigIntToBase36, rotlBigInt } from './utils'

const KSUID_PREXIX_REGEX = /^([a-z]{1,})([a-z0-9]{0,})-?$/
const KSUID_DEFAULT_MAX_ID_LENGTH = 24

/**
 *
 * A simple implementation of a K-Sortable Unique ID Generator.
 *
 * - __Security__: Similar to CUIDs, KSUIDs are not cryptographically secure. They are not meant to be used as secrets, but
 *   they can be used as unique identifiers for things like database records, or as keys for caches.
 *    - _Uniqueness_: KSUIDs are unique across machines, and are guaranteed to be unique for 1 millisecond, even if
 *      generated on different machines that are not synchronized.
 *    - _Sortability_: KSUIDs are sortable by generation time, and can be used as keys in databases that are sorted by
 *      creation time. In distributed systems, make sure they all use the same epoch, and that the clocks are
 *     synchronized.
 *    - _Predictability_ of the next ID: KSUIDs are somehow predictable for the first bits, but not for the last ones.
 *    - _Leaks_: KSUIDs partially leak how many IDs have been generated in a given time period, the creation date,
 *      and the machine ID, even though these parts are obfuscated, it is recommended to use a dedicated machine ID
 *      only for KSUID generation.
 *    - _Collision resistance_: KSUIDs are collision resistant, but it depends on how you configure the generator.
 *      The probability of collision is zero on a well-configured instance, where the provided machine ID is unique in
 *      your infrastructure, and the clock is monotonically increasing.
 * - __Performance__: KSUIDs are much faster to generate than ULIDs and CUIDs (v1 and v2), but slower than UUIDs.
 *   Speed is comparable to nanoid, which is one of the fastest, and beats it in some cases.
 *
 * The anatomy or bit distribution of a KSUID is as follows:
 *
 * - Time (8 base36 chars): milliseconds since epoch + Sequence/Counter (rotl-3x)
 * - Machine ID (5 base36 chars): Any integer up to 99_999 (like the PID + PPID of the current process) (rotl-3x)
 * - Randomness (8 hex chars): 4 random bytes, converted to hex (base16)
 *
 * @example 'pk-95dno5kw-0g57s-5f202b4a' // (26 chars, with prefix and separator)
 * @example '95domqy00g5u00870a7d2' // (21 chars)
 * @see https://adileo.github.io/awesome-identifiers/
 */
export class SimpleKSortableIDGenerator {
  private epoch: number
  private machineId: string
  private maxLength: number
  private sequence: bigint = 0n
  private lastTimestamp: number = -1

  constructor(epoch: number = UNIX_EPOCH_MS, maxLength: number = KSUID_DEFAULT_MAX_ID_LENGTH) {
    this.maxLength = maxLength
    this.epoch = epoch ?? UNIX_EPOCH_MS
    this.machineId = getMachineFootprint(3)
  }

  nextId(prefix: string = '', separator = ''): string {
    let timestamp = this.currentTimestamp()

    if (prefix.length > 0 && !prefix.match(KSUID_PREXIX_REGEX)) {
      throw new Error(
        'Invalid prefix. It should be in lowercase base36, start with a letter, and optionally end with a hyphen.',
      )
    }

    if (timestamp < this.lastTimestamp) {
      throw new Error('Clock moved backwards. Refusing to generate ID.')
    }

    if (timestamp === this.lastTimestamp) {
      if (this.sequence > BigInt(Number.MAX_SAFE_INTEGER)) {
        throw new Error('Max number of IDs generated in the same millisecond (Number.MAX_SAFE_INTEGER).')
      }
      this.sequence++
    }

    this.lastTimestamp = timestamp

    const _timing = BigInt(this.lastTimestamp - this.epoch) + this.sequence
    const _timingStr = bigIntToBase36(rotlBigInt(_timing, 1n)).padStart(9, '0') // 9 chars = up until year 5138
    const _randomBytes = generateRandomHexString(3)

    const baseId = [_timingStr, this.machineId, _randomBytes].join(separator)

    const baseLength = baseId.length - separator.length * 2
    const id = prefix + baseId

    if (id.length > this.maxLength) {
      throw Error(
        `KSUID length must be from ${baseLength} to ${this.maxLength} characters or less, got ${id.length}: '${id}'.`,
      )
    }

    return id
  }

  private currentTimestamp(): number {
    return new Date().getTime()
  }
}
