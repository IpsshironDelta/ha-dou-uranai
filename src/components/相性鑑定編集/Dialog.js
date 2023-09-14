import React, 
     { useState , 
       useEffect}        from 'react'
import Button            from '@mui/material/Button';
import TextField         from '@mui/material/TextField';
import Dialog            from '@mui/material/Dialog';
import DialogActions     from '@mui/material/DialogActions';
import DialogContent     from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle       from '@mui/material/DialogTitle';
import {firebaseApp }    from "../../firebase"
import {addDoc,
        collection,
        doc,
        updateDoc, 
        getDocs,}        from "firebase/firestore"

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const AisyouKanteiData = "AisyouKanteiData"
const KyoriData        = "AisyouKanteiDataKyori"

export default function FormDialog(props) {
  const [text , setText] = useState("")
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
    event = ""
  };

  const handleChange = (getText , getID , getType) => {
    console.log("★" , getText, getID , getType)
    const firestore = firebaseApp.firestore
    getDocs(collection(firestore, AisyouKanteiData)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        if(document.data().Num == getID){
          const AisyouKanteiRef = doc(firestore , AisyouKanteiData , document.id)
          switch (getType){
            case "kankei":
              console.log("★★" , document.data().Num , getType )
              updateDoc(AisyouKanteiRef, {
                kankei     : getText,
                sub_kankei : getText.substring(0,15)
              })
              break
            case "gutaitekin_aisyou":
              console.log("★★" , document.data().Num , getType)
              updateDoc(AisyouKanteiRef, {
                gutaitekin_aisyou : getText,
                sub_aisyou        : getText.substring(0,15)
              })
              break
            case "renai_aisyou":
              console.log("★★" , document.data().Num , getType)
              updateDoc(AisyouKanteiRef, {
                renai_aisyou : getText,
                sub_renai    : getText.substring(0,15)
              })
              break
            case "sigoto_aisyou":
              console.log("★★" , document.data().Num , getType)
              updateDoc(AisyouKanteiRef, {
                sigoto_aisyou : getText,
                sub_sigoto    : getText.substring(0,15)
              })
              break
          }
        }
      })
    })
    const firestoreKyori = firebaseApp.firestore
    getDocs(collection(firestoreKyori, KyoriData)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        if(document.data().Num == getID){
          const KyoriDataRef = doc(firestoreKyori , KyoriData , document.id)
          switch (getType){
            case "kinkyori":
              console.log("★★" , document.data().Num , getType)
              updateDoc(KyoriDataRef, {
                kinkyori     : getText,
                sub_kinkyori : getText.substring(0,15)
              })
              break
            case "tyuukyori":
              console.log("★★" , document.data().Num , getType)
              updateDoc(KyoriDataRef, {
                tyuukyori     : getText,
                sub_tyuukyori : getText.substring(0,15)
              })
              break
            case "enkyori":
              console.log("★★" , document.data().Num , getType)
              updateDoc(KyoriDataRef, {
                enkyori     : getText,
                sub_enkyori : getText.substring(0,15)
              })
              break
          }
        }
      })
    })
  }

  // 更新ボタンクリック時の処理
  const handleClose = (getText) => {
    setOpen(false)
    console.log("入力したテキスト→",getText.text , props.id , props.type)
    // firebaseを更新する
    if(String(getText.text) == ""){
      console.log("getTextが空白なので更新しない")
    }else{
      handleChange(getText.text , props.id , props.type)
    }
  }

  // キャンセルボタンクリック時の処理
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.title}･･･
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={props.maxWidth}>
        <DialogTitle>文章を編集する</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
          <TextField
            rows={10}
            autoFocus
            multiline
            fullWidth
            id           = {props.id}
            type         = {props.type}
            variant      = "standard"
            label        = "更新する文章を入力してください。"
            value        = {text}
            onChange     ={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleCancel()}>キャンセル</Button>
          <Button onClick={(e) => handleClose({text})}>更新する</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
