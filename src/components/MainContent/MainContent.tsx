import { usePaginatedCharacters } from '@/hooks';
import { Box, CircularProgress, Grid } from '@mui/material';
import { EmptyResults } from '../EmptyResults';
import { DisneyCharacterTable } from '../Table';
import { CharacterFilmsPieChart } from '../CharacterFilmsPieChart';

export default function MainContent() {
  const { isLoading, data } = usePaginatedCharacters();

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
