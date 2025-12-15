import { useQuery } from '@tanstack/react-query';
import type { TDisneyCharacter } from '@/types';
import axios from 'axios';

const getCharacter = async (id: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_DISNEY_API_BASE_URL}/${id}`
  );
  return response.data.data;
};

export function useSingleCharacter(id: string) {
  return useQuery<TDisneyCharacter>({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    enabled: !!id
  });
}
