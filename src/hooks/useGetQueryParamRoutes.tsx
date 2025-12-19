import type { TApiResponse, TQueryParams } from '@/types';
import { handleError } from '@/utils';
import axios from 'axios';
import queryString from 'query-string';
import { useSnackbar } from './useSnackbar';
import { useCallback } from 'react';

export default function useGetQueryParamRoutes() {
  const { setSnackbar } = useSnackbar();
  const fetcher = useCallback(
    async (
      queryParams: TQueryParams,
      signal?: AbortSignal
    ): Promise<TApiResponse> => {
      try {
        const stringifiedQueryParams = queryString.stringify(queryParams);
        const response = await axios.get(
          `${import.meta.env.VITE_DISNEY_API_BASE_URL}?${stringifiedQueryParams}`,
          { signal }
        );
        return response.data;
      } catch (error) {
        const normalizedError = handleError(error);
        setSnackbar({
          message: normalizedError.message,
          status: 'error',
          open: true
        });
        return { data: [], info: { totalPages: 0, nextPage: null } };
      }
    },
    [setSnackbar]
  );
  return { fetcher };
}
