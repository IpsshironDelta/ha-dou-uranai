import React, 
     { useState , 
       useEffect}         from 'react'
import { styled }         from '@mui/material/styles';
import Table              from '@mui/material/Table';
import TableBody          from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableContainer     from '@mui/material/TableContainer';
import TableHead          from '@mui/material/TableHead';
import TableRow           from '@mui/material/TableRow';
import Paper              from '@mui/material/Paper';
import { TextField }      from '@mui/material';
import { doc , 
       collection,
       getDocs ,
       updateDoc,}        from 'firebase/firestore'
import { firebaseApp }    from "../../firebase"
import { db }             from '../../firebase'


// ------------------定数------------------
const collectionDayUnHyouData = "DayUnHyouData"

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
  sycle,
  protein,
) {
  return { name, calories, fat, carbs, sycle, protein };
}

const rows = [
  createData('1日', '木', "井宿", "栄", "転換期","ここにバイオリズムの分取が表示されます。"),
  createData('2日', '金', "鬼宿", "業", "活動期","ここにバイオリズムの分取が表示されます。"),
  createData('3日', '土', "柳宿", "親", "暗黒期間","ここにバイオリズムの分取が表示されます。"),
  createData('4日', '日', "星宿", "友", "活動期","ここにバイオリズムの分取が表示されます。"),
  createData('5日', '月', "張宿", "懐", "転換期","ここにバイオリズムの分取が表示されます。"),
];

export default function DayDataTable() {
  // ------------------入力系変数------------------
  const [daydata, setDayData] = useState("")    // 日運表を格納
  const [getuid , setGetUID]  = useState("")  // ユーザーID用
  const DayDataAry = []

  // 初回読み込み
  useEffect(() => {
    fetchDayData()
    console.log("useEffect通過")
  },[getuid])

  // firestoreから日運表の情報取得
  const fetchDayData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, collectionDayUnHyouData)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        DayDataAry.push({
          ...document.data(),
        })
      })
    }).then(()=>{
      console.log("DayDataAry : " , DayDataAry)
      setDayData([...DayDataAry])
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>日</StyledTableCell>
            <StyledTableCell align="center">曜日</StyledTableCell>
            <StyledTableCell align="center">宿</StyledTableCell>
            <StyledTableCell align="center">バイオリズム</StyledTableCell>
            <StyledTableCell align="center">サイクル</StyledTableCell>
            <StyledTableCell align="center">あなたの日運バイオリズム<br/>(※運気低迷の暗黒期間は吉日であっても注意が必要です。)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {daydata ? (daydata.map((item) => (
            <StyledTableRow key={item.DayBaiorizumNum}>
              <StyledTableCell align="center">{item.DayBaiorizumNum}</StyledTableCell>
              <StyledTableCell align="center">{item.DayBaiorizumNum}</StyledTableCell>
              <StyledTableCell align="center">{item.DayBaiorizumNum}</StyledTableCell>
              <StyledTableCell align="center">{item.DayRizum}</StyledTableCell>
              <StyledTableCell align="center">{item.DayCycle}</StyledTableCell>
              <StyledTableCell align="left">{item.DayBaiorizumText}</StyledTableCell>
            </StyledTableRow>
          ))) : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
