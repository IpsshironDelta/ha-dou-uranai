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
const DayUnnHyouData = "DayUnHyouData"

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
    getDocs(collection(firestore, DayUnnHyouData)).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {
        if(document.data().DayBaiorizumNum == getID){
          const DayUnnBaiorizumRef = doc(firestore , DayUnnHyouData , document.id)
          switch (getType){
            case "DayBaiorizumText":
              console.log("★★" , document.data().DayBaiorizumNum , getType)
              updateDoc(DayUnnBaiorizumRef, {
                DayBaiorizumText     : getText,
                sub_Text : getText.substring(0,20)
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
        {props.title}…
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
