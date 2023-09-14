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
  year,
) {
  return { number, syuku, yomikata , year };
}

const rows = [
  createData('1', '斗宿', "とうしゅく","2009年"),
  createData('2', '斗宿', "とうしゅく","2010年"),
  createData('3', '斗宿', "とうしゅく","2011年"),
  createData('4', '斗宿', "とうしゅく","2012年"),
  createData('5', '斗宿', "とうしゅく","2013年"),
  createData('6', '斗宿', "とうしゅく","2014年"),
  createData('7', '斗宿', "とうしゅく","2015年"),
  createData('8', '斗宿', "とうしゅく","2016年"),
  createData('9', '斗宿', "とうしゅく","2017年"),
  createData('10', '斗宿', "とうしゅく","2018年"),
  createData('11', '斗宿', "とうしゅく","2019年"),
  createData('12', '斗宿', "とうしゅく","2020年"),
  createData('13', '斗宿', "とうしゅく","2021年"),
  createData('14', '斗宿', "とうしゅく","2022年"),
  createData('15', '斗宿', "とうしゅく","2023年"),
  createData('16', '斗宿', "とうしゅく","2024年"),
  createData('17', '斗宿', "とうしゅく","2025年"),
  createData('18', '斗宿', "とうしゅく","2026年"),
  createData('19', '斗宿', "とうしゅく","2027年"),
  createData('20', '斗宿', "とうしゅく","2028年"),
  createData('21', '斗宿', "とうしゅく","2029年"),
  createData('22', '斗宿', "とうしゅく","2030年"),
  createData('23', '斗宿', "とうしゅく","2031年"),
  createData('24', '斗宿', "とうしゅく","2032年"),
  createData('25', '斗宿', "とうしゅく","2033年"),
  createData('26', '斗宿', "とうしゅく","2034年"),
  createData('27', '斗宿', "とうしゅく","2035年"),
  createData('28', '斗宿', "とうしゅく","2036年"),
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
            <StyledTableCell align="center">年　(※)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.number}</StyledTableCell>
              <StyledTableCell align="center">{row.syuku}</StyledTableCell>
              <StyledTableCell align="left">{row.yomikata}</StyledTableCell>
              <StyledTableCell align="left">{row.year}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
