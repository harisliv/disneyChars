import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DisneyCharacterTable } from './components';
import CharacterFilmsPieChart from './components/CharacterFilmsPieChart/CharacterFilmsPieChart';
import { PaginationProvider } from './context';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { usePaginatedTableData } from './hooks/usePaginatedTableData';

const queryClient = new QueryClient();

function AppContent() {
  const { isLoading } = usePaginatedTableData();

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
    <QueryClientProvider client={queryClient}>
      <PaginationProvider>
        <AppContent />
      </PaginationProvider>
    </QueryClientProvider>
  );
}
