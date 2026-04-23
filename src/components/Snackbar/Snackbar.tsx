import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import type { SnackbarState } from '@/context';

interface ISnackbarProps {
  snackbar: SnackbarState;
  onClose: () => void;
}

export function Snackbar({ snackbar, onClose }: ISnackbarProps) {
  return (
    <MuiSnackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={snackbar.status}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  );
}
