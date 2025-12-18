import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import useGetQueryParamRoutes from './useGetQueryParamRoutes';
import { convertToPieChartData, convertToTableEntity } from '@/utils';
import { useMemo } from 'react';

export function usePaginatedCharacters() {
  const { pagination } = usePagination();

  const queryParams = {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  };

  const { fetcher } = useGetQueryParamRoutes();

  const query = useQuery({
    queryKey: ['disneyCharacters', pagination],
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => fetcher(queryParams, signal)
  });

  const characters = useMemo(
    () => convertToTableEntity(query.data?.data ?? []),
    [query.data]
  );

  const pieChartData = useMemo(
    () => convertToPieChartData(characters),
    [characters]
  );

  const totalCount = query.data?.info?.totalPages
    ? query.data.info.totalPages * pagination.pageSize
    : 0;

  return {
    ...query,
    data: characters,
    totalCount,
    pieChartData,
    emptyResults: characters.length === 0
  };
}
