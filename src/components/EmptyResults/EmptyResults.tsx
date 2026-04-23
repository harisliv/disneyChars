import { TableBody, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';
import { CenteredColumnContainerTextCenter } from '../shared';

type TEmptyResultsProps = {
  colSpan: number;
};

export function EmptyResults({ colSpan }: TEmptyResultsProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} sx={{ border: 'none', py: 8 }}>
          <CenteredColumnContainerTextCenter>
            <InboxIcon
              sx={{
                fontSize: 120,
                color: 'text.secondary',
                mb: 3,
                opacity: 0.5
              }}
            />
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color="text.secondary"
            >
              No Characters Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400 }}
            >
              There are no Disney characters to display at the moment. Please
              try again later or check your search criteria.
            </Typography>
          </CenteredColumnContainerTextCenter>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
