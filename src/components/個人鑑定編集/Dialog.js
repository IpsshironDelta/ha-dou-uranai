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
const Kojinkantei_Data = "Kojinkantei_Data"

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
    getDocs(collection(firestore, Kojinkantei_Data)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        if(document.data().num == getID){
          const kojinkanteiRef = doc(firestore , Kojinkantei_Data , document.id)
          switch (getType){
            case "seikaku":
              console.log("★★" , document.data().num , getType)
              updateDoc(kojinkanteiRef, {
                seikaku     : getText,
                sub_seikaku : getText.substring(0,13)
              })
              break
            case "tekisyoku":
              console.log("★★" , document.data().num , getType)
              updateDoc(kojinkanteiRef, {
                tekisyoku     : getText,
                sub_tekisyoku : getText.substring(0,13)
              })
              break
            case "okane":
              console.log("★★" , document.data().num , getType)
              updateDoc(kojinkanteiRef, {
                okane     : getText,
                sub_okane : getText.substring(0,13)
              })
              break
            case "kenkou":
              console.log("★★" , document.data().num , getType)
              updateDoc(kojinkanteiRef, {
                kenkou     : getText,
                sub_kenkou : getText.substring(0,13)
              })
              break
            case "renai":
              console.log("★★" , document.data().num , getType)
              updateDoc(kojinkanteiRef, {
                renai     : getText,
                sub_renai : getText.substring(0,13)
              })
              break
            case "kaiunn":
              console.log("★★" , document.data().num , getType)
              updateDoc(kojinkanteiRef, {
                kaiunn     : getText,
                sub_kaiunn : getText.substring(0,13)
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
    console.log("入力したテキスト→",getText.text , props.id,props.type)
    if(String(getText.text) == ""){
      console.log("getTextが空白なので更新しない")
    }else{
      // firebaseを更新する
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
        {props.title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>文章を編集する</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
          <TextField
            rows={10}
            autoFocus
            multiline
            id      = {props.id}
            type    = {props.type}
            fullWidth
            variant = "standard"
            label   = "更新する文章を入力してください。"
            value   = {text}
            onChange={(e) => setText(e.target.value)}
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
