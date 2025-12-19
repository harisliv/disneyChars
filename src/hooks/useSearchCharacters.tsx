import { useInfiniteQuery } from '@tanstack/react-query';
import type { TQueryParams } from '@/types';
import useGetQueryParamRoutes from './useGetQueryParamRoutes';
import { convertToTableEntity } from '@/utils';
import { useMemo } from 'react';

export function useSearchCharacters(queryParams: TQueryParams) {
  const { fetcher } = useGetQueryParamRoutes();
  const hasSearchTerm = Object.values(queryParams).some(
    (value) => value && String(value).trim().length > 0
  );

  const query = useInfiniteQuery({
    queryKey: ['characters', queryParams],
    queryFn: ({ pageParam = 1, signal }) =>
      fetcher(
        {
          ...queryParams,
          page: pageParam,
          pageSize: 50
        },
        signal
      ),
    getNextPageParam: (lastPage, _, pageParam) => {
      if (lastPage.info.nextPage === null) {
        return undefined;
      }
      return pageParam + 1;
    },
    initialPageParam: 1,
    enabled: hasSearchTerm
  });

  const characters = useMemo(
    () => query.data?.pages.flatMap((page) => convertToTableEntity(page.data)) ?? [],
    [query.data]
  );

  return {
    ...query,
    data: characters ?? []
  };
}
