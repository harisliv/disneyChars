import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react';
import type { PaginationState } from '@tanstack/react-table';
// TODO why is this safe
interface PaginationContextType {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const PaginationContext = createContext<
  PaginationContextType | undefined
>(undefined);

interface PaginationProviderProps {
  children: ReactNode;
  initialPageIndex?: number;
  initialPageSize?: number;
}

export function PaginationProvider({
  children,
  initialPageIndex = 0,
  initialPageSize = 50
}: PaginationProviderProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize
  });

  return (
    <PaginationContext.Provider value={{ pagination, setPagination }}>
      {children}
    </PaginationContext.Provider>
  );
}
