import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DisneyCharacterTable,
  ErrorBoundary,
  EmptyResults
} from './components';
import CharacterFilmsPieChart from './components/CharacterFilmsPieChart/CharacterFilmsPieChart';
import { PaginationProvider } from './context';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { usePaginatedCharacters } from './hooks/usePaginatedCharacters';
import { usePagination } from '@/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes,
      refetchOnWindowFocus: false,
      throwOnError: true,
      retry: 3
    }
  }
});

function AppContent() {
  const { pagination } = usePagination();
  const { isLoading, data } = usePaginatedCharacters({ pagination });

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyResults />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        p: 2,
        boxSizing: 'border-box'
      }}
    >
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid
          size={6}
          component={Box}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <DisneyCharacterTable />
        </Grid>
        <Grid size={6} component={Box} sx={{ height: '100%' }}>
          <CharacterFilmsPieChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PaginationProvider>
          <AppContent />
        </PaginationProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
