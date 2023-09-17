import React, 
     { useState , 
       useEffect}         from 'react'
import Button             from '@mui/material/Button'
import Grid               from '@mui/material/Grid'
import { styled }         from '@mui/material/styles';
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import TextField          from '@mui/material/TextField'
import { useHistory }     from "react-router-dom";
import Header             from "../Header"
import AisyouResultButton from "./AisyouResultButton"
import store              from '../../store'
import jsPDF              from "jspdf";
import html2canvas        from "html2canvas";
import {SYUKUYOU_AISYOU , 
       AISYOUKANTEI , 
       AISYOU_KANTEI_KYORI ,
       TAIOUHYOU ,
       SYUKUYOUREKI}      from "../ObjectData"
import {addDoc,
        collection,
        doc,
        updateDoc, 
        getDocs,}         from "firebase/firestore"
 import {firebaseApp }    from "../../firebase"

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
  backgroundColor: '#EC6671',
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
const MineFlg               = "1"
const PartnerFlg            = "2"
const CommonBorderSettind   = "solid #000000 1.5px"
const AisyouKanteiDataKyori = "AisyouKanteiDataKyori"
const AisyouKanteiData      = "AisyouKanteiData"

function 相性診断結果表示() {
  // ------------------入力系変数------------------
  const now = new Date()               // 本日の日付を取得
  const nowYear  = now.getFullYear()   // 本日の年を取得
  const nowMonth = now.getMonth() + 1  // 本日の月を取得
  const nowDay   = now.getDate()       // 本日の日を取得

  const [name  , setName]  = useState(store.getState().userName)  // 個人鑑定名前
  const [year  , setYear]  = useState(store.getState().userYear ) // 年を選択
  const [month , setMonth] = useState(store.getState().userMonth) // 月を選択
  const [day   , setDay]   = useState(store.getState().userDay)   // 日を選択
  const [radio , setRadio] = useState(store.getState().userSex)   // ラジオボタン
  const [age   , setAge]   = useState("")                         // 年齢
  const [yado  , setYado]  = useState(store.getState().syukuYouRekiName) // 宿名
  const [yomi  , setYomi]  = useState(store.getState().syukuYouRekiYomi) // 宿名(読み)
  const [partnername  , setPartnerName]  = useState(store.getState().partnerName)  // 相手の個人鑑定名前
  const [partneryear  , setPartnerYear]  = useState(store.getState().partnerYear ) // 相手の年を選択
  const [partnermonth , setPartnerMonth] = useState(store.getState().partnerMonth) // 相手の月を選択
  const [partnerday   , setPartnerDay]   = useState(store.getState().partnerDay)   // 相手の日を選択
  const [partnerradio , setPartnerRadio] = useState(store.getState().partnerSex)   // 相手のラジオボタン
  const [partnerage   , setPartnerAge]   = useState("")                            // 相手の年齢
  const [partneryado  , setPartnerYado]  = useState(store.getState().partnerRekiName) // 相手の宿名
  const [partneryomi  , setPartnerYomi]  = useState(store.getState().partnerRekiYomi) // 相手の宿名(読み)
  const [kankei       , setKankei]       = useState("")    // 1.お二人の関係
  const [kihon        , setKihon]        = useState("")     // 2.基本的な相性
  const [renai        , setRenai]        = useState("")     // 3.恋愛関係の相性
  const [sigoto       , setSigoto]       = useState("")   // 4.仕事関係の相性
  const [userpartner  , setUserPartner]  = useState("")      // 5.自分側から見た相手との関係
  const [partneruser  , setPartnerUser]  = useState("")      // 6.相手側から見た自分との関係

  const history = useHistory()

  useEffect(() => {
    // 年齢を取得する
    getAage()

    Diagnosis()
  },[])

  // 年齢を取得
  const getAage = () =>{
    // 生年月日の日付データを取得
    const birthdate = new Date(year, month - 1, day)
    const partner_birthdate = new Date(partneryear, partnermonth - 1, partnerday)

    // 今年の誕生日の日付データを取得
    const currentYearBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate())

    // 生まれた年と今年の差を計算
    let getAge = now.getFullYear() - birthdate.getFullYear()
    let partnerGetAge = now.getFullYear() - partner_birthdate.getFullYear()

    // 今日の日付と今年の誕生日を比較
    if (now < currentYearBirthday) {
      // 今年誕生日を迎えていない場合、1を引く
      getAge--
      partnerGetAge--
    }
    // 年齢の値をセットする
    setAge(getAge)
    store.getState().userAge = getAge
    setPartnerAge(partnerGetAge)
    store.getState().partnerAge = partnerGetAge
  }

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

  }

  // 相性鑑定データの距離を取得
  const getAisyouKanteiDataKyori = (RelationshipNum , inputFlg) => {
    const BuffKyori = AISYOU_KANTEI_KYORI.filter(item => item.Num == RelationshipNum)

    const firestore = firebaseApp.firestore
    getDocs(collection(firestore, AisyouKanteiDataKyori)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        if(document.data().Num == RelationshipNum){
          console.log(document.data().Num , "で番号が一致しているため相性の距離情報を代入")
          const aisyoukyoriRef = doc(firestore , AisyouKanteiDataKyori , document.id)

          switch(store.getState().strDistance){
            case "(近距離)":
              if (inputFlg == 1) {
                setUserPartner(document.data().kinkyori)
                store.getState().userPartner = document.data().kinkyori
                console.log("自分側から見た相手の距離：" , store.getState().strDistance  )
              }else if (inputFlg == 2){
                setPartnerUser(document.data().kinkyori)
                store.getState().partnerUser =document.data().kinkyori
                console.log("相手側から見た自分の距離：" , store.getState().strDistance  )
              }
              break 
              
            case "(中距離)":
              if (inputFlg == 1) {
                setUserPartner(document.data().tyuukyori)
                store.getState().userPartner = document.data().tyuukyori
                console.log("自分側から見た相手の距離：" , store.getState().strDistance  )
              }else if (inputFlg == 2){
                setPartnerUser(document.data().tyuukyori)
                store.getState().partnerUser = document.data().tyuukyori
                console.log("相手側から見た自分の距離：" , store.getState().strDistance  )
              } 
              break
      
            case "(遠距離)":
              if (inputFlg == 1) {
                setUserPartner(document.data().enkyori)
                store.getState().userPartner = document.data().enkyori
                console.log("自分側から見た相手の距離：" , store.getState().strDistance  )
              }else if (inputFlg == 2){
                setPartnerUser(document.data().enkyori)
                store.getState().partnerUser = document.data().enkyori
                console.log("相手側から見た自分の距離：" , store.getState().strDistance  )
              } 
              break
            }
        }
      })
    })
  }

  // 相性鑑定データを取得
  const getAisyouKanteiData = (RelationshipNum) => {

    const firestore = firebaseApp.firestore
    getDocs(collection(firestore, AisyouKanteiData)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        if(document.data().Num == RelationshipNum){
          console.log(document.data().Num , "で番号が一致しているため相性鑑定情報を代入")
          const aisyoukanteiRef = doc(firestore , AisyouKanteiData , document.id)

          // 相性鑑定データを代入
          // 1.関係を代入
          console.log("★",document.data().kankei)
          setKankei(document.data().kankei)
          store.getState().partnerKankei = document.data().kankei

          // 2.基本的な相性を代入
          console.log("★",document.data().gutaitekin_aisyou)
          setKihon(document.data().gutaitekin_aisyou)
          store.getState().partnerKihon = document.data().gutaitekin_aisyou

          // 3.恋愛相性を代入
          console.log("★",document.data().renai_aisyou)
          setRenai(document.data().renai_aisyou)
          store.getState().partnerRenai = document.data().renai_aisyou

          // 4.仕事の相性を代入
          console.log("★",document.data().sigoto_aisyou)
          setSigoto(document.data().sigoto_aisyou)
          store.getState().partnerShigoto = document.data().sigoto_aisyou
        }
      })
    })
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

  // PDFに出力する
  const printDocument = () => {
    history.push("/aisyouprint")
  };

  // 相性診断画面に戻るボタンクリック時の処理
  const reterunAisyou = () => {
    history.push("/aisyou")
  }

  return (
    <div className='aisyou' id='test'>
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
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
              <Grid item xs={5} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{name} 様</Typography>
              </Grid>
              <Grid item xs={7} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>西暦{year}年{month}月{day}日　生まれ</Typography>
              </Grid>
              <Grid item xs={10} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{age} 歳</Typography>
              </Grid>
              <Grid item xs={2} align = "left">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{radio}性</Typography>
              </Grid>

              <br/>

              {/* 相手側の情報 */}
              <Grid item xs={5} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{partnername} 様</Typography>
              </Grid>
              <Grid item xs={7} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>西暦{partneryear}年{partnermonth}月{partnerday}日　生まれ</Typography>
              </Grid>
              <Grid item xs={10} align = "right">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{partnerage} 歳</Typography>
              </Grid>
              <Grid item xs={2} align = "left">
                <Typography 
                  sx = {{
                    fontSize      : 16,
                  }}>{partnerradio}性</Typography>
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
              </Grid>
            </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* 本命宿表示領域 */}
          <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Grid container spacing={1}>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>自分側の本命宿：</Typography>
                </Grid>
                <Grid item xs={6} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>相手側の本命宿：</Typography>
                </Grid>
                <Grid item xs={6} align = "right">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{yado}（{yomi}）</Typography>
                </Grid>

                <Grid item xs={6} align = "right">
                  <Typography 
                    sx = {{
                      fontSize      : 20,
                    }}>{partneryado}（{partneryomi}）</Typography>
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
                      fontSize      : 16,
                    }}>1.おふたりの関係</Typography>
                  <TextField
                    defaultValue = {kankei}
                    multiline
                    fullWidth 
                    rows={5}/>
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>2.基本的な相性</Typography>
                  <TextField
                    defaultValue = {kihon}
                    multiline
                    fullWidth 
                    rows={15}/>
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
                    }}>3.恋愛関係の相性</Typography>
                  <TextField
                    defaultValue = {renai}
                    multiline
                    fullWidth 
                    rows={15}/>
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>4.仕事関係の相性</Typography>
                  <TextField
                    defaultValue = {sigoto}
                    multiline
                    fullWidth 
                    rows={15}/>
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
                    }}>5.自分側から見た相手との関係</Typography>
                  <TextField
                    defaultValue = {userpartner}
                    multiline
                    fullWidth 
                    rows={5}/>
                </Grid>
                <Grid item xs={12} align = "left">
                  <Typography 
                    sx = {{
                      fontSize      : 16,
                    }}>6.相手側から見た自分との関係</Typography>
                  <TextField
                    defaultValue = {partneruser}
                    multiline
                    fullWidth 
                    rows={5}/>
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
              id      = "aisyouback"
              text    = "相性診断画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/aisyou"
              onClick = {reterunAisyou}>戻る</BootstrapButton>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
    </div>
  );
}

export default 相性診断結果表示;
