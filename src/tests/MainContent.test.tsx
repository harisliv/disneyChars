import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PaginationProvider } from '@/context';
import { MainContent } from '@/components/MainContent';
import { TestQueryClientProvider } from './TestQueryClientProvider';
import { defaultMockCharacters, mockCharactersResponse } from './testUtils';
import type { TDisneyCharacter } from '@/types';

const createWrapper =
  () =>
  ({ children }: { children: React.ReactNode }) => (
    <TestQueryClientProvider>
      <PaginationProvider>{children}</PaginationProvider>
    </TestQueryClientProvider>
  );

const paginatedCharacters: TDisneyCharacter[] = [
  ...defaultMockCharacters,
  {
    _id: 3,
    name: 'Goofy',
    sourceUrl: 'https://example.com/goofy',
    films: ['Film 3'],
    shortFilms: [],
    tvShows: ['Show 3'],
    videoGames: [],
    alignment: 'good',
    parkAttractions: [],
    allies: [],
    enemies: []
  },
  {
    _id: 4,
    name: 'Pluto',
    sourceUrl: 'https://example.com/pluto',
    films: ['Film 4'],
    shortFilms: [],
    tvShows: ['Show 4'],
    videoGames: [],
    alignment: 'good',
    parkAttractions: [],
    allies: [],
    enemies: []
  }
];

describe('MainContent', () => {
  it('keeps the dashboard mounted after the initial characters load', async () => {
    mockCharactersResponse({ delayMs: 20 });

    render(<MainContent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Disney Characters')).toBeInTheDocument();
      expect(screen.getByText('Films Distribution')).toBeInTheDocument();
    });
  });

  it('changes page when clicking pagination controls', async () => {
    const user = userEvent.setup();

    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: paginatedCharacters.slice(0, 2),
          nextPage: true
        },
        {
          page: 2,
          data: paginatedCharacters.slice(2),
          nextPage: false
        }
      ],
      totalPages: 2
    });

    render(<MainContent />, { wrapper: createWrapper() });
    const table = await screen.findByRole('table');

    await waitFor(() => {
      expect(within(table).getByText('Mickey Mouse')).toBeInTheDocument();
      expect(within(table).getByText('Donald Duck')).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Go to next page'));

    await waitFor(() => {
      expect(within(table).getByText('Goofy')).toBeInTheDocument();
      expect(within(table).getByText('Pluto')).toBeInTheDocument();
    });
  });

  it('resets to the first page when changing page size', async () => {
    const user = userEvent.setup();

    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: paginatedCharacters.slice(0, 2),
          nextPage: true
        },
        {
          page: 2,
          data: paginatedCharacters.slice(2),
          nextPage: false
        }
      ],
      totalPages: 2
    });

    render(<MainContent />, { wrapper: createWrapper() });
    const table = await screen.findByRole('table');

    await waitFor(() => {
      expect(within(table).getByText('Mickey Mouse')).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Go to next page'));

    await waitFor(() => {
      expect(within(table).getByText('Goofy')).toBeInTheDocument();
    });

    const previousPageButton = screen.getByLabelText('Go to previous page');
    expect(previousPageButton).not.toBeDisabled();

    await user.selectOptions(screen.getByLabelText('rows per page'), '20');

    await waitFor(() => {
      expect(previousPageButton).toBeDisabled();
    });
  });
});
