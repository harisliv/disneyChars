import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react';
import type { INormalizedError } from '@/types';
import { Snackbar } from '@/components';
import type { AlertColor } from '@mui/material';

export type SnackbarStatus = AlertColor;

export type SnackbarState = {
  status: SnackbarStatus;
  message: string;
  open: boolean;
  error?: INormalizedError;
};

interface SnackbarContextType {
  setSnackbar: Dispatch<SetStateAction<SnackbarState>>;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    status: 'info',
    message: '',
    open: false
  });

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const contextValue = useMemo(
    () => ({ setSnackbar, closeSnackbar }),
    [closeSnackbar]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar snackbar={snackbar} onClose={closeSnackbar} />
    </SnackbarContext.Provider>
  );
}
