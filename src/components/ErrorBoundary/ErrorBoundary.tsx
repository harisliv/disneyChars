import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';

interface IErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface INormalizedError {
  message: string;
  status?: number;
  type: 'network' | 'server' | 'client' | 'unknown';
  details?: string;
}

const handleError = (error: unknown): INormalizedError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        type: 'server',
        details: `HTTP ${error.response.status}: ${error.response.statusText}`
      };
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      type: 'unknown',
      details: error.name !== 'Error' ? error.name : undefined
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      type: 'unknown'
    };
  }

  return {
    message: 'An unexpected error occurred',
    type: 'unknown',
    details: String(error)
  };
};

function ErrorFallback({ error, resetErrorBoundary }: IErrorFallbackProps) {
  const normalizedError = handleError(error);

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
        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
          {normalizedError.message}
        </Typography>
        {normalizedError.details && (
          <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
            {normalizedError.details}
          </Typography>
        )}
      </Alert>
    </Box>
  );
}

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: IErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
