import React, 
     { useState , 
       useEffect}       from 'react'
import Grid             from '@mui/material/Grid'
import { styled }       from '@mui/material/styles';
import Box              from '@mui/material/Box'
import Container        from '@mui/material/Container'
import Typography       from '@mui/material/Typography'
import TextField        from '@mui/material/TextField';
import { useHistory }   from "react-router-dom";
import Header           from "../Header"
import store            from '../../store'
import { Button }       from '@mui/material'
import jsPDF            from "jspdf";
import html2canvas      from "html2canvas";
import {SYUKUYOUREKI , 
       KOJIN_KANTEI ,
       TAIOUHYOU}       from "../ObjectData"
import {collection,
       doc,
       getDocs,}        from "firebase/firestore"
import {firebaseApp }   from "../../firebase"
import Backdrop         from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

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
const Kojinkantei_Data = "Kojinkantei_Data"

////////////////////////////////////////////
// 表示内容
////////////////////////////////////////////
function 個人鑑定結果表示() {
  // ------------------入力系変数------------------
  const now      = new Date()          // 本日の日付を取得
  const nowYear  = now.getFullYear()   // 本日の年を取得
  const nowMonth = now.getMonth() + 1  // 本日の月を取得
  const nowDay   = now.getDate()       // 本日の日を取得

  // ------------------個人鑑定結果------------------
  const [seikaku   , setSeikaku]   = useState("")   // 1.性格
  const [tekisyoku , setTekisyoku] = useState("") // 2.適職
  const [okane     , setOkane]     = useState("")     // 3.お金
  const [kenkou    , setKenkou]    = useState("")    // 4.健康
  const [renai     , setRenai]     = useState("")     // 5.恋愛
  const [kaiunn    , setKaiunn]    = useState("")    // 6.開運

  const [name    , setName]    = useState(store.getState().userName)         // 個人鑑定名前
  const [year    , setYear]    = useState(store.getState().userYear )        // 年を選択
  const [month   , setMonth]   = useState(store.getState().userMonth)        // 月を選択
  const [day     , setDay]     = useState(store.getState().userDay)          // 日を選択
  const [radio   , setRadio]   = useState(store.getState().userSex)          // ラジオボタン
  const [yado    , setYado]    = useState(store.getState().syukuYouRekiName) // 宿名
  const [yomi    , setYomi]    = useState(store.getState().syukuYouRekiYomi) // 宿名(読み)
  const [age     , setAge]     = useState("")                                // 年齢

  // ------------------バックドロップ------------------
  const [open, setOpen] = useState(true)
  // 診断をやめるボタンクリック時の処理
  const handleClose = (reason) => {
    if ( reason === 'backdropClick') return
    setOpen(false)
    history.push("/kojin")
  }

  const history = useHistory()

  useEffect(() => {
    // 年齢を取得する
    getAage()

    const BuffYear = SYUKUYOUREKI.filter(item => (item.year == year) && (item.month == month) && (item.day == day))
    console.log(year , "年" , month , "月" , day , "日　の宿曜番号→" , BuffYear[0].num , "宿曜暦 : " , BuffYear[0].num)
    // 宿陽暦番号を代入
    store.getState().syukuYouRekiNum = BuffYear[0].num

    // 宿曜歴を取得する
    getYadoName(store.getState().syukuYouRekiNum)
  },[])

    // 宿曜歴を取得する
    const getYadoName = (event) => {
      console.log(event)
      var BuffTaiou = TAIOUHYOU.filter(item => item.num == event)
      console.log("★あああ" , BuffTaiou[0].name,BuffTaiou[0].num)
  
      const firestore = firebaseApp.firestore
      getDocs(collection(firestore, Kojinkantei_Data)).then((querySnapshot)=>{
        querySnapshot.forEach((document) => {
          if(document.data().num == BuffTaiou[0].num){

            console.log("このタイミングで取得できた！")

            // バックドロップを閉じる
            setOpen(false)

            console.log(document.data().num , "で番号が一致しているため宿曜暦情報を代入")
            const kojinkanteiRef = doc(firestore , Kojinkantei_Data , document.id)
  
            // 宿曜暦番号を代入
            store.getState().syukuYouRekiNum = document.data().num
            console.log("宿曜暦更新 => " , store.getState().syukuYouRekiNum)
        
            // 宿名を代入
            store.getState().syukuYouRekiName = document.data().yado
            setYado(document.data().yado)
            
            // 読みを代入
            store.getState().syukuYouRekiYomi = document.data().yomi
            setYomi(document.data().yomi)
  
            // 性格を代入
            store.getState().seikaku = document.data().seikaku
            setSeikaku(document.data().seikaku)
            console.log(document.data().seikaku)
            
            // 適職を代入
            store.getState().tekisyoku = document.data().tekisyoku
            setTekisyoku(document.data().tekisyoku)
            console.log(document.data().tekisyoku)
        
            // お金を代入
            store.getState().okane = document.data().okane
            setOkane(document.data().okane)
            console.log(document.data().okane)
        
            // 健康を代入
            store.getState().kenkou = document.data().kenkou
            setKenkou(document.data().kenkou)
            console.log(document.data().kenkou)
        
            // 恋愛を代入
            store.getState().renai = document.data().renai
            setRenai(document.data().renai)
            console.log(document.data().renai)
  
            // 開運を代入
            store.getState().kaiunn = document.data().kaiunn
            setKaiunn(document.data().kaiunn)
            console.log(document.data().kaiunn)
          }
        })
      })
    }

  // 年齢を取得
  const getAage = () =>{
    // 生年月日の日付データを取得
    const birthdate = new Date(year, month - 1, day);
    // 今年の誕生日の日付データを取得
    const currentYearBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    // 生まれた年と今年の差を計算
    let getAge = now.getFullYear() - birthdate.getFullYear();
    // 今日の日付と今年の誕生日を比較
    if (now < currentYearBirthday) {
      // 今年誕生日を迎えていない場合、1を引く
      getAge--;
    }
    // 年齢の値をセットする
    setAge(getAge)
    store.getState().userAge = getAge
  }

  // PDFに出力する
  const printDocument = () => {
    history.push("/kojinprint")
  }

  // 個人鑑定へ戻るボタンクリック時の処理
  const retrunKojin = () => {
    history.push("/kojin")
  }

  return (
    <div className='test' id='test'>
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>

        {/* バックドロップ表示範囲 */}
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClose={handleClose}>
            <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <CircularProgress color="secondary" />
            </Grid>
            <Grid item xs={12} align="center">
                <Typography sx={{ mt: 2 }}>
                診断結果を取得しております。
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography sx={{ mt: 2 }}>
                しばらくお待ちください。
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <BootstrapButton
                disableRipple
                id      = "kojinback"
                text    = "個人鑑定画面へ戻る"
                variant = "contained"
                xs      = "12"
                link    = "/kojin"
                onClick = {handleClose}>診断をとめる</BootstrapButton>
                {/* <Button variant="contained" onClick={handleClose}>診断をとめる</Button> */}
            </Grid>
            </Grid>
        </Backdrop>

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
              <Grid item xs={5} align = "center">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{name} 様</Typography>
              </Grid>
              <Grid item xs={7} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>西暦{year}年{month}月{day}日 生まれ</Typography>
              </Grid>
              <Grid item xs={10} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{age}歳</Typography>
              </Grid>
              <Grid item xs={2} align = "center">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{radio}性</Typography>
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
                    }}>宿：</Typography>
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
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>1.性格</Typography>
                  <TextField
                    defaultValue = {seikaku}
                    multiline
                    fullWidth 
                    rows={13}/>
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>2.適職</Typography>
                  <TextField
                    defaultValue= {tekisyoku}
                    multiline
                    fullWidth 
                    rows={13}/>
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
                      fontSize      : 16,
                    }}>3.お金</Typography>
                  <TextField
                    defaultValue= {okane}
                    multiline
                    fullWidth 
                    rows={13}/>
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>4.健康</Typography>
                  <TextField
                    defaultValue= {kenkou}
                    multiline
                    fullWidth 
                    rows={13}/>
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
                      fontSize      : 16,
                    }}>5.恋愛</Typography>
                  <TextField
                    defaultValue= {renai}
                    multiline
                    fullWidth 
                    rows={13}/>
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>6.開運</Typography>
                  <TextField
                    defaultValue= {kaiunn}
                    multiline
                    fullWidth 
                    rows={13}/>
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

        {/* ボタン表示領域 */}
        <Grid item xs={4} align="center">
          <BootstrapButton
            disableRipple
            id      = "pdfoutput"
            text    = "結果をPDFに出力する"
            variant = "contained"
            xs      = "12"
            onClick = {printDocument}>
              PDF出力
            </BootstrapButton>
        </Grid>
        <Grid item xs={4} align="center">
          <BootstrapButton
            disableRipple
            id      = "kojinback"
            text    = "個人鑑定画面へ戻る"
            variant = "contained"
            xs      = "12"
            link    = "/kojin"
            onClick = {retrunKojin}
            >戻る</BootstrapButton>
        </Grid>
      </Grid>
      <br/>
    </Box>
  </Container>
  </div>
  )
}

export default 個人鑑定結果表示;