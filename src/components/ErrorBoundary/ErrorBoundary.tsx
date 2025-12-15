import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { handleError } from '@/utils';

interface IErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

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
