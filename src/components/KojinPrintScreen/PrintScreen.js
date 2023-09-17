import React, 
     { useState , 
       useEffect}         from 'react'
import Grid               from '@mui/material/Grid'
import { styled }         from '@mui/material/styles';
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import TextField          from '@mui/material/TextField';
import { useHistory }     from "react-router-dom";
import Header             from "../Header"
import store              from '../../store'
import { Button }         from '@mui/material'
import jsPDF              from "jspdf";
import html2canvas        from "html2canvas";

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

////////////////////////////////////////////
// 定数
////////////////////////////////////////////
const CommonBorderSettind  = "solid #000000 1.5px"

////////////////////////////////////////////
// 表示内容
////////////////////////////////////////////
function PDF出力画面() {
  // ------------------入力系変数------------------
  const now      = new Date()          // 本日の日付を取得
  const nowYear  = now.getFullYear()   // 本日の年を取得
  const nowMonth = now.getMonth() + 1  // 本日の月を取得
  const nowDay   = now.getDate()       // 本日の日を取得


  const history = useHistory()

  useEffect(() => {
    // PDFに出力する
    printDocument()

    // 個人鑑定出力結果画面に遷移する
    history.push("/kojin/result")
  },[])

  // PDFに出力する
  const printDocument = () => {
    const input = document.getElementById("test");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF()
      pdf.addImage(imgData, "SVG", -30, 5 , canvas.width/7 , canvas.height/7)
      let FileName = String(nowYear) + String(nowMonth) + String(nowDay) + "_" + String(store.getState().userName)  + "様個人鑑定診断結果.pdf"
      console.log(FileName)
      pdf.save(FileName)
    })
  }

  return (
    <div className='test' id='test'>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Grid container spacing={2}>
          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">個人鑑定結果</Typography >
          </Grid>

          {/* 個人鑑定書表示領域 */}
          <Grid item xs={1} align="center"></Grid>
          <Grid item xs={10} align="center"
            sx={{
              borderTop     : CommonBorderSettind ,
              borderBottom  : CommonBorderSettind ,
              borderLeft    : CommonBorderSettind , 
              borderRight   : CommonBorderSettind ,}}>
            <Grid container spacing={1}>
              <Grid item xs={12} align = "center">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>■　個人鑑定書　■</Typography>
              </Grid>
              <Grid item xs={3} align = "center">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().userName} 様</Typography>
              </Grid>
              <Grid item xs={3} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>西暦{store.getState().userYear}年{store.getState().userMonth}月{store.getState().userDay}日 生まれ</Typography>
              </Grid>
              <Grid item xs={3} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().userAge}歳</Typography>
              </Grid>
              <Grid item xs={3} align = "center">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().userSex}性</Typography>
              </Grid>
              <Grid item xs={12} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>鑑定日：{nowYear}年{nowMonth}月{nowDay}日</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* 本命宿表示領域 */}
          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={3} align = "right">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>本命宿：</Typography>
                </Grid>
                <Grid item xs={9} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{store.getState().syukuYouRekiName}({store.getState().syukuYouRekiYomi})</Typography>
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* 鑑定結果表示領域 */}
          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>1.性格</Typography>
                    {store.getState().seikaku}
                </Grid>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>2.適職</Typography>
                  {store.getState().tekisyoku}
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>3.お金</Typography>
                    {store.getState().okane}
                </Grid>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>4.健康</Typography>
                    {store.getState().kenkou}
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>
          <br/><br/>

          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>5.恋愛</Typography>
                    {store.getState().renai}
                </Grid>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>6.開運</Typography>
                    {store.getState().kaiunn}
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>
          <br/><br/>

      </Grid>
      <br/>
    </Box>
  </Container>
  </div>
  )
}

export default PDF出力画面