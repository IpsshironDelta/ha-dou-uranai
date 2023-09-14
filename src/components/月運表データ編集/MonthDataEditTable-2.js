import React, 
     { useState , 
       useEffect}    from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EC6671",
    color: "#ffffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  month,
  syuku,
  yomikata,
  yadoNumber,
) {
  return { month, syuku, yomikata , yadoNumber };
}

const rows = [
  createData('1', '斗宿', "とうしゅく","10"),
  createData('2', '斗宿', "とうしゅく","12"),
  createData('3', '斗宿', "とうしゅく","14"),
  createData('4', '斗宿', "とうしゅく","16"),
  createData('5', '斗宿', "とうしゅく","18"),
  createData('6', '斗宿', "とうしゅく","20"),
  createData('7', '斗宿', "とうしゅく","22"),
  createData('8', '斗宿', "とうしゅく","25"),
  createData('9', '斗宿', "とうしゅく","1"),
  createData('10', '斗宿', "とうしゅく","3"),
  createData('11', '斗宿', "とうしゅく","5"),
  createData('12', '斗宿', "とうしゅく","8"),
];

export default function YearDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>月</StyledTableCell>
            <StyledTableCell align="center">月運の宿</StyledTableCell>
            <StyledTableCell align="center">読み方</StyledTableCell>
            <StyledTableCell align="center">宿番号</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.month}</StyledTableCell>
              <StyledTableCell align="center">{row.syuku}</StyledTableCell>
              <StyledTableCell align="left">{row.yomikata}</StyledTableCell>
              <StyledTableCell align="left">{row.yadoNumber}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
