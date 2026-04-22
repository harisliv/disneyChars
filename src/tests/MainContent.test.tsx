import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PaginationProvider } from '@/context';
import { MainContent } from '@/components/MainContent';
import { TestQueryClientProvider } from './TestQueryClientProvider';
import { mockCharactersResponse } from './testUtils';

const createWrapper =
  () =>
  ({ children }: { children: React.ReactNode }) => (
    <TestQueryClientProvider>
      <PaginationProvider>{children}</PaginationProvider>
    </TestQueryClientProvider>
  );

describe('MainContent', () => {
  it('keeps the dashboard mounted after the initial characters load', async () => {
    mockCharactersResponse({ delayMs: 20 });

    render(<MainContent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Disney Characters')).toBeInTheDocument();
      expect(screen.getByText('Films Distribution')).toBeInTheDocument();
    });
  });
});
