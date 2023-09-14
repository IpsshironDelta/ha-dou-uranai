import React, 
     { useState , 
       useEffect}           from 'react'
import { styled }           from '@mui/material/styles';
import Button               from '@mui/material/Button'
import Grid                 from '@mui/material/Grid'
import Box                  from '@mui/material/Box'
import Container            from '@mui/material/Container'
import Typography           from '@mui/material/Typography'
import { useHistory }       from "react-router-dom";
import Header               from "../Header"
import MonthDataTable       from './MonthDataTable'
import MonthDataButton      from "./MonthDataButton"
import MonthDataYearSelect  from "./MonthDataYearSelect"
import MonthDataMonthSelect from "./MonthDataMonthSelect"
import Table                from '@mui/material/Table';
import TableBody            from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses }   from '@mui/material/TableCell';
import TableContainer       from '@mui/material/TableContainer';
import TableHead            from '@mui/material/TableHead';
import TableRow             from '@mui/material/TableRow';
import Paper                from '@mui/material/Paper';
import store                from '../../store'
import {GETSU_UNN_SYUUKI , 
       GETSU_UNN_BAIORIZUM} from "../ObjectData"

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

function 月運表() {
  // ------------------入力系変数------------------
  const [monthdata , setMonthData] = useState() // 年運表を格納
  const [year     , setYear]     = useState("") // 年を格納
  const [month   , setMonth]   = useState("")   // 月を格納
  const history = useHistory()
  const MonthDataAry = []

  // 初回起動時の処理
  useEffect(() => {
    console.log("================月運表初回起動================")
    // 今日の日付データをcurrentDateに格納
    var currentDate = new Date()
    var getYear
    var getMonth
    // 年・月を取得
    setYear(currentDate.getFullYear())
    setMonth(currentDate.getMonth()+1)
    getMonth = currentDate.getMonth()+1
    console.log(currentDate.getFullYear(),currentDate.getMonth()+1)

    var i
    var GetsuUnnSyukuName // 月運宿星
    var GetsuUnnSyukuNum  // 月運宿曜番号
    var BaiorizumNum      // バイオリズム番号
    for (i = 0 ; i <= 11 ; i++){
      // 年の計算
      if(getMonth < Number(currentDate.getMonth()+1)){
        getYear = currentDate.getFullYear() + 1
        console.log(currentDate.getFullYear() , "年 => " , getYear , "年に変更")
      }else{
        getYear = currentDate.getFullYear()
        console.log(getYear , "年：何もしない。")
      }
      console.log(getMonth , "月 , i =>" , i)
      const BuffYadoName = GETSU_UNN_SYUUKI.filter(item => item.SyuukiMonth == Number(getMonth))
      GetsuUnnSyukuName  = BuffYadoName[0].SyuukiYado
      GetsuUnnSyukuNum   = BuffYadoName[0].SyuukiYadoNum
      console.log("月運宿星     => " , BuffYadoName[0].SyuukiYado)
      console.log("月運宿曜番号 => " , GetsuUnnSyukuNum)
  
      // バイオリズム番号取得
      console.log("宿曜番号 => " , store.getState().syukuYouRekiNum)
      if (GetsuUnnSyukuNum < Number(store.getState().syukuYouRekiNum)){
        BaiorizumNum = 27 + Number(GetsuUnnSyukuNum) - Number(store.getState().syukuYouRekiNum)
        console.log("1.BaiorizumNum => " , BaiorizumNum)
      }else{
        BaiorizumNum = Number(GetsuUnnSyukuNum) - Number(store.getState().syukuYouRekiNum)
        console.log("2.BaiorizumNum => " , BaiorizumNum)
      }
  
      // バイオリズム取得
      const BuffBaiorizum = GETSU_UNN_BAIORIZUM.filter(item => item.MonthBaiorizumNum == BaiorizumNum)
      console.log("バイオリズム => " , BuffBaiorizum[0].Rizum)
      console.log("バイオリズム内容 => " , BuffBaiorizum[0].BaiorizumText)
      MonthDataAry.push({
        Year               : getYear ,
        Month              : getMonth  ,
        YadoName           : GetsuUnnSyukuName,
        MonthBaiorizumName : BuffBaiorizum[0].MonthRizum,
        MonthBaiorizumText : BuffBaiorizum[0].MonthBaiorizumText
      })
      getMonth = getMonth + 1
      if(getMonth > 12){
        getMonth = 1
      }
    }
  setMonthData([...MonthDataAry])
  }, [])

  // 月運表を取得するボタンクリック時の処理
  const getGetsuUnHyou = () => {
    console.log("================月運表取得================")
    // 今日の日付データをcurrentDateに格納
    var currentDate = new Date()
    var getYear
    var getMonth
    getMonth = month
    console.log(year,month)

    var i
    var GetsuUnnSyukuName // 月運宿星
    var GetsuUnnSyukuNum  // 月運宿曜番号
    var BaiorizumNum      // バイオリズム番号
    for (i = 0 ; i <= 11 ; i++){
      // 年の計算
      if(getMonth < month){
        getYear = Number(year) + 1
        console.log(year , "年 => " , getYear , "年に変更")
      }else{
        getYear = Number(year)
        console.log(getYear , "年：何もしない。")
      }
      console.log(getMonth , "月 , i =>" , i)
      const BuffYadoName = GETSU_UNN_SYUUKI.filter(item => item.SyuukiMonth == Number(getMonth))
      GetsuUnnSyukuName  = BuffYadoName[0].SyuukiYado
      GetsuUnnSyukuNum   = BuffYadoName[0].SyuukiYadoNum
      console.log("月運宿星     => " , BuffYadoName[0].SyuukiYado)
      console.log("月運宿曜番号 => " , GetsuUnnSyukuNum)
  
      // バイオリズム番号取得
      console.log("宿曜番号 => " , store.getState().syukuYouRekiNum)
      if (GetsuUnnSyukuNum < Number(store.getState().syukuYouRekiNum)){
        BaiorizumNum = 27 + Number(GetsuUnnSyukuNum) - Number(store.getState().syukuYouRekiNum)
        console.log("1.BaiorizumNum => " , BaiorizumNum)
      }else{
        BaiorizumNum = Number(GetsuUnnSyukuNum) - Number(store.getState().syukuYouRekiNum)
        console.log("2.BaiorizumNum => " , BaiorizumNum)
      }
  
      // バイオリズム取得
      const BuffBaiorizum = GETSU_UNN_BAIORIZUM.filter(item => item.MonthBaiorizumNum == BaiorizumNum)
      console.log("バイオリズム => " , BuffBaiorizum[0].Rizum)
      console.log("バイオリズム内容 => " , BuffBaiorizum[0].BaiorizumText)
      MonthDataAry.push({
        Year               : getYear ,
        Month              : getMonth  ,
        YadoName           : GetsuUnnSyukuName,
        MonthBaiorizumName : BuffBaiorizum[0].MonthRizum,
        MonthBaiorizumText : BuffBaiorizum[0].MonthBaiorizumText
      })
      getMonth = getMonth + 1
      if(getMonth > 12){
        getMonth = 1
      }
    }
  setMonthData([...MonthDataAry])
  }

    return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>

          {/* タイトル表示 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">月運表</Typography >
          </Grid>

          {/* ボタン表示郡 */}
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs = {2} align = "right">
            <MonthDataYearSelect
              id        = "SelectYear"
              label     = "年を選択"
              value     = {year}
              onChange  ={(e) =>
                setYear(e.target.value)}
              onClick   ={(e) =>
                setMonthData(0)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography variant="h5">年</Typography>
          </Grid>
          <Grid item xs = {2} align = "right">
            <MonthDataMonthSelect
              id       = "SelectMonth"
              label    = "月を選択"
              value    = {month}
              onChange ={(e) =>
                setMonth(e.target.value)}
              onClick   ={(e) =>
                setMonthData(0)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography variant="h5">月</Typography>
          </Grid>
          <Grid item xs={5} align="left">
            <BootstrapButton 
              disableRipple
              id      = "getgetsununn"
              text    = "月運表を取得する"
              variant = "contained"
              xs      = "12"
              onClick = {getGetsuUnHyou}
              >月運表を取得する</BootstrapButton>
          </Grid>


          {/* 月運表テーブル表示 */}
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="left">


            <Typography variant="h5">月運表</Typography >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>年</StyledTableCell>
                      <StyledTableCell align="center">月</StyledTableCell>
                      <StyledTableCell align="center">宿</StyledTableCell>
                      <StyledTableCell align="center">バイオリズム</StyledTableCell>
                      <StyledTableCell align="center">あなたの月運バイオリズム</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthdata ? (monthdata.map((item) => (
                    <StyledTableRow key={item.Year}>
                      <StyledTableCell align="center">{item.Year}年</StyledTableCell>
                      <StyledTableCell align="center">{item.Month}月</StyledTableCell>
                      <StyledTableCell align="center">{item.YadoName}</StyledTableCell>
                      <StyledTableCell align="center">{item.MonthBaiorizumName}</StyledTableCell>
                      <StyledTableCell align="left">{item.MonthBaiorizumText}</StyledTableCell>
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
                ※月運の切り替わりが新暦の1日になるように月運の宿をおおまかに変換して月運バイオリズムを算出しています。</Typography >
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          <Grid item xs={4} align="center">
            <MonthDataButton
              id      = "backhome"
              text    = "ホーム画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/"/>
          </Grid>
          <Grid item xs={4} align="center">
            {/* <MonthDataButton
              id      = "monthdataedit"
              text    = "月運表データを修正する"
              variant = "contained"
              xs      = "12"
              link    = "/monthchart/edit"/> */}
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 月運表;
