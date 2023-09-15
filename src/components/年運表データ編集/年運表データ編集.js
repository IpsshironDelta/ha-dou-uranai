import React, 
     { useState , 
       useEffect}         from 'react'
import Button             from '@mui/material/Button'
import Grid               from '@mui/material/Grid'
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import { useHistory }     from "react-router-dom";
import Header             from "../Header"
import YearDataEditButton from "./YearDataEditButton"
import YearDataEditTable  from "./YearDataEditTable"
import { styled }         from '@mui/material/styles';
import Table              from '@mui/material/Table';
import TableBody          from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableContainer     from '@mui/material/TableContainer';
import TableHead          from '@mui/material/TableHead';
import TableRow           from '@mui/material/TableRow';
import Paper              from '@mui/material/Paper';
import { db }             from '../../firebase'
import { doc , 
         collection,
         getDocs ,
         updateDoc,}      from 'firebase/firestore'
import { firebaseApp }    from "../../firebase"
import Dialog             from './Dialog'

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const NennUnnHyouData = "YearUnHyouData"

////////////////////////////////////////////
// スタイル
////////////////////////////////////////////
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#ff5757',
  borderColor: '#EC6671',
  color : '#ffffff',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#EC6671',
    borderColor: '#EC6671',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#EC6671',
    borderColor: '#EC6671',
  },
})
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5757",
    color: "#ffffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function 年運表データ編集() {
  const [baiorizum , setBaiorizum] = useState()
  const DataAry = []
  const history = useHistory()

  // 初回起動時
  useEffect(() => {
    fetchNennUnnBaiorizumData()
  },[])

  // firestoreから年運表データの情報取得
  const fetchNennUnnBaiorizumData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, NennUnnHyouData)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        DataAry.push({
          ...document.data(),
        })
      })
    }).then(()=>{
      console.log("DataAry : " , DataAry)
      setBaiorizum([...DataAry])
    })
    console.log(DataAry);
  }

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">年運表データ編集</Typography >
            <Typography variant="h6">「年運バイオリズム」を書き換えると自動出力される鑑定文を変えることが出来ます。</Typography >
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={12} align="center">
            <BootstrapButton
              disableRipple
              id      = "yeardataupdate"
              text    = "編集した情報で表示する"
              variant = "contained"
              xs      = "12"
              onClick = {fetchNennUnnBaiorizumData}
              >編集した情報で再表示する</BootstrapButton>
          </Grid>

          {/* バイオリズム表領域 */}
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="center">
            <Grid item xs={12} align="left">
              <Typography variant="h6">バイオリズム表</Typography >
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {/* ヘッダー部分 */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">バイオリズム番号</StyledTableCell>
                    <StyledTableCell align="center">リズム</StyledTableCell>
                    <StyledTableCell align="center">年運バイオリズム</StyledTableCell>
                  </TableRow>
                </TableHead>

                {/* ボディー部分 */}
                <TableBody>
                  {baiorizum ? (baiorizum.sort().map((item) => (
                  <StyledTableRow key={item.YearBaiorizumNum}>
                    <StyledTableCell 
                      align="center" 
                      key={item.YearBaiorizumNum}>{item.YearBaiorizumNum}</StyledTableCell>
                    <StyledTableCell
                      align="center" 
                      key={item.YearRizum}>{item.YearRizum}</StyledTableCell>
                    <StyledTableCell align="center" key={item.YearBaiorizumNum} >
                      <Dialog 
                        title = {item.sub_Text}
                        text  = {item.YearBaiorizumText}
                        id    = {item.YearBaiorizumNum}
                        type  = "YearBaiorizumText"/></StyledTableCell>
                  </StyledTableRow>
                ))) : 
                  <StyledTableRow >
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                    </StyledTableRow>}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <YearDataEditButton
              id      = "yeardataback"
              text    = "年運表画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/yearchart"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 年運表データ編集;
