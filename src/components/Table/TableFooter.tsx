import {
  CircularProgress,
  TablePagination,
  TablePaginationActions
} from '@mui/material';
import { ColumnVisibilityMenu } from './ColumnVisibilityMenu';
import { usePaginatedCharacters, usePagination } from '@/hooks';
import type { TTableProps } from '@/types';
import { TableFooterContainer } from './TableFooter.styles';

export function TableFooter({ table }: TTableProps) {
  const { setPagination } = usePagination();
  const { pageSize, pageIndex } = table.getState().pagination;
  const { totalCount, isFetching, emptyResults } = usePaginatedCharacters();
  return (
    <TableFooterContainer>
      <ColumnVisibilityMenu table={table} />
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
        component="div"
        count={totalCount ?? 0}
        rowsPerPage={pageSize}
        page={pageIndex}
        disabled={isFetching || emptyResults}
        labelDisplayedRows={
          isFetching ? () => <CircularProgress size={20} /> : undefined
        }
        slotProps={{
          select: {
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
            disabled: isFetching || emptyResults
          }
        }}
        onPageChange={(_, page) => {
          setPagination((prev) => ({
            ...prev,
            pageIndex: page
          }));
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          setPagination((prev) => ({
            ...prev,
            pageSize: size,
            pageIndex: 0
          }));
        }}
        ActionsComponent={TablePaginationActions}
      />
    </TableFooterContainer>
  );
}
