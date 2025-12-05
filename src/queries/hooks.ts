import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseQueryResult,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

export const useAppQuery = <TData, TError = unknown>(
  options: Omit<
    UseQueryOptions<TData, TError>,
    'staleTime' | 'retry' | 'refetchOnMount' | 'refetchOnWindowFocus'
  >
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    ...options,
    staleTime: 60 * 60 * 1000, // 60 minutes
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
}

export const useAppInfiniteQuery = <TData, TError = unknown>(
  options: Omit<
    UseInfiniteQueryOptions<TData, TError>,
    'staleTime' | 'retry' | 'refetchOnMount' | 'refetchOnWindowFocus'
  >
) => {
  return useInfiniteQuery({
    ...options,
    staleTime: 60 * 60 * 1000, // 60 minutes
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  } as UseInfiniteQueryOptions<TData, TError>)
}
