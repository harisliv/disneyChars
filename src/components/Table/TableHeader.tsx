import { TableCell, TableRow } from '@mui/material';
import { StyledTableHeader } from './Table.styles';
import { flexRender } from '@tanstack/react-table';
import type { TTableProps } from '@/types';
import SortIcon from './SortIcon';

export default function TableHeader({ table }: TTableProps) {
  return (
    <StyledTableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell key={header.id} colSpan={header.colSpan}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                {...{
                  className: header.column.getCanSort()
                    ? 'cursor-pointer select-none'
                    : '',
                  onClick: header.column.getToggleSortingHandler()
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getCanSort() && (
                  <SortIcon
                    fillUp={
                      header.column.getIsSorted() === 'asc' ? '#fff' : '#bfbfbf'
                    }
                    fillDown={
                      header.column.getIsSorted() === 'desc'
                        ? '#fff'
                        : '#bfbfbf'
                    }
                  />
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </StyledTableHeader>
  );
}
