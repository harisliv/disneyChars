import type { TQueryParams } from '@/types';
import axios from 'axios';
import queryString from 'query-string';

export default function useGetQueryParamRoutes() {
  const fetcher = async (queryParams: TQueryParams, signal?: AbortSignal) => {
    const stringifiedQueryParams = queryString.stringify(queryParams);
    const response = await axios.get(
      `${import.meta.env.VITE_DISNEY_API_BASE_URL}?${stringifiedQueryParams}`,
      { signal }
    );
    return response.data;
  };
  return { fetcher };
}
