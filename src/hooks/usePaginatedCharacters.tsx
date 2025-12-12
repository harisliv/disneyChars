import type { TDisneyCharacter, TQueryParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePagination } from './usePagination';
import queryString from 'query-string';

const getFilteredCharacters = async (
  queryParams: TQueryParams,
  signal: AbortSignal
) => {
  const stringifiedQueryParams = queryString.stringify(queryParams);

  const response = await axios.get(
    `${import.meta.env.VITE_DISNEY_API_BASE_URL}?${stringifiedQueryParams}`,
    { signal }
  );
  return response.data;
};

export function usePaginatedCharacters() {
  const { pagination } = usePagination();
  const queryParams = {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  };
  const query = useQuery<{
    data: TDisneyCharacter[];
    info: { totalPages: number };
  }>({
    queryKey: ['disneyCharacters', pagination],
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getFilteredCharacters(queryParams, signal)
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
