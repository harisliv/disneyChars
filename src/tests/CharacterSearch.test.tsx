import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterSearch } from '../components/CharacterSearch/CharacterSearch';
import type { TDisneyCharacter } from '../types';
import { TestQueryClientProvider } from './TestQueryClientProvider';
import { mockCharactersResponse, defaultMockCharacters } from './testUtils';

describe('CharacterSearch', () => {
  it('should render the component with default search type', () => {
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    expect(screen.getByLabelText('search by name')).toBeInTheDocument();
    expect(screen.getByLabelText('search by tv show')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search by character name...')
    ).toBeInTheDocument();
  });

  it('should change placeholder when search type changes to TV show', async () => {
    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const tvShowButton = screen.getByLabelText('search by tv show');
    await user.click(tvShowButton);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search by TV show name...')
      ).toBeInTheDocument();
    });
  });

  it('should display "Start typing to search..." when input is empty', async () => {
    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.click(input);

    await waitFor(() => {
      expect(screen.getByText('Start typing to search...')).toBeInTheDocument();
    });
  });

  it('should display "No characters found" when input has value but no results', async () => {
    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'test');

    await waitFor(
      () => {
        expect(screen.getByText('No characters found')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should display loading indicator when data is loading', async () => {
    mockCharactersResponse({
      totalPages: 1,
      delayMs: 100
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'Mickey');

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  it('should display characters when data is available', async () => {
    mockCharactersResponse({
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'Mickey');

    await waitFor(
      () => {
        expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
        expect(screen.getByText('Donald Duck')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should open character details when a character is selected', async () => {
    mockCharactersResponse({
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'Mickey');

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

  it('should clear the selected search value', async () => {
    mockCharactersResponse({
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'Mickey');

    await waitFor(
      () => {
        expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await user.clear(input);

    expect(input).toHaveValue('');
  });

  it('should toggle search type between name and tvShows', async () => {
    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const nameButton = screen.getByLabelText('search by name');
    const tvShowButton = screen.getByLabelText('search by tv show');

    expect(nameButton).toHaveAttribute('aria-pressed', 'true');
    expect(tvShowButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(tvShowButton);

    await waitFor(() => {
      expect(nameButton).toHaveAttribute('aria-pressed', 'false');
      expect(tvShowButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('should show "More" button when there are more pages available', async () => {
    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: defaultMockCharacters,
          nextPage: true
        },
        {
          page: 2,
          data: [],
          nextPage: false
        }
      ],
      totalPages: 2
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'test');

    await waitFor(
      () => {
        expect(screen.getByText('More')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should not show "More" button when no characters are available', () => {
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });

  it('should load more characters when "More" button is clicked', async () => {
    const page2Characters: TDisneyCharacter[] = [
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
      }
    ];

    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: defaultMockCharacters,
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
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'test');

    await waitFor(
      () => {
        expect(screen.getByText('More')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const moreButton = screen.getByText('More');
    await user.click(moreButton);

    await waitFor(
      () => {
        expect(screen.getByText('Goofy')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should disable "More" button when there are no more pages', async () => {
    mockCharactersResponse({
      totalPages: 1
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'test');

    await waitFor(
      () => {
        const moreButton = screen.getByText('More');
        expect(moreButton).toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  it('should show loading state on "More" button when fetching next page', async () => {
    mockCharactersResponse({
      pages: [
        {
          page: 1,
          data: defaultMockCharacters,
          nextPage: true
        },
        {
          page: 2,
          data: [],
          nextPage: false,
          delayMs: 200
        }
      ],
      totalPages: 2
    });

    const user = userEvent.setup();
    render(<CharacterSearch />, {
      wrapper: TestQueryClientProvider
    });

    const input = screen.getByPlaceholderText('Search by character name...');
    await user.type(input, 'test');

    await waitFor(
      () => {
        expect(screen.getByText('More')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const moreButton = screen.getByText('More');
    await user.click(moreButton);

    await waitFor(
      () => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
