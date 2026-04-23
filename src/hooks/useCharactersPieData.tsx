import { useMemo } from 'react';
import { convertToPieChartData } from '@/utils';
import type { TDisneyCharacter } from '@/types';

export function useCharactersPieData(characters: TDisneyCharacter[]) {
  const pieChartData = useMemo(
    () => convertToPieChartData(characters),
    [characters]
  );

  return pieChartData;
}
