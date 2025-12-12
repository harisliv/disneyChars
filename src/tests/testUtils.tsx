import { http, HttpResponse } from 'msw';
import type { TDisneyCharacter } from '@/types';
import { server } from '../mocks/server';

type TApiResponse = {
  data: TDisneyCharacter[];
  info: {
    totalPages: number;
    nextPage: string | null;
  };
};

export const defaultMockCharacters: TDisneyCharacter[] = [
  {
    _id: 1,
    name: 'Mickey Mouse',
    sourceUrl: 'https://example.com/mickey',
    films: ['Film 1'],
    shortFilms: [],
    tvShows: ['Show 1'],
    videoGames: [],
    alignment: 'good',
    parkAttractions: [],
    allies: [],
    enemies: []
  },
  {
    _id: 2,
    name: 'Donald Duck',
    sourceUrl: 'https://example.com/donald',
    films: ['Film 2'],
    shortFilms: [],
    tvShows: ['Show 2'],
    videoGames: [],
    alignment: 'good',
    parkAttractions: [],
    allies: [],
    enemies: []
  }
];

type TCharacterHandlerOptions = {
  data?: TDisneyCharacter[];
  totalPages?: number;
  nextPage?: string | null;
  delayMs?: number;
  apiBaseUrl?: string;
};

export function mockCharactersResponse(options: TCharacterHandlerOptions = {}) {
  const {
    data = defaultMockCharacters,
    totalPages = 1,
    nextPage = null,
    delayMs = 0,
    apiBaseUrl = import.meta.env.VITE_DISNEY_API_BASE_URL ||
      'https://api.disneyapi.dev/character'
  } = options;

  const handler = delayMs
    ? http.get(apiBaseUrl, async () => {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return HttpResponse.json<TApiResponse>({
          data,
          info: { totalPages, nextPage }
        });
      })
    : http.get(apiBaseUrl, () =>
        HttpResponse.json<TApiResponse>({
          data,
          info: { totalPages, nextPage }
        })
      );

  server.use(handler);
}

type TPaginatedHandlerOptions = {
  pages?: Array<{
    page: number;
    data: TDisneyCharacter[];
    nextPage?: string | null;
    delayMs?: number;
  }>;
  totalPages?: number;
  apiBaseUrl?: string;
};

export function mockPaginatedCharactersResponse(
  options: TPaginatedHandlerOptions = {}
) {
  const {
    pages = [
      {
        page: 1,
        data: defaultMockCharacters,
        nextPage: null
      }
    ],
    totalPages = 1,
    apiBaseUrl = import.meta.env.VITE_DISNEY_API_BASE_URL ||
      'https://api.disneyapi.dev/character'
  } = options;

  const handler = http.get(apiBaseUrl, async ({ request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    const pageData = pages.find((p) => p.page === page) || pages[0];

    if (pageData.delayMs) {
      await new Promise((resolve) => setTimeout(resolve, pageData.delayMs));
    }

    return HttpResponse.json<TApiResponse>({
      data: pageData.data,
      info: {
        totalPages,
        nextPage: pageData.nextPage ?? null
      }
    });
  });

  server.use(handler);
}
