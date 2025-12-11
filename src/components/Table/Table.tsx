import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { StyledTable, StyledTableContainer } from './Table.styles';
import { useTableColumns } from './useTableColumns';
import { CardContainer, CardHeader } from '@/components/Card';
import { TableFooter } from './TableFooter';
import TableHeader from './TableHeader';
import TableBodyComponent from './TableBody';
import { CharacterDetailsModal } from '@/components/CharacterDetailsModal';
import { CharacterSearch } from '@/components/CharacterSearch';
import { usePagination } from '@/hooks';
import { usePaginatedCharacters } from '@/hooks';
import type { TDisneyCharacter } from '@/types';

const initialColumnVisibility: VisibilityState = {
  allies: false,
  enemies: false
};

export default function DisneyCharacterTable() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (characterId: number) => {
    setSelectedCharacterId(characterId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCharacterSelect = (character: TDisneyCharacter | null) => {
    if (character) {
      handleViewDetails(character._id);
    }
  };

  const columns = useTableColumns({ onViewDetails: handleViewDetails });
  const { pagination, setPagination } = usePagination();
  const { data: queryData, totalCount } = usePaginatedCharacters();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );

  const table = useReactTable({
    data: queryData || [],
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

  return (
    <>
      <CardContainer>
        <CardHeader
          title="Disney Characters"
          actions={
            <CharacterSearch onCharacterSelect={handleCharacterSelect} />
          }
        />
        <StyledTableContainer>
          <StyledTable stickyHeader>
            <TableHeader table={table} />
            <TableBodyComponent table={table} />
          </StyledTable>
        </StyledTableContainer>
        <TableFooter table={table} />
      </CardContainer>
      <CharacterDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        characterId={selectedCharacterId?.toString() || null}
      />
    </>
  );
}
