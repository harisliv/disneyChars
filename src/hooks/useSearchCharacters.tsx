import { useQuery } from '@tanstack/react-query';
import type { TDisneyCharacter } from '@/types';
import axios from 'axios';

const getAllCharacter = async (name?: string, signal?: AbortSignal) =>
  await axios
    .get(`${import.meta.env.VITE_DISNEY_API_BASE_URL}?name=${name}`, { signal })
    .then((response) => {
      const data = response.data.data;
      if (!Array.isArray(data) && data._id) {
        return [data];
      }
      return data;
    });

export function useSearchCharacters(name?: string) {
  return useQuery<TDisneyCharacter[]>({
    queryKey: ['characters', name],
    queryFn: ({ signal }) => getAllCharacter(name, signal),
    enabled: !!name
  });
}
