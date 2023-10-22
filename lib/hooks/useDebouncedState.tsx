'use client'

import { useEffect, useState } from 'react'

// T is a generic type for value parameter
export function useDebouncedState<T = string>(
  initialValue: T | undefined,
  delay?: number,
): [T | undefined, (value: T) => void] {
  const [value, setValue] = useState<T | undefined>(initialValue)
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(value)
  const changed = value !== debouncedValue

  useEffect(
    () => {
      if (!changed) {
        return
      }
      if (delay === undefined || delay <= 0) {
        setDebouncedValue(value)

        return
      }
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.

      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay, changed], // Only re-call effect if value or delay changes
  )

  return [debouncedValue, setValue]
}
