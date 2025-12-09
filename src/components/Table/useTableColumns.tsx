import { createColumnHelper } from '@tanstack/react-table';
import type { TDisneyCharacter } from '@/types';
import React from 'react';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface IUseTableColumnsProps {
  onViewDetails?: (characterId: number) => void;
}

export function useTableColumns({ onViewDetails }: IUseTableColumnsProps = {}) {
  const columnHelper = createColumnHelper<TDisneyCharacter>();

  return React.useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric'
      }),
      columnHelper.accessor('tvShows', {
        header: 'TV Shows',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric'
      }),
      columnHelper.accessor('videoGames', {
        header: 'Video Games',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric'
      }),
      columnHelper.accessor('allies', {
        header: 'Allies',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric'
      }),
      columnHelper.accessor('enemies', {
        header: 'Enemies',
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric'
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Details',
        cell: (info) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => onViewDetails?.(info.row.original._id)}
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        )
      })
    ],
    [columnHelper, onViewDetails]
  );
}
