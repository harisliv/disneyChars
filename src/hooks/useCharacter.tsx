import { useQuery } from '@tanstack/react-query';
import type { TDisneyCharacter } from '@/types';
import axios from 'axios';

const DISNEY_API_URL = 'https://api.disneyapi.dev/character';

const getCharacter = async (id: string) =>
  await axios
    .get(`${DISNEY_API_URL}/${id}`)
    .then((response) => response.data.data);

export function useCharacter(id: string) {
  return useQuery<TDisneyCharacter>({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    enabled: !!id
  });
}
