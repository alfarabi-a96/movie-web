import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'

const defaultOptions = {
  staleTime: 60 * 60 * 1000, // 60 minutes
  retry: 1,
  refetchOnMount: false,
  refetchOnWindowFocus: false
}

export const useAppQuery = <TData, TError = unknown>(
  queryKey: string[],
  queryFn: () => Promise<TData>
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...defaultOptions
  })
}

export const useAppInfiniteQuery = <TData>(
  queryKey: string[],
  queryFn: (context: { pageParam: unknown }) => Promise<TData>,
  getNextPageParam: (lastPage: TData) => unknown | undefined,
  initialPageParam: number,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam,
    enabled,
    ...defaultOptions
  })
}
