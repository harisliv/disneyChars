import { useContext } from 'react';
import { PaginationContext } from '@/context';

export function usePagination() {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
}
