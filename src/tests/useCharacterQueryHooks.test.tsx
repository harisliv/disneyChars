import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PaginationProvider } from '@/context';
import {
  useCharactersPaginationMeta,
  useCharactersPieData,
  useCharactersTableData
} from '@/hooks';
import { TestQueryClientProvider } from './TestQueryClientProvider';
import { defaultMockCharacters, mockCharactersResponse } from './testUtils';

const createWrapper =
  () =>
  ({ children }: { children: React.ReactNode }) => (
    <TestQueryClientProvider>
      <PaginationProvider>{children}</PaginationProvider>
    </TestQueryClientProvider>
  );

describe('character query hooks', () => {
  it('returns table data from the shared paginated characters query', async () => {
    mockCharactersResponse({ data: defaultMockCharacters, totalPages: 3 });

    const { result } = renderHook(() => useCharactersTableData(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.characters).toHaveLength(2);
      expect(result.current.characters[0].name).toBe('Mickey Mouse');
      expect(result.current.totalCount).toBe(150);
    });
  });

  it('returns pagination metadata without exposing table or chart data', async () => {
    mockCharactersResponse({ data: defaultMockCharacters, totalPages: 2 });

    const { result } = renderHook(() => useCharactersPaginationMeta(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.totalCount).toBe(100);
      expect(result.current.emptyResults).toBe(false);
      expect(result.current).not.toHaveProperty('characters');
      expect(result.current).not.toHaveProperty('pieChartData');
    });
  });

  it('returns pie chart data from the shared paginated characters query', async () => {
    mockCharactersResponse({ data: defaultMockCharacters, totalPages: 1 });

    const { result } = renderHook(() => useCharactersPieData(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.pieChartData).toEqual([
        { name: 'Mickey Mouse', y: 1, films: ['Film 1'] },
        { name: 'Donald Duck', y: 1, films: ['Film 2'] }
      ]);
      expect(result.current.emptyResults).toBe(false);
    });
  });

});
