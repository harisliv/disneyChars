import { useQuery } from '@tanstack/react-query';
import type { TDisneyCharacter } from '@/types';
import axios from 'axios';

const getAllCharacter = async (name?: string, signal?: AbortSignal) =>
  await axios
    .get(`${import.meta.env.VITE_DISNEY_API_BASE_URL}?name=${name}`, { signal })
    .then((response) => response.data.data);

export function useSearchCharacters(name?: string) {
  return useQuery<TDisneyCharacter[]>({
    queryKey: ['characters', name],
    queryFn: ({ signal }) => getAllCharacter(name, signal),
    enabled: !!name
  });
}
