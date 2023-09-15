import React, 
     { useState , 
       useEffect}         from 'react'
import Button             from '@mui/material/Button'
import { styled }         from '@mui/material/styles';
import Grid               from '@mui/material/Grid'
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import { useHistory , 
       withRouter}        from "react-router-dom";
import Header             from "../Header"
import DayDataYearSeledt  from "./DayDataYearSelect"
import DayDataMonthSeledt from "./DayDataMonthSelect"
import DayDataTable       from './DayDataTable'
import DayDataButton      from "./DayDataButton"
import Table              from '@mui/material/Table';
import TableBody          from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableContainer     from '@mui/material/TableContainer';
import TableHead          from '@mui/material/TableHead';
import TableRow           from '@mui/material/TableRow';
import Paper              from '@mui/material/Paper';
import store              from '../../store'
import {NICHI_UNN_HYOU , 
       TAIOUHYOU , 
       SYUKUYOUREKI}      from "../ObjectData"
import { db }             from '../../firebase'
import { doc , 
        collection,
        getDocs ,
        updateDoc,}       from 'firebase/firestore'
import { firebaseApp }    from "../../firebase"

////////////////////////////////////////////
// 定数
////////////////////////////////////////////
const weekday        = ["日","月","火","水","木","金","土"]
const DayUnnHyouData = "DayUnHyouData"

////////////////////////////////////////////
// スタイル
////////////////////////////////////////////
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5757",
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
});

function 日運表() {
  // ------------------入力系変数------------------
  const [daydata   , setDayData]   = useState([]) // 日運表を格納
  const [year      , setYear]      = useState("") // 年を格納
  const [month     , setMonth]     = useState("") // 月を格納
  const [maxdate   , setMaxDate]   = useState("") // 月の最大日数
  const [fetchdata , setFetchData] = useState("") // firebaseから取得したデータ
  var DayDataAry       = []
  var FirebaseDataAry  = []
  const history        = useHistory()

  // firebaseから月運表データを取得
  const fetchNichiUnnData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, DayUnnHyouData )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {        
        // バイオリズム取得
        const BuffBaiorizum = NICHI_UNN_HYOU.filter(item => item.DayBaiorizumNum == document.data().DayBaiorizumNum)
        console.log("書き換え前 => " , BuffBaiorizum[0].DayBaiorizumText)
        BuffBaiorizum[0].DayBaiorizumText = document.data().DayBaiorizumText
        console.log("書き換え後 => " , BuffBaiorizum[0].DayBaiorizumText)
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
    console.log("==================日運表初回起動==================")

    // firebaseから日運表データを取得
    fetchNichiUnnData()

    // 日付を取得する
    // 今日の日付データをcurrentDateに格納
    const currentDate = new Date()
    // 年・月を取得
    setYear(currentDate.getFullYear())
    setMonth(currentDate.getMonth() + 1)

    // 月の最大日数を取得
    var buffMaxDate
    buffMaxDate = getMaxDate(currentDate.getFullYear() , currentDate.getMonth() + 1)
    console.log(buffMaxDate)

    // 月の最大日数分繰り返す
    var BaiorizumNum
    var iDate
    for(iDate = 1 ; iDate <= buffMaxDate ; iDate++){
      // 現在日付(i日)の宿曜暦番号を取得する
      const BuffYear = SYUKUYOUREKI.filter(item => item.year == Number(currentDate.getFullYear()) && item.month == Number(currentDate.getMonth() + 1) && item.day == iDate)
      console.log("★宿曜番号 => " , BuffYear[0].num)
      getYadoName( BuffYear[0].num)

      // 宿曜暦名を取得する
      // バイオリズムを算出
      console.log(store.getState().nowSyukuYouRekiNum , store.getState().syukuYouRekiNum)
      if(Number(store.getState().nowSyukuYouRekiNum) < Number(store.getState().syukuYouRekiNum)){
        BaiorizumNum = 27 + Number(store.getState().nowSyukuYouRekiNum) - Number(store.getState().syukuYouRekiNum) 
        console.log("★BaiorizumNum => " , BaiorizumNum , "iDate => " , iDate)
      }else{
        BaiorizumNum = Number(store.getState().nowSyukuYouRekiNum) - Number(store.getState().syukuYouRekiNum)
        console.log("☆BaiorizumNum => " , BaiorizumNum , "iDate => " , iDate)
      }
      // 曜日を取得する
      var weekDay 
      weekDay = getWeekDay(iDate)
      console.log(weekDay , "曜日")
      // 日運表データから「リズム」、「サイクル」、「日運バイオリズム」を取得する
      getNichiUnData(BaiorizumNum , iDate , weekDay , DayDataAry)
    }
    setDayData([...DayDataAry])
   }, [])

  // 日運表データから「リズム」、「サイクル」、「日運バイオリズム」を取得する
  const getNichiUnData = (getNum , getDate , getWeekDay) => {
    const BuffNichiUnHyou = NICHI_UNN_HYOU.filter(item => item.DayBaiorizumNum == getNum)
    DayDataAry.push({
      Date             : getDate ,
      Youbi            : getWeekDay  ,
      YadoName         : store.getState().nowSyukuYouRekiName,
      DayBaiorizumNum  : BuffNichiUnHyou[0].DayBaiorizumNum,
      DayRizum         : BuffNichiUnHyou[0].DayRizum ,
      DayCycle         : BuffNichiUnHyou[0].DayCycle , 
      DayBaiorizumText : BuffNichiUnHyou[0].DayBaiorizumText
    })
    console.log("DayDataAry",DayDataAry)
  }

  // // 宿曜歴番号を算出する
  // const getCalcNumYado = (getNum , getYear , getMonth , getDay) => {
  //   console.log(getNum , getYear , getMonth , getDay)
  //   var numBuff = getNum // 宿曜暦番号を代入
  //   numBuff = numBuff -1
  //   var i
  //   var j
  //   // 月をループ
  //   for (i = 1 ; i <=12 ; i++){
  //     // 日をループ
  //     for(j = 1 ; j <= 31; j++){
  //       var date = new Date(getYear,i-1,j) // 月は「0」を起点とするので「-1」で調整
  //       var iMonth = date.getMonth() + 1;
  //       var result

  //       if(i==iMonth){
  //         result = "有効な日付"
  //         numBuff++ // 宿曜暦番号を加算

  //         // 宿曜暦番号は27が上限値
  //         if(numBuff > 27){
  //           numBuff = 1
  //         }
  //         if(i == getMonth && j == getDay){
  //           // 宿曜歴を取得する
  //           console.log(getMonth , "月" , getDay , "日： numBuff =>" , numBuff)
  //           getYadoName(numBuff)
  //         }
  
  //       } else {
  //         result = "★無効な日付★"
  //       }
  //     }
  //   }
  // }

  const getYadoName = (getNum) => {
  // 宿曜歴を取得する
    const BuffTaiou = TAIOUHYOU.filter(item => item.num == getNum)

    // 宿曜暦番号を代入
    store.getState().nowSyukuYouRekiNum = BuffTaiou[0].num
    console.log("宿曜暦更新(番号) => " , store.getState().nowSyukuYouRekiNum)

    // 宿名を代入
    store.getState().nowSyukuYouRekiName = BuffTaiou[0].name
    console.log("宿曜暦更新(宿名) => " , store.getState().nowSyukuYouRekiName)
  }

  // 月の最大日数を計算
  function getMaxDate(getYear , getMonth){
    if(getMonth == 4 || getMonth == 6 || getMonth == 9 || getMonth == 11){
      setMaxDate(30)
      console.log(30)
      return 30
    }else if(getMonth == 2){
      if(getYear % 4 == 0){
        setMaxDate(29)
        console.log(29)
        return 29
      }else{
        setMaxDate(28)
        console.log(28)
        return 28
      }
    }else{
      setMaxDate(31)
      console.log(31)
      return 31
    }
  }

  // 現在日時の曜日を取得
  const getWeekDay = (getDate) => {
    // 今日の日付データをcurrentDateに格納
    const currentDate = new Date()
    const nowYear = currentDate.getFullYear()
    const nowMonth = currentDate.getMonth() + 1
    const testDate = new Date(nowYear , nowMonth - 1 , getDate)
    return weekday[testDate.getDay()]
  }
  // 指定した日付の曜日を取得
  const getUpDateWeekDay = (getDate , getYear , getMonth) => {
    // 指定した日付データをcurrentDateに格納
    const inputDate = new Date(getYear , getMonth - 1 , getDate)
    return weekday[inputDate.getDay()]
  }

  // 日運表を取得するボタンクリック時の処理
  const getNichiUnHyou = () => {
    console.log("===================更新結果を表示=======================")
    
    // firebaseから日運表データを取得
    fetchNichiUnnData()

    // 月を上げる
    setMonth(month)

    // 月の最大日数を取得
    var buffMaxDate
    buffMaxDate = getMaxDate(year , month)
    console.log(buffMaxDate)

    // 月の最大日数分繰り返す
    var BaiorizumNum
    var iDate
    for(iDate = 1 ; iDate <= buffMaxDate ; iDate++){
      // 現在日付(i日)の宿曜暦番号を取得する => hoge
      const BuffYear = SYUKUYOUREKI.filter(item => item.year == year && item.month == month && item.day == iDate)
      console.log("★宿曜番号 => " , BuffYear[0].num)

      // 宿曜歴番号を取得する
      getYadoName(BuffYear[0].num)
      // // 宿曜歴番号を算出する
      // getCalcNumYado(BuffYear[0].num , year , month , iDate)

      // 宿曜暦名を取得する
      // バイオリズムを算出
      console.log(store.getState().nowSyukuYouRekiNum , store.getState().syukuYouRekiNum)
      if(Number(store.getState().nowSyukuYouRekiNum) < Number(store.getState().syukuYouRekiNum)){
        BaiorizumNum = 27 + Number(store.getState().nowSyukuYouRekiNum) - Number(store.getState().syukuYouRekiNum) 
        console.log("★BaiorizumNum => " , BaiorizumNum , "iDate => " , iDate)
      }else{
        BaiorizumNum = Number(store.getState().nowSyukuYouRekiNum) - Number(store.getState().syukuYouRekiNum)
        console.log("☆BaiorizumNum => " , BaiorizumNum , "iDate => " , iDate)
      }
      // 曜日を取得する
      var weekDay 
      weekDay = getUpDateWeekDay(iDate , year , month)
      console.log(weekDay , "曜日")
      // 日運表データから「リズム」、「サイクル」、「日運バイオリズム」を取得する
      getNichiUnData(BaiorizumNum , iDate , weekDay)
    }
    setDayData([...DayDataAry])

  }

  // ホームへ戻るボタンクリック時の処理
  const handleClickHome = (getLink) => {
    history.push("/")
  }

  // データを入制するボタンクリック時の処理
  const handleClickUpDate = () => {
    history.push("/daychart/edit")
  }
  
  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          {/* タイトル画面表示 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">日運表</Typography >
          </Grid>

          {/* 日運表のデータテーブル */}
          <Grid item xs={12} align="left">
            {/* データ入力領域 */}
            <Grid container spacing={2}>
              <Grid item xs = {2}></Grid>
              <Grid item xs = {2} align = "right">
                <DayDataYearSeledt
                  id        = "KojinSelectYear"
                  label     = "年を選択"
                  value     = {year}
                  onChange  ={(e) =>
                    setYear(e.target.value)}
                  onClick   ={(e) =>
                    setDayData(0)}/>
              </Grid>
              <Grid item xs = {1} align = "left">
                <Typography variant="h5">年</Typography>
              </Grid>
              <Grid item xs = {2} align = "right">
                <DayDataMonthSeledt
                  id       = "KojinSelectMonth"
                  label    = "月を選択"
                  value    = {month}
                  onChange ={(e) =>
                    setMonth(e.target.value)}
                  onClick   ={(e) =>
                    setDayData(0)}/>
              </Grid>
              <Grid item xs = {1} align = "left">
                <Typography variant="h5">月</Typography>
              </Grid>

              {/* ボタン表示郡 */}
              <Grid item xs={4} align="left">
                <BootstrapButton 
                  disableRipple
                  id      = "getnithiunn"
                  text    = "日運表を取得する"
                  variant = "contained"
                  xs      = "12"
                  onClick = {getNichiUnHyou}
                  >日運表を取得する</BootstrapButton>
              </Grid>
            </Grid>
            <br/>

            {/* 日運表テーブル表示領域 */}
            <Grid container spacing={2}>
              <Grid item xs={1} align="center">
              </Grid>
              <Grid item xs={10} align="left">
                <Typography variant="h5">{year}年{month}月 の日運表</Typography >
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
                        <StyledTableCell align="center">{item.Date}日</StyledTableCell>
                        <StyledTableCell align="center">{item.Youbi}</StyledTableCell>
                        <StyledTableCell align="center">{item.YadoName}</StyledTableCell>
                        <StyledTableCell align="center">{item.DayRizum}</StyledTableCell>
                        <StyledTableCell align="center">{item.DayCycle}</StyledTableCell>
                        <StyledTableCell align="left">{item.DayBaiorizumText}</StyledTableCell>
                      </StyledTableRow>
                    ))) : 
                      <StyledTableRow >
                          <StyledTableCell align="center">-</StyledTableCell>
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
              <Grid item xs={1} align="center">
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1} align="center">
            </Grid>
            <Grid item xs={10} align="left">
              <Typography 
                sx = {{
                  fontSize      : 14,}}>
                  ※日運表が表示できる範囲は1913年～2032年です。</Typography >
            </Grid>
            <Grid item xs={1} align="center">
            </Grid>
          </Grid>

          <Grid item xs={4} align="center">
            <DayDataButton
              id      = "backhome"
              text    = "ホームへ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/"
              onClick = {(e) => handleClickHome(e.target.link)}/>
          </Grid>
          <Grid item xs={4} align="center">
            <DayDataButton
              id      = "daydataedit"
              text    = "日運表データを修正する"
              variant = "contained"
              xs      = "12"
              link    = "/daychart/edit"
              onClick = {(e) => handleClickUpDate(e.target.link)}/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default withRouter(日運表)
