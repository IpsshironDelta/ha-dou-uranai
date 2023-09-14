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
  number,
  syuku,
  yomikata,
) {
  return { number, syuku, yomikata };
}

const rows = [
  createData('1', '斗宿', "とうしゅく"),
  createData('2', '斗宿', "とうしゅく"),
  createData('3', '斗宿', "とうしゅく"),
  createData('4', '斗宿', "とうしゅく"),
  createData('5', '斗宿', "とうしゅく"),
  createData('6', '斗宿', "とうしゅく"),
  createData('7', '斗宿', "とうしゅく"),
  createData('8', '斗宿', "とうしゅく"),
  createData('9', '斗宿', "とうしゅく"),
  createData('10', '斗宿', "とうしゅく"),
  createData('11', '斗宿', "とうしゅく"),
  createData('12', '斗宿', "とうしゅく"),
  createData('13', '斗宿', "とうしゅく"),
  createData('14', '斗宿', "とうしゅく"),
  createData('15', '斗宿', "とうしゅく"),
  createData('16', '斗宿', "とうしゅく"),
  createData('17', '斗宿', "とうしゅく"),
  createData('18', '斗宿', "とうしゅく"),
  createData('19', '斗宿', "とうしゅく"),
  createData('20', '斗宿', "とうしゅく"),
  createData('21', '斗宿', "とうしゅく"),
  createData('22', '斗宿', "とうしゅく"),
  createData('23', '斗宿', "とうしゅく"),
  createData('24', '斗宿', "とうしゅく"),
  createData('25', '斗宿', "とうしゅく"),
  createData('26', '斗宿', "とうしゅく"),
  createData('27', '斗宿', "とうしゅく"),
];

export default function YearDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>28年周期番号</StyledTableCell>
            <StyledTableCell align="center">年運の宿</StyledTableCell>
            <StyledTableCell align="center">読み方</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.number}</StyledTableCell>
              <StyledTableCell align="center">{row.syuku}</StyledTableCell>
              <StyledTableCell align="left">{row.yomikata}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
