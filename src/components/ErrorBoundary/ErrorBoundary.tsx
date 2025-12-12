import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        boxSizing: 'border-box'
      }}
    >
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon />}
        sx={{
          maxWidth: 600,
          width: '100%'
        }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={resetErrorBoundary}
            sx={{ mt: 1 }}
          >
            Try Again
          </Button>
        }
      >
        <AlertTitle>Something went wrong</AlertTitle>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          {error.message || 'An unexpected error occurred'}
        </Typography>
      </Alert>
    </Box>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // You can log the error to an error reporting service here
        console.error('Error caught by boundary:', error, errorInfo);
      }}
      onReset={() => {
        // Reset any state or perform cleanup if needed
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
