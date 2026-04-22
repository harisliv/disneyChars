import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type VisibilityState
} from '@tanstack/react-table';
import { StyledTable, StyledTableContainer } from './Table.styles';
import { useTableColumns } from './useTableColumns';
import { CardContainer, CardHeader } from '@/components/Card';
import { TableFooter } from './TableFooter';
import TableHeader from './TableHeader';
import TableBodyComponent from './TableBody';
import { CharacterSearch } from '@/components/CharacterSearch';
import { usePagination } from '@/hooks';
import { EmptyResults } from '../EmptyResults';
import type { TDisneyCharacter } from '@/types';

interface IDisneyCharacterTableProps {
  characters: TDisneyCharacter[];
  totalCount: number;
}

const initialColumnVisibility: VisibilityState = {
  allies: false,
  enemies: false
};

export default function DisneyCharacterTable({
  characters,
  totalCount
}: IDisneyCharacterTableProps) {
  const columns = useTableColumns();
  const { pagination, setPagination } = usePagination();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );

  const table = useReactTable({
    data: characters,
    columns,
    rowCount: totalCount,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      columnVisibility
    },
    debugTable: false
  });
  const visibleColumnCount = table.getVisibleLeafColumns().length;

  return (
    <CardContainer>
      <CardHeader title="Disney Characters">
        <CharacterSearch />
      </CardHeader>
      <StyledTableContainer>
        <StyledTable stickyHeader>
          <TableHeader table={table} />
          {characters.length > 0 ? (
            <TableBodyComponent table={table} />
          ) : (
            <EmptyResults colSpan={visibleColumnCount} />
          )}
        </StyledTable>
      </StyledTableContainer>
      <TableFooter
        table={table}
        totalCount={totalCount}
        emptyResults={characters.length === 0}
      />
    </CardContainer>
  );
}
