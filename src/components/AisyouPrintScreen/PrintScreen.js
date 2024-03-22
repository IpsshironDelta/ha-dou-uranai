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

    // 相性診断出力結果画面に遷移する
    history.push("/aisyou/result")
  },[])

  // PDFに出力する
  const printDocument = () => {
    const input = document.getElementById("test")
    // 画面のサイズを取得
    const width = input.offsetWidth
    const height = input.offsetHeight
    console.log("width : " , width)
    console.log("height : " , height)

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF('p', 'px', [width, height])
      // pdf.addImage(imgData, "SVG", -30, 5 , canvas.width/7 , canvas.height/7)
      pdf.addImage(imgData, 'PNG', 0, 0, width, height)
      let FileName = String(nowYear) + String(nowMonth) + String(nowDay) + "_" + String(store.getState().userName)  + "様相性診断診断結果.pdf"
      console.log(FileName)
      pdf.save(FileName)
    })
  }

  return (
    <div className='test' id='test'>
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Grid container spacing={2}>
          {/* 画面タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">相性診断結果</Typography >
          </Grid>

          {/* 相性診断表示領域 */}
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
                  }}>■　相性診断書書　■</Typography>
              </Grid>

              {/* 自分側の情報 */}
              <Grid item xs={1} align = "center">
              </Grid>
              <Grid item xs={4} align = "left">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().userName} 様</Typography>
              </Grid>
              <Grid item xs={7} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>西暦{store.getState().userYear}年{store.getState().userMonth}月{store.getState().userDay}日　生まれ</Typography>
              </Grid>
              <Grid item xs={9} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().userAge} 歳</Typography>
              </Grid>
              <Grid item xs={2} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().userSex}性</Typography>
              </Grid>
              <Grid item xs={1} align = "center">
              </Grid>
              <br/>

              {/* 相手側の情報 */}
              <Grid item xs={1} align = "center">
              </Grid>
              <Grid item xs={4} align = "left">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().partnerName} 様</Typography>
              </Grid>
              <Grid item xs={7} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>西暦{store.getState().partnerYear}年{store.getState().partnerMonth}月{store.getState().partnerDay}日　生まれ</Typography>
              </Grid>
              <Grid item xs={9} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().partnerAge} 歳</Typography>
              </Grid>
              <Grid item xs={2} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{store.getState().partnerSex}性</Typography>
              </Grid>
              <Grid item xs={1} align = "center">
              </Grid>

              <br/><br/>

              <Grid item xs={12} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>鑑定日：{nowYear}年{nowMonth}月{nowDay}日</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* ホロスコープ文言表示領域 */}
          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>自分側のホロスコープ</Typography>
                </Grid>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>相手側のホロスコープ</Typography>
                </Grid>

                <Grid item xs={6} align = "right">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>自分側の本命宿：</Typography>
                </Grid>
                <Grid item xs={6} align = "right">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>相手側の本命宿：</Typography>
                </Grid>

                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{store.getState().syukuYouRekiName}（{store.getState().syukuYouRekiYomi}）</Typography>
                </Grid>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{store.getState().partnerRekiName}（{store.getState().partnerRekiYomi}）</Typography>
                </Grid>

              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* 関係と距離の表示領域 */}
          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={6} align = "center">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>自分 → 相手</Typography>
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{store.getState().userPartnerRelationship}の関係{store.getState().strDistance}</Typography>
                </Grid>
                <Grid item xs={6} align = "center">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>相手 → 自分</Typography>
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{store.getState().partnerUserRelationship}の関係{store.getState().strDistance}</Typography>
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* 相性診断結果表示領域 */}
          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>1.おふたりの関係</Typography>
                    {store.getState().partnerKankei}
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>2.基本的な相性</Typography>
                    {store.getState().partnerKihon}
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>3.恋愛関係の相性</Typography>
                    {store.getState().partnerRenai}
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>4.仕事関係の相性</Typography>
                    {store.getState().partnerShigoto}
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>5.自分側から見た相手との関係</Typography>
                    {store.getState().userPartner}
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>6.相手側から見た自分との関係</Typography>
                    {store.getState().partnerUser}
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

        </Grid>
        <br/>
      </Box>
    </Container>
  </div>
  )
}

export default PDF出力画面