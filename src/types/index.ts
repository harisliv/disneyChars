import type { Table } from '@tanstack/react-table';

export type TDisneyCharacter = {
  _id: number;
  imageUrl?: string;
  name: string;
  sourceUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  alignment: string;
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
};

export type TTableProps = {
  table: Table<TDisneyCharacter>;
};

export type TSearchType = Extract<keyof TDisneyCharacter, 'name' | 'tvShows'>;

export type TQueryParams = {
  name?: string;
  tvShows?: string;
  page?: number;
  pageSize?: number;
};
