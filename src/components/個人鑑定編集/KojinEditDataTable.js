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
  honsyukusei,
  seikaku,
  tekisyoku,
  money,
  helth,
  love,
  kaiunn,
) {
  return { number, honsyukusei, seikaku, tekisyoku, money, helth , love , kaiunn };
}

const rows = [
  createData('1', '角宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('2', '心宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('3', '虚宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('4', '危宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('5', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('6', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('7', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('8', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('9', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('10', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('11', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('12', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('13', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('14', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('15', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('16', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('17', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('18', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('19', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('20', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('21', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('22', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('23', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('24', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('25', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('26', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
  createData('27', '星宿', "性格の文言を表示/修正", "適職を修正", "お金を修正","健康を修正","恋愛を修正","開運を修正"),
];

export default function YearDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>No.</StyledTableCell>
            <StyledTableCell align="center">本宿星</StyledTableCell>
            <StyledTableCell align="center">1.性格</StyledTableCell>
            <StyledTableCell align="center">2.適職</StyledTableCell>
            <StyledTableCell align="center">3.お金</StyledTableCell>
            <StyledTableCell align="center">4.健康</StyledTableCell>
            <StyledTableCell align="center">5.恋愛</StyledTableCell>
            <StyledTableCell align="center">6.開運</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.number}</StyledTableCell>
              <StyledTableCell align="center">{row.honsyukusei}</StyledTableCell>
              <StyledTableCell align="left">{row.seikaku}</StyledTableCell>
              <StyledTableCell align="left">{row.tekisyoku}</StyledTableCell>
              <StyledTableCell align="left">{row.money}</StyledTableCell>
              <StyledTableCell align="left">{row.helth}</StyledTableCell>
              <StyledTableCell align="left">{row.love}</StyledTableCell>
              <StyledTableCell align="left">{row.kaiunn}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
