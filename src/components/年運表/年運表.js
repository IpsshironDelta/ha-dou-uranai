import React, 
     { useState , 
       useEffect}         from 'react'
import Button             from '@mui/material/Button'
import { styled }         from '@mui/material/styles';
import Grid               from '@mui/material/Grid'
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import { useHistory }     from "react-router-dom";
import Header             from "../Header"
import YearDataTable      from './YearDataTable'
import YearDataButton     from "./YearDataButton"
import YearDataYearSelect from "./YearDataYearSelect"
import Table              from '@mui/material/Table';
import TableBody          from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableContainer     from '@mui/material/TableContainer';
import TableHead          from '@mui/material/TableHead';
import TableRow           from '@mui/material/TableRow';
import Paper              from '@mui/material/Paper';
import store              from '../../store'
import {NENN_UNN_BAIORIZUM ,
       SYUUKI}            from "../ObjectData"
import { db }             from '../../firebase'
import { doc , 
        collection,
        getDocs ,
        updateDoc,}       from 'firebase/firestore'
import { firebaseApp }    from "../../firebase"

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

function 年運表() {
  // ------------------入力系変数------------------
  const [yeardata  , setYearData]  = useState()   // 年運表を格納
  const [year      , setYear]      = useState("") // 年を格納
  const [month     , setMonth]     = useState("") // 月を格納
  const [maxdate   , setMaxDate]   = useState("") // 月の最大日数
  const [getage    , setGetAge]    = useState("") // 取得した年齢
  const [fetchdata , setFetchData] = useState("") // firebaseから取得したデータ
  const history         = useHistory()
  const YearDataAry     = []
  const FirebaseDataAry = []
  
  // firebaseから年運表データを取得
  const fetchNennUnnData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, NennUnnHyouData )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {        
        // バイオリズム取得
        const BuffBaiorizum = NENN_UNN_BAIORIZUM.filter(item => item.BaiorizumNum == document.data().YearBaiorizumNum)
        console.log("書き換え前 => " , BuffBaiorizum[0].BaiorizumText)
        BuffBaiorizum[0].BaiorizumText = document.data().YearBaiorizumText
        console.log("書き換え後 => " , BuffBaiorizum[0].BaiorizumText)
        FirebaseDataAry.push({
          ...document.data(),
        })  
      })
    }).then(()=>{
      setFetchData([...FirebaseDataAry])
    })
  }

  // 初回起動時の処理
  useEffect(() => {
    console.log("================年運表初回起動================")
    // firebaseから年運表データを取得
    fetchNennUnnData()

    // 日付を取得する
    // 今日の日付データをcurrentDateに格納
    const currentDate = new Date()
    // 年・月を取得
    setYear(currentDate.getFullYear())

    var BuffAge
    BuffAge =  Number(currentDate.getFullYear()) - Number(store.getState().userYear)
    console.log(currentDate.getFullYear() , store.getState().userYear,BuffAge)

    var i
    var NennUnn28Num     // 年運28周期番号
    var NennUnnYadoNum   // 年運宿曜番号
    var BaiorizumNum     // バイオリズム番号
    for(i = 0 ; i <=30 ; i++){
      NennUnn28Num = (Number(currentDate.getFullYear()) + i - 1897 ) % 28 +1 
      console.log(" i = " , i , "NennUnn28Num => " ,NennUnn28Num)

      // 28周期の宿名取得
      const BuffSyuuki = SYUUKI.filter(item => item.SyuukiNum == NennUnn28Num)
      // 宿名を取得
      console.log(BuffSyuuki[0].SyuukiYado)

      // 年運28年主記番号　→　年運宿曜番号　変換
      if (NennUnn28Num <= 2){
        NennUnnYadoNum = 8
        console.log("1.NennUnnYadoNum => " ,NennUnnYadoNum)
      }else if(NennUnn28Num <= 21){
        NennUnnYadoNum = NennUnn28Num + 6
        console.log("2.NennUnnYadoNum => " ,NennUnnYadoNum)
      }else{
        NennUnnYadoNum = NennUnn28Num - 21
        console.log("3.NennUnnYadoNum => " ,NennUnnYadoNum)
      }

      // バイオリズム番号取得
      console.log("宿曜番号 => " , store.getState().syukuYouRekiNum)
      if (NennUnnYadoNum < Number(store.getState().syukuYouRekiNum)){
        BaiorizumNum = 27 + NennUnnYadoNum - Number(store.getState().syukuYouRekiNum)
        console.log("1.BaiorizumNum => " , BaiorizumNum)
      }else{
        BaiorizumNum = NennUnnYadoNum - Number(store.getState().syukuYouRekiNum)
        console.log("2.BaiorizumNum => " , BaiorizumNum)
      }

      // バイオリズム取得
      const BuffBaiorizum = NENN_UNN_BAIORIZUM.filter(item => item.BaiorizumNum == BaiorizumNum)
      console.log("BuffBaiorizum => " , BuffBaiorizum[0].Rizum)

      YearDataAry.push({
        Year              : currentDate.getFullYear() + i ,
        Age               : BuffAge + i  ,
        YadoName          : BuffSyuuki[0].SyuukiYado,
        YearRizum         : BuffBaiorizum[0].Rizum,
        YearBaiorizumText : BuffBaiorizum[0].BaiorizumText
      })
    }
    setYearData([...YearDataAry])
    }, [])

  // 「年運表を取得する」ボタンクリック時の処理
  const getNennUnHyou = () => {
    console.log("================年運表更新時================")
    // firebaseから年運表データを取得
    fetchNennUnnData()

    // 日付を取得する
    // 今日の日付データをcurrentDateに格納
    const currentDate = new Date()

    var BuffAge
    BuffAge =  Number(year) - Number(store.getState().userYear)
    console.log(currentDate.getFullYear() , year , BuffAge)

    var i
    var NennUnn28Num     // 年運28周期番号
    var NennUnnYadoNum   // 年運宿曜番号
    var BaiorizumNum     // バイオリズム番号
    for(i = 0 ; i <=30 ; i++){
      NennUnn28Num = (Number(year) + i - 1897 ) % 28 +1 
      console.log(" i = " , i , "NennUnn28Num => " ,NennUnn28Num)

      // 28周期の宿名取得
      const BuffSyuuki = SYUUKI.filter(item => item.SyuukiNum == NennUnn28Num)
      // 宿名を取得
      console.log(BuffSyuuki[0].SyuukiYado)

      // 年運28年主記番号　→　年運宿曜番号　変換
      if (NennUnn28Num <= 2){
        NennUnnYadoNum = 8
        console.log("1.NennUnnYadoNum => " ,NennUnnYadoNum)
      }else if(NennUnn28Num <= 21){
        NennUnnYadoNum = NennUnn28Num + 6
        console.log("2.NennUnnYadoNum => " ,NennUnnYadoNum)
      }else{
        NennUnnYadoNum = NennUnn28Num - 21
        console.log("3.NennUnnYadoNum => " ,NennUnnYadoNum)
      }

      // バイオリズム番号取得
      console.log("宿曜番号 => " , store.getState().syukuYouRekiNum)
      if (NennUnnYadoNum < Number(store.getState().syukuYouRekiNum)){
        BaiorizumNum = 27 + NennUnnYadoNum - Number(store.getState().syukuYouRekiNum)
        console.log("1.BaiorizumNum => " , BaiorizumNum)
      }else{
        BaiorizumNum = NennUnnYadoNum - Number(store.getState().syukuYouRekiNum)
        console.log("2.BaiorizumNum => " , BaiorizumNum)
      }

      // バイオリズム取得
      const BuffBaiorizum = NENN_UNN_BAIORIZUM.filter(item => item.BaiorizumNum == BaiorizumNum)
      console.log("BuffBaiorizum => " , BuffBaiorizum[0].BaiorizumNum)
      console.log("i => " , i)
      YearDataAry.push({
        Year              : Number(year) + i ,
        Age               : BuffAge + i  ,
        YadoName          : BuffSyuuki[0].SyuukiYado,
        YearRizum         : BuffBaiorizum[0].Rizum,
        YearBaiorizumText : BuffBaiorizum[0].BaiorizumText
      })
      console.log(YearDataAry)
    }
    setYearData([...YearDataAry])

  }

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>

          {/* 画面タイトル表示 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">年運表</Typography >
          </Grid>

          {/* ボタン表示郡 */}
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs = {2} align = "right">
            <YearDataYearSelect
              id        = "SelectYear"
              label     = "年を選択"
              value     = {year}
              onChange  ={(e) =>
                setYear(e.target.value)}
              onClick   ={(e) =>
                setYearData(0)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography variant="h5">年</Typography>
          </Grid>
          <Grid item xs={7} align="left">
            <BootstrapButton 
              disableRipple
              id      = "getnennunn"
              text    = "年運表を再表示する"
              variant = "contained"
              xs      = "12"
              onClick = {getNennUnHyou}
              >年運表を再表示する</BootstrapButton>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          {/* 年運表テーブルの表示 */}
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="left">

            <Typography variant="h5">年運表</Typography >
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
                    {yeardata ? (yeardata.map((item) => (
                    <StyledTableRow key={item.Year}>
                      <StyledTableCell align="center">{item.Year}年</StyledTableCell>
                      <StyledTableCell align="center">{item.Age}歳</StyledTableCell>
                      <StyledTableCell align="center">{item.YadoName}</StyledTableCell>
                      <StyledTableCell align="center">{item.YearRizum}</StyledTableCell>
                      <StyledTableCell align="left">{item.YearBaiorizumText}</StyledTableCell>
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

            <Typography 
              sx = {{
                fontSize      : 14,}}>
                ※年運の切り替わりは旧暦の1月1日です。毎年1月下旬から2月下旬にかけて年運が切り替わるとみてください。</Typography >
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>
          
          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <YearDataButton
              id      = "backhome"
              text    = "ホーム画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/"/>
          </Grid>
          <Grid item xs={4} align="center">
            <YearDataButton
              id      = "yeardataedit"
              text    = "年運表データを修正する"
              variant = "contained"
              xs      = "12"
              link    = "/yearchart/edit"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 年運表;
