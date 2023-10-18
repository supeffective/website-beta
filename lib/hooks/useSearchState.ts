'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

type NewSearchState = Record<string, string | null | undefined>
type UseSearchStateReturnType<T extends NewSearchState> = [
  Partial<T>,
  (newState: Partial<T>) => void,
  (
    pathname: string,
    newState: Partial<T>,
  ) => {
    pathname: string
    query: Record<string, string>
  },
]

export function useSearchState<T extends NewSearchState>(): UseSearchStateReturnType<T> {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = useMemo(() => {
    return Object.fromEntries(new URLSearchParams(searchParams).entries()) as T
  }, [searchParams])

  const buildHref = useCallback(
    (
      pathname: string,
      newState: NewSearchState,
    ): {
      pathname: string
      query: Record<string, string>
    } => {
      const query = Object.fromEntries(
        Object.entries({ ...state, ...newState }).filter(
          (entry): entry is [string, string] => entry[1] != null && entry[1] !== undefined,
        ),
      )

      return {
        pathname,
        query,
      }
    },
    [state],
  )

  const updateState = useCallback(
    (newState: NewSearchState): void => {
      const link = buildHref(window.location.href, newState)

      const newUrl = new URL(link.pathname)
      newUrl.search = new URLSearchParams(link.query).toString()

      router.push(newUrl.toString())
    },
    [router, buildHref],
  )

  return [state, updateState, buildHref]
}
