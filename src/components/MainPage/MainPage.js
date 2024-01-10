import React, 
     { useState , 
       useEffect}     from 'react'
import Button         from '@mui/material/Button'
import Grid           from '@mui/material/Grid'
import Box            from '@mui/material/Box'
import Container      from '@mui/material/Container'
import Typography     from '@mui/material/Typography'
import Alert          from '@mui/material/Alert'
import { useHistory } from "react-router-dom";
import MainPageButton from "./MainPageButton"
import Header         from "../Header"
import { styled }     from '@mui/material/styles'
import store          from '../../store'
import {firebaseApp } from "../../firebase"

/////////////////////////////////////////
// スタイル
/////////////////////////////////////////
const BootstrapButton = styled(Button)({
  boxShadow      : 'none',
  textTransform  : 'none',
  fontSize       : 16,
  padding        : '6px 12px',
  border         : '1px solid',
  lineHeight     : 1.5,
  backgroundColor: '#c1aea8',
  borderColor    : '#c1aea8',
  color          : '#000000',
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
    backgroundColor: '#c1aea8',
    borderColor: '#c1aea8',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#c1aea8',
    borderColor: '#c1aea8',
  },
});

function MainPage() {
  // ------------------メッセージ用------------------
  const [error, setError] = useState(false)             // エラー判定
  const [errormessage , setErrorMessage] = useState("") // エラーメッセージ
  const [success, setSuccess] = useState(false)         // 成功判定
  const history = useHistory()

  // 命式クリアボタンクリック時の処理
  const MeishikiClear = () => {
    store.getState().userYear   = ""
    store.getState().userMonth = ""
    store.getState().userDay   = ""
    console.log(store.getState().userYear)
    console.log(store.getState().userMonth)
    console.log(store.getState().userDay)
    setErrorMessage("命式をクリアしました。「年運表」「月運表」「日運表」を表示する際は再度命式を入力してください。")
    setError(true)
  }

  // ユーザーが認証されていない場合、ログイン画面へ遷移する
  console.log("HOGE")
  firebaseApp.fireauth.onAuthStateChanged(user => {
    console.log("FUGA")
    if (!user) {
      history.push("/login")
    }else{
      store.getState().loginUserUID = user.uid
      console.log("user.uid   =>" , user.uid)
      console.log("user.email =>", user.email)
    }
  })

  // 初回起動時の処理
  useEffect(() => {
  }, [])

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>

          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <br/>
            <Typography variant="h4">宿命占星術鑑定</Typography >
          </Grid>
            <Grid item xs={6} align="center">
              <MainPageButton
                id      = "kojinkantei"
                text    = "個人鑑定"
                variant = "contained"
                xs      = "12"
                link    = "/kojin"/>
            </Grid>
            <Grid item xs={6} align="center">
              <MainPageButton
                id      = "aisyoushindann"
                text    = "相性診断"
                variant = "contained"
                xs      = "12"
                link    = "/aisyou"/>
            </Grid>
            <Grid item xs={4} align="center">
              <MainPageButton
                  id      = "yearthchart"
                  text    = "年運表"
                  variant = "contained"
                  xs      = "12"
                  link    = "/yearchart"/>
            </Grid>
            <Grid item xs={4} align="center">
              <MainPageButton
                id      = "monthchart"
                text    = "月運表"
                variant = "contained"
                xs      = "12"
                link    = "/monthchart"/>
            </Grid>
            <Grid item xs={4} align="center">
              <MainPageButton
                id      = "daychart"
                text    = "日運表"
                variant = "contained"
                xs      = "12"
                link    = "/daychart"/>
            </Grid>

            {/* 命式クリアをクリックした場合はアラートを出す */}
            <Grid item xs={12} align="center">
              {error && <Alert severity="info">{errormessage}</Alert>}
            </Grid>

            <Grid item xs={12} align="center">
              <BootstrapButton
                  id      = "clear"
                  text    = "命式クリア"
                  variant = "contained"
                  xs      = "12"
                  link    = "/"
                  onClick={MeishikiClear}>命名クリア</BootstrapButton>
            </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default MainPage;
