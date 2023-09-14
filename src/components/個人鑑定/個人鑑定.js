import React, 
     { useState , 
       useEffect}      from 'react'
import { Alert , 
        Typography ,
        Box ,
        Grid,
        Container ,
        TextField , 
        Button, }      from "@mui/material"
import { useHistory }  from "react-router-dom";
import Header          from "../Header"
import YearSlect       from "./YearSelect"
import MonthSlect      from "./MonthSelect"
import DaySlect        from "./DaySelect"
import RadioGroup      from './RadioGroup'
import KojinButton     from "./KojinButton"
import store           from '../../store';
import {SYUKUYOUREKI , 
       KOJIN_KANTEI ,
       TAIOUHYOU}      from "../ObjectData"
import {addDoc,
       collection,
       doc,
       updateDoc, 
       getDocs,}       from "firebase/firestore"
import {firebaseApp }  from "../../firebase"

////////////////////////////////////////////
// ------------------定数------------------
////////////////////////////////////////////
const Kojinkantei_Data = "Kojinkantei_Data"

function 個人鑑定() {

  // ------------------入力系変数------------------
  const [name  , setName]  = useState("") // 個人鑑定名前
  const [year  , setYear]  = useState("")  // 年を選択
  const [month , setMonth] = useState("")   // 月を選択
  const [day   , setDay]   = useState("")   // 日を選択
  const [radio , setRadio] = useState("")   // ラジオボタン
  const history = useHistory()

  // ------------------メッセージ用------------------
  const [error, setError]                = useState(false) // エラー判定
  const [errormessage , setErrorMessage] = useState("")    // エラーメッセージ
  const [success, setSuccess]            = useState(false) 


  // 編集ボタンクリック時の処理
  const handleClickEdit = (event) =>{
    history.push("/kojin/edit")
  }
  
  // 戻るボタンクリック時の処理
  const handleClickReturn = (event) =>{
    history.push("/")
  }

  // ボタンクリック時の処理
  const handleClick = (event) => {
    console.log("==================診断結果==================")

    // 入力内容が空の場合はエラーを返す
    if(year ===""){
      console.log("年が選択されていない")
      setErrorMessage("年を選択してください。")
      setError(true)
      return
    }
    if(month ===""){
      console.log("月が選択されていない")
      setErrorMessage("月を選択してください。")
      setError(true)
      return
    }
    if(day ===""){
      console.log("日が選択されていない")
      setErrorMessage("日を選択してください。")
      setError(true)
      return
    }
    if(radio === ""){
      console.log("ラジオボタンが選択されていない")
      setErrorMessage("性別を選択してください。")
      setError(true)
      return
    }
    setSuccess(true)
    setError(false)

    store.getState().userName = name
    store.getState().userYear = year
    store.getState().userMonth = month
    store.getState().userDay = day
    store.getState().userSex = radio

    console.log("正常に入力されている")
    history.push("/kojin/result")
  }

  useEffect(() => {
  }, [])

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">個人鑑定入力</Typography >
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">生年月日の入力</Typography >
          </Grid>

          {/* 名まえ入力欄 */}
          <Grid item xs={6} align="right">
            <Typography variant="h6">個人鑑定書に表示するお名前</Typography >
          </Grid>
          <Grid item xs={6} align="left">
            <TextField
              variant="standard"
              value ={name}
              label = "お名前を入力"
              onChange={(e) => 
                setName(e.target.value)}>個人鑑定入力</TextField>
          </Grid>

          {/* 生年月日入力欄 */}
          <Grid item xs = {2} align = "right">
            <YearSlect
              id        = "KojinSelectYear"
              label     = "年を選択"
              value     = {year}
              onChange  ={(e) =>
                setYear(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>年</Typography>
          </Grid>
          <Grid item xs = {2} align = "right">
            <MonthSlect
              id       = "KojinSelectMonth"
              label    = "月を選択"
              value    = {month}
              onChange ={(e) =>
                setMonth(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>月</Typography>
          </Grid>
          <Grid item xs = {2} align = "right">
            <DaySlect
              id        = "KojinSelectDay"
              label     = "日を選択"
              value     = {day}
              onChange  ={(e) =>
                setDay(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>日</Typography>
          </Grid>

          {/* 性別のラジオボタン */}
          <Grid item xs={3} align="center">
            <RadioGroup
              id       = "KojinRadioGroup"
              value    = {radio}
              onChange = {(e) => 
                setRadio(e.target.value)}></RadioGroup>
          </Grid>

          {/* 投稿が失敗した場合はアラートを出す */}
          <Grid item xs={12} align="center">
            {error && <Alert severity="error">{errormessage}</Alert>}
          </Grid>

          {/* 名式算出ボタン */}
          <Grid item xs={4} align="right">
            <KojinButton
              id      = "kojinresult"
              text    = "名式算出"
              variant = "contained"
              xs      = "12"
              link    = "/kojin/result"
              onClick ={handleClick}/>
          </Grid>
          {/* 鑑定内容を編集するボタン */}
          <Grid item xs={4} align="center">
            <KojinButton
              id      = "kojinedit"
              text    = "個人鑑定データ編集画面へ"
              variant = "contained"
              xs      = "12"
              link    = "/kojin/edit"
              onClick ={handleClickEdit}
              />
          </Grid>
          {/* 戻るボタン */}
          <Grid item xs={4} align="left">
          <KojinButton
              id      = "return"
              text    = "戻る"
              variant = "contained"
              xs      = "12"
              link    = "/"
              onClick ={handleClickReturn}/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 個人鑑定;
