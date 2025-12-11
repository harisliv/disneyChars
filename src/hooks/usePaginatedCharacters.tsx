import type { TDisneyCharacter } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';
import axios from 'axios';
import { usePagination } from './usePagination';

const getDisneyCharacters = async (
  pagination: PaginationState,
  signal: AbortSignal
) =>
  await axios
    .get(
      `${import.meta.env.VITE_DISNEY_API_BASE_URL}?page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}`,
      { signal }
    )
    .then((response) => response.data);

export function usePaginatedCharacters() {
  const { pagination } = usePagination();
  const query = useQuery<{
    data: TDisneyCharacter[];
    info: { totalPages: number };
  }>({
    queryKey: ['disneyCharacters', pagination],
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getDisneyCharacters(pagination, signal)
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
