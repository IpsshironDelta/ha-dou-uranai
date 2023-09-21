import React, 
     { useState , 
       useEffect}           from 'react'
import { Alert , 
        Typography ,
        Box ,
        Grid,
        Container ,
        TextField , 
        Button, }           from "@mui/material"
import { useHistory }       from "react-router-dom";
import Header               from "../Header"
import AisyouButton         from "./AisyouButton"
import YearSelect           from "./YearSelect"
import MonthSelect          from "./MonthSelect"
import DaySelect            from "./DaySelect"
import RadioGroup           from './RadioGroup'
import PartnerYearSelect    from "./PartnerYearSelect"
import PartnerMonthSelect   from "./PartnerMonthSelect"
import PartnerDaySelect     from "./PartnerDaySelect"
import PartnerRadioGroup    from './PartnerRadioGroup'
import store                from '../../store'
import {SYUKUYOU_AISYOU , 
       AISYOUKANTEI , 
       AISYOU_KANTEI_KYORI ,
       TAIOUHYOU ,
       SYUKUYOUREKI} from "../ObjectData"

////////////////////////////////////////////
// 定数
////////////////////////////////////////////
const MineFlg    = "1"
const PartnerFlg = "2"

function 相性診断() {
  // ------------------入力系変数------------------
  const [name  , setName]  = useState("") // 個人鑑定名前
  const [year  , setYear]  = useState("") // 年を選択
  const [month , setMonth] = useState("") // 月を選択
  const [day   , setDay]   = useState("") // 日を選択
  const [radio , setRadio] = useState("") // ラジオボタン
  const [age   , setAge]   = useState("") // 年齢
  const [yado  , setYado]  = useState("") // 宿名
  const [yomi  , setYomi]  = useState("") // 宿名(読み)
  const [partnername  , setPartnerName]  = useState("") // 相手の個人鑑定名前
  const [partneryear  , setPartnerYear]  = useState("") // 相手の年を選択
  const [partnermonth , setPartnerMonth] = useState("") // 相手の月を選択
  const [partnerday   , setPartnerDay]   = useState("") // 相手の日を選択
  const [partnerradio , setPartnerRadio] = useState("") // 相手のラジオボタン
  const [partnerage   , setPartnerAge]   = useState("") // 相手の年齢
  const [partneryado  , setPartnerYado]  = useState("") // 相手の宿名
  const [partneryomi  , setPartnerYomi]  = useState("") // 相手の宿名(読み)
  const [kankei       , setKankei]       = useState("") // 1.お二人の関係
  const [kihon        , setKihon]        = useState("") // 2.基本的な相性
  const [renai        , setRenai]        = useState("") // 3.恋愛関係の相性
  const [sigoto       , setSigoto]       = useState("") // 4.仕事関係の相性
  const [userpartner  , setUserPartner]  = useState("") // 5.自分側から見た相手との関係
  const [partneruser  , setPartnerUser]  = useState("") // 6.相手側から見た自分との関係


  // ------------------メッセージ用------------------
  const [error, setError] = useState(false)             // エラー判定
  const [errormessage , setErrorMessage] = useState("") // エラーメッセージ
  const [success, setSuccess] = useState(false)         // 成功判定

  const history = useHistory()

  // 相性診断を実行
  const Diagnosis = () => {
    // 入力した自分側の年と一致するか判定する
    const BuffYear = SYUKUYOUREKI.filter(item => item.year == year && item.month == month && item.day == day)
    console.log(BuffYear[0].year , "月", BuffYear[0].month , "月", BuffYear[0].day , "日　：　num =>",BuffYear[0].num)
    // 宿陽暦番号を代入
    store.getState().syukuYouRekiNum = BuffYear[0].num

    // 入力した相手側の年と一致するか判定する
    const BuffPartnerYear = SYUKUYOUREKI.filter(item => item.year == partneryear & item.month == partnermonth && item.day == partnerday)
    console.log(BuffPartnerYear[0].year , "月", BuffPartnerYear[0].month , "月", BuffPartnerYear[0].day , "日　：　num =>",BuffPartnerYear[0].num)
    // 宿陽暦番号を代入
    store.getState().partnerRekiNum = BuffPartnerYear[0].num

    // 自分の宿曜歴を取得する
    getYadoName(store.getState().syukuYouRekiNum , MineFlg)

    // 宿曜歴を取得する
    getYadoName(store.getState().partnerRekiNum ,  PartnerFlg)

    // 二人の相性を算出
    getCalcAisyou()

    // 自分から見た相手の関係
    var Relationship_6_SyuNum
    var UserPartner_11_SyuNum
    var PartnerUser_11_SyuNum
    if (store.getState().userPartnerRelationship == "安"){
      Relationship_6_SyuNum = 1
      UserPartner_11_SyuNum = 1
      PartnerUser_11_SyuNum = 2
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "壊"){
      Relationship_6_SyuNum = 1
      UserPartner_11_SyuNum = 2
      PartnerUser_11_SyuNum = 1
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "栄"){
      Relationship_6_SyuNum = 2
      UserPartner_11_SyuNum = 3
      PartnerUser_11_SyuNum = 4
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if(store.getState().userPartnerRelationship == "親"){
      Relationship_6_SyuNum = 2
      UserPartner_11_SyuNum = 4
      PartnerUser_11_SyuNum = 3
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if(store.getState().userPartnerRelationship == "友"){
      Relationship_6_SyuNum = 3
      UserPartner_11_SyuNum = 5
      PartnerUser_11_SyuNum = 6
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "衰"){
      Relationship_6_SyuNum = 3
      UserPartner_11_SyuNum = 6
      PartnerUser_11_SyuNum = 5
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "危"){
      Relationship_6_SyuNum = 4
      UserPartner_11_SyuNum = 7
      PartnerUser_11_SyuNum = 8
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "成"){
      Relationship_6_SyuNum = 4
      UserPartner_11_SyuNum = 8
      PartnerUser_11_SyuNum = 7
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "命"){
      Relationship_6_SyuNum = 5
      UserPartner_11_SyuNum = 9
      PartnerUser_11_SyuNum = 9
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if (store.getState().userPartnerRelationship == "業"){
      Relationship_6_SyuNum = 6
      UserPartner_11_SyuNum = 10
      PartnerUser_11_SyuNum = 11
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }else if(store.getState().userPartnerRelationship == "胎"){
      Relationship_6_SyuNum = 6
      UserPartner_11_SyuNum = 11
      PartnerUser_11_SyuNum = 10
      console.log(store.getState().userPartnerRelationship , Relationship_6_SyuNum , UserPartner_11_SyuNum , PartnerUser_11_SyuNum )
    }

    // 相性鑑定データを取得
    console.log(Relationship_6_SyuNum)
    getAisyouKanteiData(Relationship_6_SyuNum)

    // 相性鑑定データの距離を取得(自分相手11種番号)
    getAisyouKanteiDataKyori(UserPartner_11_SyuNum , MineFlg)

    // 相性鑑定データの距離を取得(相手自分11種番号)
    getAisyouKanteiDataKyori(PartnerUser_11_SyuNum , PartnerFlg)

    history.push("/aisyou/result")
  }

  // 相性鑑定データの距離を取得
  const getAisyouKanteiDataKyori = (RelationshipNum , inputFlg) => {
    const BuffKyori = AISYOU_KANTEI_KYORI.filter(item => item.Num == RelationshipNum)
    switch(store.getState().strDistance){
      case "(近距離)":
        if (inputFlg == 1) {
          setUserPartner(BuffKyori[0].kinkyori)
          store.getState().userPartner = BuffKyori[0].kinkyori
          console.log("自分側から見た相手の距離：" , store.getState().strDistance  )
        }else if (inputFlg == 2){
          setPartnerUser(BuffKyori[0].kinkyori)
          store.getState().partnerUser = BuffKyori[0].kinkyori
          console.log("相手側から見た自分の距離：" , store.getState().strDistance  )
        }
        break 
        
      case "(中距離)":
        if (inputFlg == 1) {
          setUserPartner(BuffKyori[0].tyuukyori)
          store.getState().userPartner = BuffKyori[0].tyuukyori
          console.log("自分側から見た相手の距離：" , store.getState().strDistance  )
        }else if (inputFlg == 2){
          setPartnerUser(BuffKyori[0].tyuukyori)
          store.getState().partnerUser = BuffKyori[0].tyuukyori
          console.log("相手側から見た自分の距離：" , store.getState().strDistance  )
        } 
        break

      case "(遠距離)":
        if (inputFlg == 1) {
          setUserPartner(BuffKyori[0].enkyori)
          store.getState().userPartner = BuffKyori[0].enkyori
          console.log("自分側から見た相手の距離：" , store.getState().strDistance  )
        }else if (inputFlg == 2){
          setPartnerUser(BuffKyori[0].enkyori)
          store.getState().partnerUser = BuffKyori[0].enkyori
          console.log("相手側から見た自分の距離：" , store.getState().strDistance  )
        } 
        break
    }
  }

  // 相性鑑定データを取得
  const getAisyouKanteiData = (RelationshipNum) => {
    // 入力した自分側の年と一致するか判定する
    console.log(RelationshipNum)
    const BuffAisyouKantei = AISYOUKANTEI.filter(item => item.Num == RelationshipNum)
    console.log("一致！！ Num ⇒",BuffAisyouKantei[0].Num)
    // 相性鑑定データを代入
    console.log("★",BuffAisyouKantei[0].kankei)
    setKankei(BuffAisyouKantei[0].kankei)
    store.getState().partnerKankei = BuffAisyouKantei[0].kankei

    setKihon(BuffAisyouKantei[0].gutaitekin_aisyou)
    store.getState().partnerKihon = BuffAisyouKantei[0].gutaitekin_aisyou

    setRenai(BuffAisyouKantei[0].renai_aisyou )
    store.getState().partnerRenai = BuffAisyouKantei[0].renai_aisyou

    setSigoto(BuffAisyouKantei[0].sigoto_aisyou)
    store.getState().partnerShigoto = BuffAisyouKantei[0].sigoto_aisyou
  }

  const getCalcAisyou = () => {
  // 二人の相性を算出
    var AfterYadoNum
    var AfterPartnerYadoNum

    // 宿星から見た相性(自分側)
    console.log(store.getState().syukuYouRekiNum , store.getState().partnerRekiNum)
    if(store.getState().syukuYouRekiNum <= 14){
      AfterYadoNum = Number(store.getState().syukuYouRekiNum) + 13
    }else{
      AfterYadoNum = store.getState().syukuYouRekiNum - 14
    }

    // 宿星から見た相性(相手側)
    if(store.getState().partnerRekiNum <= 14){
      AfterPartnerYadoNum = Number(store.getState().partnerRekiNum) + 13
    }else{
      AfterPartnerYadoNum = store.getState().partnerRekiNum - 14
    }
    console.log(AfterYadoNum , AfterPartnerYadoNum)
    // 二人の距離を算出
    getCalcAisyouDistance(AfterYadoNum , AfterPartnerYadoNum)

    var Distance
    var DistanceNum
    Distance = Math.abs(AfterYadoNum - AfterPartnerYadoNum)
    console.log(AfterYadoNum , " - " , AfterPartnerYadoNum , " = " , Distance)
    if (Distance == 0 || Distance == 9 || Distance == 18){
      store.getState().strDistance = ""
      DistanceNum = 1
      console.log("距離なし　DistanceNum => " , DistanceNum)
    }else if(Distance <= 4 || Distance >= 23){
      store.getState().strDistance = "(近距離)"
      DistanceNum = 1
      console.log(store.getState().strDistance , "　DistanceNum => " , DistanceNum)
    }else if(Distance <= 17 && Distance >= 10){
      store.getState().strDistance = "(遠距離)"
      DistanceNum = 3
      console.log(store.getState().strDistance , "　DistanceNum => " , DistanceNum)
    }else{
      store.getState().strDistance = "(中距離)"
      DistanceNum = 2
      console.log(store.getState().strDistance , "　DistanceNum => " , DistanceNum)
    }
  }

  // 二人の距離を算出
  const getCalcAisyouDistance = (YadoNum , PartnerYadoNum) => {
    console.log(YadoNum)
    console.log(PartnerYadoNum)
    const BuffYadoNum = SYUKUYOU_AISYOU.filter(item => item.jibunNum == YadoNum && item.aiteNum == PartnerYadoNum)
    console.log("自分側一致！！ num ⇒",BuffYadoNum[0].jibunNum)
    console.log("相手側一致！！ num ⇒",BuffYadoNum[0].aiteNum)
    console.log("自分相手関係の宿 => ",BuffYadoNum[0].yado)
    // 自分相手関係の宿を代入
      store.getState().userPartnerRelationship = BuffYadoNum[0].yado  

    const BuffPartnerYadoNum = SYUKUYOU_AISYOU.filter(item => item.jibunNum == PartnerYadoNum && item.aiteNum == YadoNum)
    console.log("自分側一致！！ num ⇒",BuffPartnerYadoNum[0].jibunNum)
    console.log("相手側一致！！ num ⇒",BuffPartnerYadoNum[0].aiteNum)
    console.log("相手自分関係の宿 => ",BuffPartnerYadoNum[0].yado)
    // 相手自分関係の宿を代入
    store.getState().partnerUserRelationship = BuffPartnerYadoNum[0].yado

  }

  // 宿曜歴番号を算出する
  const getCalcNumYado = (inputRekiNum , inputYear , inputMonth , inputDay , inputFlg) => {
    var numBuff = inputRekiNum// 宿曜暦番号を代入
    numBuff = numBuff -1
    var i
    var j
    // 月をループ
    for (i = 1 ; i <=12 ; i++){
      // 日をループ
      for(j = 1 ; j <= 31; j++){
        var date = new Date(inputYear,i-1,j) // 月は「0」を起点とするので「-1」で調整
        var iMonth = date.getMonth() + 1;
        var result

        if(i==iMonth){
          result = "有効な日付"
          numBuff++ // 宿曜暦番号を加算

          if(i == inputMonth  && j == inputDay){
            // 宿曜歴を取得する
            getYadoName(numBuff , inputFlg)
          }
  
          // 宿曜暦番号は27が上限値
          if(numBuff > 27){
            numBuff = 1
          }
        } else {
          result = "★無効な日付★"
        }
      }
    }
  }

  // 宿曜歴を取得する
  var getYadoName = (RekiNum , inputFlg) => {
    // 入力した自分側の年と一致するか判定する
    const BuffRekiNum = TAIOUHYOU.filter(item => item.num == RekiNum)
    // 自分側であれば"1"、相手側であれば"2"
    switch(inputFlg){
      case "1":
        console.log("自分側【" , RekiNum , "】一致！！ 宿 ⇒",BuffRekiNum[0].name , "(" , BuffRekiNum[0].yomi , ")") 
        // 宿曜暦番号を更新
        store.getState().syukuYouRekiNum = RekiNum

        // 宿名を代入
        store.getState().syukuYouRekiName = BuffRekiNum[0].name
        setYado(BuffRekiNum[0].name)
        
        // 読みを代入
        store.getState().syukuYouRekiYomi = BuffRekiNum[0].yomi
        setYomi(BuffRekiNum[0].yomi)
        break

      case "2": 
        console.log("相手側【" , RekiNum , "】一致！！ 宿 ⇒",BuffRekiNum[0].name , "(" , BuffRekiNum[0].yomi , ")") 
        // 宿曜暦番号を更新
        store.getState().partnerRekiNum = RekiNum

        // 宿名を代入
        store.getState().partnerRekiName = BuffRekiNum[0].name
        setPartnerYado(BuffRekiNum[0].name)
        
        // 読みを代入
        store.getState().partnerRekiYomi = BuffRekiNum[0].yomi
        setPartnerYomi(BuffRekiNum[0].yomi)
        break
    }
  }

  // 編集ボタンクリック時の処理
  const handleClickEdit = (event) =>{
    history.push("/aisyou/edit")
  }
  
  // 戻るボタンクリック時の処理
  const handleClickReturn = (event) =>{
    history.push("/")
  }

  // ボタンクリック時の処理
  const handleClick = (event) => {
    // 入力内容が空の場合はエラーを返す
    if(year ===""){
      console.log("自分側の年が選択されていない")
      setErrorMessage("自分側の年を選択してください。")
      setError(true)
      return
    }
    if(month ===""){
      console.log("自分側の月が選択されていない")
      setErrorMessage("自分側の月を選択してください。")
      setError(true)
      return
    }
    if(day ===""){
      console.log("自分側の日が選択されていない")
      setErrorMessage("自分側の日を選択してください。")
      setError(true)
      return
    }
    if(radio === ""){
      console.log("自分側のラジオボタンが選択されていない")
      setErrorMessage("自分側の性別を選択してください。")
      setError(true)
      return
    }
    // 相手情報の入力内容が空の場合はエラーを返す
    if(partneryear ===""){
      console.log("相手の年が選択されていない")
      setErrorMessage("相手の年を選択してください。")
      setError(true)
      return
    }
    if(partnermonth ===""){
      console.log("相手の月が選択されていない")
      setErrorMessage("相手の月を選択してください。")
      setError(true)
      return
    }
    if(partnerday ===""){
      console.log("相手の日が選択されていない")
      setErrorMessage("相手の日を選択してください。")
      setError(true)
      return
    }
    if(partnerradio === ""){
      console.log("相手のラジオボタンが選択されていない")
      setErrorMessage("相手の性別を選択してください。")
      setError(true)
      return
    }
    setSuccess(true)
    setError(false)
    store.getState().userName  = name
    store.getState().userYear  = year
    store.getState().userMonth = month
    store.getState().userDay   = day
    store.getState().userSex   = radio
    store.getState().partnerName  = partnername
    store.getState().partnerYear  = partneryear
    store.getState().partnerMonth = partnermonth
    store.getState().partnerDay   = partnerday
    store.getState().partnerSex   = partnerradio
    console.log("正常に入力されている")
    // Diagnosis()
    history.push("/aisyou/result")
    console.log("=================================")
  }

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">相性診断</Typography >
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">自分の生年月日</Typography >
          </Grid>

          {/* 名まえ入力欄 */}
          <Grid item xs={7} align="right">
            <Typography variant="h6">自分の名前</Typography >
          </Grid>
          <Grid item xs={5} align="left">
            <TextField
              variant="standard"
              value ={name}
              label = "お名前を入力"
              onChange={(e) => 
                setName(e.target.value)}/>
          </Grid>

          {/* 生年月日入力欄 */}
          <Grid item xs = {3} align = "right">
            <YearSelect
              id        = "AisyouSelectYear"
              label     = "年を選択"
              value     = {year}
              onChange  ={(e) =>
                setYear(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>年</Typography>
          </Grid>
          <Grid item xs = {3} align = "right">
            <MonthSelect
              id       = "KojinSelectMonth"
              label    = "月を選択"
              value    = {month}
              onChange ={(e) =>
                setMonth(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>月</Typography>
          </Grid>
          <Grid item xs = {3} align = "right">
            <DaySelect
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
          <Grid item xs={12} align="center">
            <RadioGroup
              id       = "KojinRadioGroup"
              value    = {radio}
              onChange = {(e) => 
                setRadio(e.target.value)}></RadioGroup>
          </Grid>

        </Grid>
        <br/>

        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h5">相手の生年月日</Typography >
          </Grid>

          {/* 名まえ入力欄 */}
          <Grid item xs={7} align="right">
            <Typography variant="h6">相手の名前</Typography >
          </Grid>
          <Grid item xs={5} align="left">
            <TextField
              variant="standard"
              value ={partnername}
              label = "お名前を入力"
              onChange={(e) => 
                setPartnerName(e.target.value)}/>
          </Grid>

          {/* 生年月日入力欄 */}
          <Grid item xs = {3} align = "right">
            <PartnerYearSelect
              id        = "AisyouSelectYear"
              label     = "年を選択"
              value     = {partneryear}
              onChange  ={(e) =>
                setPartnerYear(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>年</Typography>
          </Grid>
          <Grid item xs = {3} align = "right">
            <PartnerMonthSelect
              id       = "KojinSelectMonth"
              label    = "月を選択"
              value    = {partnermonth}
              onChange ={(e) =>
                setPartnerMonth(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>月</Typography>
          </Grid>
          <Grid item xs = {3} align = "right">
            <PartnerDaySelect
              id        = "KojinSelectDay"
              label     = "日を選択"
              value     = {partnerday}
              onChange  ={(e) =>
                setPartnerDay(e.target.value)}/>
          </Grid>
          <Grid item xs = {1} align = "left">
            <Typography>日</Typography>
          </Grid>

          {/* 性別のラジオボタン */}
          <Grid item xs={12} align="center">
            <PartnerRadioGroup
              id       = "KojinRadioGroup"
              value    = {partnerradio}
              onChange = {(e) => 
                setPartnerRadio(e.target.value)}></PartnerRadioGroup>
          </Grid>

          {/* 投稿が失敗した場合はアラートを出す */}
          <Grid item xs={12} align="center">
            {error && <Alert severity="error">{errormessage}</Alert>}
          </Grid>

          {/* 鑑定ボタン */}
          <Grid item xs={4} align="right">
            <AisyouButton
              id      = "kantei"
              text    = "鑑定"
              variant = "contained"
              xs      = "12"
              link    = "/aisyou/result"
              onClick ={handleClick}/>
          </Grid>
          {/* 相性鑑定データ編集ボタン */}
          <Grid item xs={4} align="center">
            <AisyouButton
                id      = "kanteihensyuu"
                text    = "相性鑑定内容編集"
                variant = "contained"
                xs      = "12"
                link    = "/aisyou/edit"
                onClick ={handleClickEdit}/>
          </Grid>
          {/* 戻るボタン */}
          <Grid item xs={4} align="left">
            <AisyouButton
                id      = "back"
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

export default 相性診断;
