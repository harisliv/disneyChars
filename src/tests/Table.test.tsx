import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisneyCharacterTable from '../components/Table/Table';
import { TestQueryClientProvider } from './TestQueryClientProvider';
import { PaginationProvider } from '../context/PaginationContext';
import { mockCharactersResponse, defaultMockCharacters } from './testUtils';
import type { TDisneyCharacter } from '../types';

const createWrapper =
  () =>
  ({ children }: { children: React.ReactNode }) => (
    <TestQueryClientProvider>
      <PaginationProvider>{children}</PaginationProvider>
    </TestQueryClientProvider>
  );

const mockCharacters: TDisneyCharacter[] = [
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

describe('DisneyCharacterTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the table with characters', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Disney Characters')).toBeInTheDocument();
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
      expect(screen.getByText('Donald Duck')).toBeInTheDocument();
    });
  });

  it('should render table headers', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      const headers = screen.getAllByText('Name');
      expect(headers.length).toBeGreaterThan(0);
      expect(screen.getAllByText('TV Shows').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Video Games').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Details').length).toBeGreaterThan(0);
    });
  });

  it('should open modal when clicking view details button', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const detailsButton = screen.getByTestId('view-details-button-1');
    expect(detailsButton).toBeInTheDocument();
    await user.click(detailsButton);

    await waitFor(() => {
      expect(screen.getByText('Character Details')).toBeInTheDocument();
    });
  });

  it('should close modal when clicking close button', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const detailsButton = screen.getByTestId('view-details-button-1');
    expect(detailsButton).toBeInTheDocument();
    await user.click(detailsButton);

    await waitFor(() => {
      expect(screen.getByText('Character Details')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toBeVisible();

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    await waitFor(() => {
      const dialogAfterClose = screen.queryByRole('dialog');
      expect(dialogAfterClose).not.toBeVisible();
    });
  });

  it('should open modal when selecting character from search', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      'Search by character name...'
    );
    await user.type(searchInput, 'Mickey');

    await waitFor(
      () => {
        expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const option = screen.getByText('Mickey Mouse');
    await user.click(option);

    await waitFor(() => {
      expect(screen.getByText('Character Details')).toBeInTheDocument();
    });
  });

  it('should change page when clicking pagination controls', async () => {
    const page1Characters = mockCharacters.slice(0, 2);
    const page2Characters = mockCharacters.slice(2);

    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: page1Characters,
          nextPage: true
        },
        {
          page: 2,
          data: page2Characters,
          nextPage: false
        }
      ],
      totalPages: 2
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
      expect(screen.getByText('Donald Duck')).toBeInTheDocument();
    });

    const nextPageButton = screen.getByLabelText('Go to next page');
    await user.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('Goofy')).toBeInTheDocument();
      expect(screen.getByText('Pluto')).toBeInTheDocument();
    });
  });

  it('should change page size when selecting different rows per page', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const rowsPerPageSelect = screen.getByLabelText('rows per page');
    await user.click(rowsPerPageSelect);

    const option20 = screen.getByRole('option', { name: '20' });
    await user.click(option20);

    await waitFor(() => {
      expect(rowsPerPageSelect).toHaveTextContent('20');
    });
  });

  it('should sort columns when clicking column headers', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const tableHeader = screen.getByTestId('table-header-name');
    expect(tableHeader).toBeInTheDocument();
    await user.click(tableHeader);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      expect(firstDataRow).toHaveTextContent('Donald Duck');
    });
  });

  it('should toggle column visibility', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const columnVisibilityButton = screen.getByTestId(
      'column-visibility-button'
    );
    expect(columnVisibilityButton).toBeInTheDocument();
    await user.click(columnVisibilityButton);

    await waitFor(() => {
      expect(screen.getByText(/allies/i)).toBeInTheDocument();
    });

    const alliesCheckbox = screen.getByLabelText(/allies/i);
    await user.click(alliesCheckbox);

    await waitFor(() => {
      const alliesHeader = screen.getByTestId('table-header-allies');
      expect(alliesHeader).toBeInTheDocument();
    });
  });

  it('should display character search component', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search by character name...')
      ).toBeInTheDocument();
    });
  });

  it('should reset to first page when changing page size', async () => {
    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: mockCharacters.slice(0, 2),
          nextPage: true
        },
        {
          page: 2,
          data: mockCharacters.slice(2),
          nextPage: false
        }
      ],
      totalPages: 2
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const nextPageButton = screen.getByLabelText('Go to next page');
    await user.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('Goofy')).toBeInTheDocument();
    });

    const rowsPerPageSelect = screen.getByLabelText('rows per page');
    await user.click(rowsPerPageSelect);

    const option20 = screen.getByRole('option', { name: '20' });
    await user.click(option20);

    await waitFor(() => {
      const pageInfo = screen.getByText(/1–/);
      expect(pageInfo).toBeInTheDocument();
    });
  });

  it('should display pagination controls', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('rows per page')).toBeInTheDocument();

    const firstPageButton =
      screen.queryByLabelText(/go to first page/i) ||
      screen.queryByLabelText(/first page/i);
    const prevPageButton =
      screen.queryByLabelText(/go to previous page/i) ||
      screen.queryByLabelText(/previous page/i);
    const nextPageButton =
      screen.queryByLabelText(/go to next page/i) ||
      screen.queryByLabelText(/next page/i);
    const lastPageButton =
      screen.queryByLabelText(/go to last page/i) ||
      screen.queryByLabelText(/last page/i);

    expect(
      firstPageButton || prevPageButton || nextPageButton || lastPageButton
    ).toBeTruthy();
  });

  it('should handle sorting in both directions', async () => {
    mockCharactersResponse({
      data: mockCharacters,
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<DisneyCharacterTable />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    });

    const tableHeader = screen.getByTestId('table-header-name');
    expect(tableHeader).toBeInTheDocument();
    await user.click(tableHeader);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      expect(firstDataRow).toHaveTextContent('Donald Duck');
    });

    await user.click(tableHeader);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      expect(firstDataRow).toHaveTextContent('Pluto');
    });

    await user.click(tableHeader);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      expect(firstDataRow).toHaveTextContent('Mickey Mouse');
    });
  });
});
