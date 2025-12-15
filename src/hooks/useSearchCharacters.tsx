import { useInfiniteQuery } from '@tanstack/react-query';
import type { TDisneyCharacter, TQueryParams } from '@/types';
import useGetQueryParamRoutes from './useGetQueryParamRoutes';

type TApiResponse = {
  data: TDisneyCharacter[];
  info: {
    totalPages: number;
    nextPage: string | null;
  };
};

export function useSearchCharacters(
  queryParams: Omit<TQueryParams, 'page' | 'pageSize'>,
  pageSize: number = 50
) {
  const { fetcher } = useGetQueryParamRoutes();
  const hasSearchTerm = Object.values(queryParams).some(
    (value) => value && String(value).trim().length > 0
  );

  const query = useInfiniteQuery<TApiResponse>({
    queryKey: ['characters', queryParams, pageSize],
    queryFn: ({ pageParam = 1, signal }) =>
      fetcher(
        {
          ...queryParams,
          page: pageParam as number,
          pageSize
        },
        signal
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.info.nextPage === null) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: hasSearchTerm
  });

  const characters =
    query.data?.pages.flatMap((page) => {
      const data = page.data;
      if (!Array.isArray(data) && (data as TDisneyCharacter)._id) {
        return [data as TDisneyCharacter];
      }
      return data;
    }) ?? [];

  return {
    ...query,
    data: characters,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage
  };
}
