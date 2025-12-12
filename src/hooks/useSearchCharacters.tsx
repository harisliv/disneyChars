import { useInfiniteQuery } from '@tanstack/react-query';
import type { TDisneyCharacter, TQueryParams } from '@/types';
import axios from 'axios';
import queryString from 'query-string';

type TApiResponse = {
  data: TDisneyCharacter[];
  info: {
    totalPages: number;
    nextPage: string | null;
  };
};

const getFilteredCharacters = async (
  queryParams: TQueryParams,
  signal: AbortSignal
): Promise<TApiResponse> => {
  const stringifiedQueryParams = queryString.stringify(queryParams);

  const response = await axios.get(
    `${import.meta.env.VITE_DISNEY_API_BASE_URL}?${stringifiedQueryParams}`,
    { signal }
  );

  return response.data;
};

export function useSearchCharacters(
  queryParams: Omit<TQueryParams, 'page' | 'pageSize'>,
  pageSize: number = 50
) {
  const hasSearchTerm = Object.values(queryParams).some(
    (value) => value && String(value).trim().length > 0
  );

  const query = useInfiniteQuery<TApiResponse>({
    queryKey: ['characters', queryParams, pageSize],
    queryFn: ({ pageParam = 1, signal }) =>
      getFilteredCharacters(
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
