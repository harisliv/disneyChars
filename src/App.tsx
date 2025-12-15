import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary, MainContent } from '@/components';
import { PaginationProvider, SnackbarProvider } from '@/context';
import { queryClient } from '@/utils';

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PaginationProvider>
          <SnackbarProvider>
            <MainContent />
          </SnackbarProvider>
        </PaginationProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
