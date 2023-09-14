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
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('2023年', '30歳', "井宿", "栄", "ここにバイオリズムの分取が表示されます。"),
  createData('2023年', '30歳', "鬼宿", "業", "ここにバイオリズムの分取が表示されます。"),
  createData('2023年', '30歳', "柳宿", "親", "ここにバイオリズムの分取が表示されます。"),
  createData('2023年', '30歳', "星宿", "友", "ここにバイオリズムの分取が表示されます。"),
  createData('2023年', '30歳', "張宿", "懐", "ここにバイオリズムの分取が表示されます。"),
];

export default function YearDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>年</StyledTableCell>
            <StyledTableCell align="center">年齢</StyledTableCell>
            <StyledTableCell align="center">宿</StyledTableCell>
            <StyledTableCell align="center">バイオリズム</StyledTableCell>
            <StyledTableCell align="center">あなたの年運バイオリズム</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
              <StyledTableCell align="center">{row.carbs}</StyledTableCell>
              <StyledTableCell align="left">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
