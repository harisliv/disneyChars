import type { TDisneyCharacter } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import useGetQueryParamRoutes from './useGetQueryParamRoutes';

export function usePaginatedCharacters() {
  const { pagination } = usePagination();

  const queryParams = {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  };

  const { fetcher } = useGetQueryParamRoutes();

  const query = useQuery<{
    data: TDisneyCharacter[];
    info: { totalPages: number };
  }>({
    queryKey: ['disneyCharacters', pagination],
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => fetcher(queryParams, signal)
  });
  const characters = query.data?.data ?? [];

  const pieChartData = characters.map((char) => ({
    name: char.name,
    y: char.films.length,
    films: char.films
  }));

  const totalCount = query.data?.info?.totalPages
    ? query.data.info.totalPages * pagination.pageSize
    : 0;

  return {
    data: characters,
    totalCount,
    pieChartData,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPlaceholderData: query.isPlaceholderData
  };
}
