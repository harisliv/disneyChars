import {
  createContext,
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
  snackbar: SnackbarState;
  setSnackbar: Dispatch<SetStateAction<SnackbarState>>;
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

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
}
