import React, 
     { useState , 
       useEffect}            from 'react'
import Button                from '@mui/material/Button'
import Grid                  from '@mui/material/Grid'
import Box                   from '@mui/material/Box'
import Container             from '@mui/material/Container'
import Typography            from '@mui/material/Typography'
import { useHistory }        from "react-router-dom";
import Header                from "../Header"
import AisyouDataEdit        from "./AisyouDataEdit"
import { styled }            from '@mui/material/styles';
import Table                 from '@mui/material/Table';
import TableBody             from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses }    from '@mui/material/TableCell';
import TableContainer        from '@mui/material/TableContainer';
import TableHead             from '@mui/material/TableHead';
import TableRow              from '@mui/material/TableRow';
import Paper                 from '@mui/material/Paper';
import store                 from '../../store'
import { db }                from '../../firebase'
import { doc , 
         collection,
         getDocs ,
         updateDoc,}         from 'firebase/firestore'
import { firebaseApp }       from "../../firebase"
import TextField             from '@mui/material/TextField';
import Dialog                from './Dialog'

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const AisyouKanteiData = "AisyouKanteiData"
const KyoriData        = "AisyouKanteiDataKyori"

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

function 相性鑑定編集() {
  const history = useHistory()

  const [kanteidata , setKanteiData] = useState()
  const [kyoridata  , setKyoriData ] = useState()
  const DataAry  = []
  const KyoriAry = []

  // 初回起動時
  useEffect(() => {
    fetchKojinKanteiData()
    fetchKyoriData()
  },[])

  // 再取得ボタンクリック時の処理
  const handleUpDate = () => {
    fetchKojinKanteiData()
    fetchKyoriData()
  }

  // firestoreから相性鑑定データの情報取得
  const fetchKojinKanteiData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, AisyouKanteiData)).then((querySnapshot)=>{
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
  
  // firestoreから距離データの情報取得
  const fetchKyoriData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, KyoriData )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        KyoriAry.push({
          ...document.data(),
        })
      })
    }).then(()=>{
      console.log("KyoriAry : " , KyoriAry )
      setKyoriData([...KyoriAry])
    })
    console.log(KyoriAry);
  }

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          {/* タイトル名称表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">相性鑑定データ編集</Typography >
            <Typography variant="h6">相性診断の鑑定文データ(1.項～4.項)を書き換えることで自動出力される鑑定文を変更することが出来ます。</Typography >
            <BootstrapButton 
              disableRipple
              id      = "update"
              text    = "編集した情報で再表示する"
              variant = "contained"
              xs      = "12"
              onClick = {handleUpDate}
              >編集した情報で再表示する</BootstrapButton>
          </Grid>

          {/* 項目1～項目4の表示領域 */}
          <Grid item xs={12} align="center">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {/* ヘッダー部分 */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">関係の名称</StyledTableCell>
                    <StyledTableCell align="center">1.お二人の関係</StyledTableCell>
                    <StyledTableCell align="center">2.基本的な相性</StyledTableCell>
                    <StyledTableCell align="center">3.恋愛関係の相性</StyledTableCell>
                    <StyledTableCell align="center">4.仕事関係の相性</StyledTableCell>
                  </TableRow>
                </TableHead>

                {/* ボディー部分 */}
                <TableBody>
                  {kanteidata ? (kanteidata.sort().map((item) => (
                  <StyledTableRow key={item.Num}>
                    <StyledTableCell 
                      align="center" 
                      key={item.Num}>{item.RelationshipName}</StyledTableCell>
                    <StyledTableCell align="center" key={item.Num} >
                      <Dialog 
                        title = {item.sub_kankei}
                        text  = {item.kankei}
                        id    = {item.Num}
                        type  = "kankei"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.Num}>
                      <Dialog 
                        title = {item.sub_aisyou}
                        text  = {item.gutaitekin_aisyou}
                        id    = {item.Num}
                        type  = "gutatekin_aisyou"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.Num}>
                      <Dialog 
                        title = {item.sub_renai}
                        text  = {item.renai_aisyou}
                        id    = {item.Num}
                        type  = "renai_aisyou"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.Num}>
                      <Dialog 
                        title = {item.sub_sigoto}
                        text  = {item.sigoto_aisyou}
                        id    = {item.Num}
                        type  = "sigoto_aisyou"/></StyledTableCell>
                  </StyledTableRow>
                ))) : 
                  <StyledTableRow >
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                    </StyledTableRow>}
                </TableBody>
              </Table>
              </TableContainer>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h6">相性診断の鑑定文データ(近距離、中距離、長距離)を書き換えることで自動出力される鑑定文を変更することが出来ます。</Typography >
            <BootstrapButton 
              disableRipple
              id      = "update"
              text    = "編集した情報で再表示する"
              variant = "contained"
              xs      = "12"
              onClick = {handleUpDate}
              >編集した情報で再表示する</BootstrapButton>
          </Grid>

          {/* 項目5～項目6の表示領域 */}
          <Grid item xs={12} align="center">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                {/* ヘッダー部分 */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">関係の名称</StyledTableCell>
                    <StyledTableCell align="center">近距離(命・業・胎を除く)</StyledTableCell>
                    <StyledTableCell align="center">中距離(命・業・胎を除く)</StyledTableCell>
                    <StyledTableCell align="center">遠距離(命・業・胎を除く)</StyledTableCell>
                  </TableRow>
                </TableHead>

                {/* ボディー部分 */}
                <TableBody>
                  {kyoridata ? (kyoridata.sort().map((item) => (
                  <StyledTableRow key={item.Num}>
                    <StyledTableCell 
                      align="center" 
                      key={item.Num}>{item.RelationshipName}</StyledTableCell>
                    <StyledTableCell align="center" key={item.Num} >
                      <Dialog 
                        title = {item.sub_kinkyori}
                        text  = {item.kinkyori}
                        id    = {item.Num}
                        type  = "kinkyori"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.Num}>
                      <Dialog 
                        title = {item.sub_tyuukyori}
                        text  = {item.tyuukyori}
                        id    = {item.Num}
                        type  = "tyuukyori"/></StyledTableCell>
                    <StyledTableCell align="center" key={item.Num}>
                      <Dialog 
                        title = {item.sub_enkyori}
                        text  = {item.enkyori}
                        id    = {item.Num}
                        type  = "enkyori"/></StyledTableCell>
                  </StyledTableRow>
                ))) : 
                  <StyledTableRow >
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                    </StyledTableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* ボタン表示領域 */}
          {/* <Grid item xs={4} align="center">
            <AisyouDataEdit
              id      = "aisyouupdate"
              text    = "更新する"
              variant = "contained"
              xs      = "12"
              link    = "/aisyou"/>
          </Grid> */}
          <Grid item xs={4} align="center">
            <AisyouDataEdit
              id      = "aisyouback"
              text    = "相性鑑定画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/aisyou"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 相性鑑定編集;
