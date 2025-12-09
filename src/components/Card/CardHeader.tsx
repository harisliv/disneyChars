import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface ICardHeaderProps {
  title: string;
  actions?: ReactNode;
}

export function CardHeader({ title, actions }: ICardHeaderProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        minHeight: 56,
        borderBottom: '1px solid',
        borderColor: 'divider',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h6" component="div" sx={{ color: 'text.primary' }}>
        {title}
      </Typography>
      {actions}
    </Toolbar>
  );
}
