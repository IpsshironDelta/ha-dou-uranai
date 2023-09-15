import React, 
     { useState , 
       useEffect}    from 'react'
import Button        from '@mui/material/Button'
import Grid          from '@mui/material/Grid'
import Box           from '@mui/material/Box'
import Container     from '@mui/material/Container'
import Typography    from '@mui/material/Typography'
import { useHistory } from "react-router-dom";
import Header from "../Header"
import KojinEditButton from "./KojinEditButton"
import { styled }         from '@mui/material/styles';
import Table              from '@mui/material/Table';
import TableBody          from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableContainer     from '@mui/material/TableContainer';
import TableHead          from '@mui/material/TableHead';
import TableRow           from '@mui/material/TableRow';
import Paper              from '@mui/material/Paper';
import { db }               from '../../firebase'
import { doc , 
         collection,
         getDocs ,
         updateDoc,}        from 'firebase/firestore'
import { firebaseApp }      from "../../firebase"
import Dialog from './Dialog'

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const Kojinkantei_Data = "Kojinkantei_Data"

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

function 個人鑑定編集(data) {
  const [kanteidata , setKanteiData] = useState()
  const DataAry = []

  // 初回起動時
  useEffect(() => {
    fetchKojinKanteiData()
  },[])

  // firestoreから個人鑑定データの情報取得
  const fetchKojinKanteiData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, Kojinkantei_Data)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        DataAry.push({
          ...document.data(),
        })
      })
    }).then(()=>{
      console.log("DataAry : " , DataAry)
      setKanteiData([...DataAry])
    })
    console.log(DataAry);
  }

  const history = useHistory()

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">個人鑑定データ編集</Typography >
            <BootstrapButton 
              disableRipple
              id      = "update"
              text    = "編集した情報で再取得する"
              variant = "contained"
              xs      = "12"
              onClick = {fetchKojinKanteiData}
              >編集した情報で再取得する</BootstrapButton>
          </Grid>

          {/* データ表示領域 */}
          <Grid item xs={12} align="center">

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {/* ヘッダー部分 */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">本宿星</StyledTableCell>
                    <StyledTableCell align="center">1.性格</StyledTableCell>
                    <StyledTableCell align="center">2.適職</StyledTableCell>
                    <StyledTableCell align="center">3.お金</StyledTableCell>
                    <StyledTableCell align="center">4.健康</StyledTableCell>
                    <StyledTableCell align="center">5.恋愛</StyledTableCell>
                    <StyledTableCell align="center">6.開運</StyledTableCell>
                  </TableRow>
                </TableHead>

                {/* ボディー部分 */}
                <TableBody>
                  {kanteidata ? (kanteidata.sort().map((item) => (
                  <StyledTableRow key={item.num}>
                    <StyledTableCell 
                      align="center" 
                      key={item.num}>{item.yado}</StyledTableCell>
                    <StyledTableCell align="center" key={item.num} >
                      <Dialog 
                        title = {item.sub_seikaku}
                        text  = {item.seikaku}
                        id    = {item.num}
                        type  = "seikaku"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.num}>
                      <Dialog 
                        title = {item.sub_tekisyoku}
                        text  = {item.tekisyoku}
                        id    = {item.num}
                        type  = "tekisyoku"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.num}>
                      <Dialog 
                        title = {item.sub_okane}
                        text  = {item.okane}
                        id    = {item.num}
                        type  = "okane"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.num}>
                      <Dialog 
                        title = {item.sub_kenkou}
                        text  = {item.kenkou}
                        id    = {item.num}
                        type  = "kenkou"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.num}>
                      <Dialog 
                        title = {item.sub_renai}
                        text  = {item.renai}
                        id    = {item.num}
                        type  = "renai"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.num}>
                      <Dialog 
                        title = {item.sub_kaiunn}
                        text  = {item.kaiunn}
                        id    = {item.id}
                        tyep  = "kaiunn"/></StyledTableCell>
                  </StyledTableRow>
                ))) : 
                  <StyledTableRow >
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="left">-</StyledTableCell>
                    </StyledTableRow>}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>

          <Grid item xs={4} align="center">
            <KojinEditButton
              id      = "kojinback"
              text    = "個人鑑定画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/kojin"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 個人鑑定編集;
