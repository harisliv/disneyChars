import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';

export function EmptyResults() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center'
      }}
    >
      <InboxIcon
        sx={{
          fontSize: 120,
          color: 'text.secondary',
          mb: 3,
          opacity: 0.5
        }}
      />
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        color="text.secondary"
      >
        No Characters Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        There are no Disney characters to display at the moment. Please try
        again later or check your search criteria.
      </Typography>
    </Box>
  );
}
