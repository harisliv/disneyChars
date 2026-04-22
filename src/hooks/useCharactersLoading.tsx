import { useIsFetching } from '@tanstack/react-query';

export function useCharactersLoading() {
  const isFetchingCount = useIsFetching({
    queryKey: ['disneyCharacters']
  });

  return isFetchingCount > 0;
}
