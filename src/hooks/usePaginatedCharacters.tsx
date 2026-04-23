import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePagination } from './usePagination';
import useGetQueryParamRoutes from './useGetQueryParamRoutes';
import { convertToTableEntity } from '@/utils';
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

  const totalCount = query.data?.info?.totalPages
    ? query.data.info.totalPages * pagination.pageSize
    : 0;

  const characters = useMemo(
    () => convertToTableEntity(query.data?.data ?? []),
    [query.data]
  );

  return {
    ...query,
    data: characters,
    totalCount
  };
}
