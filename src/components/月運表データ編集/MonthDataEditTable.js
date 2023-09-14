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
  rizum,
  baiorizum,
) {
  return { number, rizum, baiorizum };
}

const rows = [
  createData('1', '命', "月運バイオリズム修正"),
  createData('2', '親', "月運バイオリズム修正"),
  createData('3', '友', "月運バイオリズム修正"),
  createData('4', '壊', "月運バイオリズム修正"),
  createData('5', '成', "月運バイオリズム修正"),
  createData('6', '危', "月運バイオリズム修正"),
  createData('7', '命', "月運バイオリズム修正"),
  createData('8', '命', "月運バイオリズム修正"),
  createData('9', '星', "月運バイオリズム修正"),
  createData('10', '宿', "月運バイオリズム修正"),
  createData('11', '宿', "月運バイオリズム修正"),
  createData('12', '宿', "月運バイオリズム修正"),
  createData('13', '宿', "月運バイオリズム修正"),
  createData('14', '宿', "月運バイオリズム修正"),
  createData('15', '危', "月運バイオリズム修正"),
  createData('16', '宿', "月運バイオリズム修正"),
  createData('17', '宿', "月運バイオリズム修正"),
  createData('18', '宿', "月運バイオリズム修正"),
  createData('19', '宿', "月運バイオリズム修正"),
  createData('20', '宿', "月運バイオリズム修正"),
  createData('21', '宿', "月運バイオリズム修正"),
  createData('22', '危', "月運バイオリズム修正"),
  createData('23', '宿', "月運バイオリズム修正"),
  createData('24', '宿', "月運バイオリズム修正"),
  createData('25', '宿', "月運バイオリズム修正"),
  createData('26', '宿', "月運バイオリズム修正"),
];

export default function YearDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>バイオリズム番号</StyledTableCell>
            <StyledTableCell align="center">リズム</StyledTableCell>
            <StyledTableCell align="center">月運バイオリズム</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.number}</StyledTableCell>
              <StyledTableCell align="center">{row.rizum}</StyledTableCell>
              <StyledTableCell align="left">{row.baiorizum}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
