import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  Typography
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import type { TTableProps } from '@/types';

export function ColumnVisibilityMenu({ table }: TTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 0.75
        }}
      >
        <ViewColumnIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 180,
              p: 1
            }
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
            pb: 1
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: 'text.secondary' }}
          >
            Toggle Columns
          </Typography>
          <IconButton size="small" onClick={handleClose} sx={{ p: 0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {table.getAllLeafColumns().map((column) => {
          if (!column.getCanHide()) return null;

          return (
            <Box key={column.id} sx={{ px: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />
                }
                label={
                  <Typography variant="body2">
                    {typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : column.id}
                  </Typography>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Box>
          );
        })}
      </Menu>
    </>
  );
}
