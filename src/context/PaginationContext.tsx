import { useMemo, useState, type ReactNode } from 'react';
import type { PaginationState } from '@tanstack/react-table';
import { createContext, type Dispatch, type SetStateAction } from 'react';

interface IPaginationProviderProps {
  children: ReactNode;
  initialPageIndex?: number;
  initialPageSize?: number;
}

interface IPaginationContextType {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const PaginationContext = createContext<
  IPaginationContextType | undefined
>(undefined);

export function PaginationProvider({
  children,
  initialPageIndex = 0,
  initialPageSize = 50
}: IPaginationProviderProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize
  });

  const contextValue = useMemo(
    () => ({ pagination, setPagination }),
    [pagination]
  );

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
}
