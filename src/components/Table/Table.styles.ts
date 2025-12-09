import styled from '@emotion/styled';
import { Table, TableContainer, TableHead, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
`;

export const StyledTable = styled(Table)`
  border-spacing: 0 8px;
  border: none;
  border-collapse: separate;
`;

export const StyledTableRow = styled(TableRow)`
  padding: 16px;
  font-weight: 400;
  font-size: 16px;
  color: #424245;
`;

export const StyledTableHeader = styled(TableHead)`
  background-color: #4169e2;
  font-weight: 400;
  font-size: 16px;
  border-radius: 6px;

  tr {
    height: 49px;
  }

  .MuiTableCell-root {
    padding: 20px 12px 13px 15px;
    color: #ffffff;
    border: none;
    background-color: #4169e2;
  }
`;
