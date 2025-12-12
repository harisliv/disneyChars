import type { TDisneyCharacter } from '@/types';
import { http, HttpResponse } from 'msw';

const apiBaseUrl =
  import.meta.env.VITE_DISNEY_API_BASE_URL ||
  'https://api.disneyapi.dev/character';

type TApiResponse = {
  data: TDisneyCharacter[];
  info: {
    totalPages: number;
    nextPage: string | null;
  };
};

export const handlers = [
  http.get(`${apiBaseUrl}`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const tvShows = url.searchParams.get('tvShows');

    // Return empty response if no search params
    if (!name && !tvShows) {
      return HttpResponse.json<TApiResponse>({
        data: [],
        info: {
          totalPages: 0,
          nextPage: null
        }
      });
    }

    // Default empty response for unhandled cases
    return HttpResponse.json<TApiResponse>({
      data: [],
      info: {
        totalPages: 0,
        nextPage: null
      }
    });
  }),
  http.get(`${apiBaseUrl}/:id`, () =>
    HttpResponse.json<{ data: TDisneyCharacter }>({
      data: {
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
      }
    })
  )
];
