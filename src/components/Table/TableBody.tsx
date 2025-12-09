import { TableBody, TableCell } from '@mui/material';

import { StyledTableRow } from './Table.styles';
import { flexRender } from '@tanstack/react-table';
import type { TTableProps } from '@/types';

export default function TableBodyComponent({ table }: TTableProps) {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <StyledTableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
