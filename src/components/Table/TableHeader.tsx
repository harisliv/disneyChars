import { TableCell, TableRow } from '@mui/material';
import { StyledTableHeader } from './Table.styles';
import { flexRender } from '@tanstack/react-table';
import type { TTableProps } from '@/types';

export default function TableHeader({ table }: TTableProps) {
  return (
    <StyledTableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <div>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </StyledTableHeader>
  );
}
