import type { TApiResponse, TDisneyCharacter } from '@/types';

export const isApiResponse = (data: unknown): data is TApiResponse =>
  typeof data === 'object' && data !== null && 'data' in data && 'info' in data;

export const isDisneyCharacter = (data: unknown): data is TDisneyCharacter =>
  typeof data === 'object' && data !== null && '_id' in data;

export const isArrayOfCharacters = (
  data: unknown
): data is TDisneyCharacter[] =>
  Array.isArray(data) && data.every(isDisneyCharacter);

export const convertToTableEntity = (
  data: TDisneyCharacter | TDisneyCharacter[]
): TDisneyCharacter[] => {
  return isArrayOfCharacters(data) ? data : [data];
};

export const convertToPieChartData = (
  characters: TDisneyCharacter[]
): { name: string; y: number; films: string[] }[] => {
  return characters.length > 0
    ? characters.map((char) => ({
        name: char.name,
        y: char.films.length,
        films: char.films
      }))
    : [
        {
          name: 'No characters found',
          y: 100,
          films: []
        }
      ];
};
