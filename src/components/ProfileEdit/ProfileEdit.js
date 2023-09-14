import React, { useState }  from "react"
import {Avatar,
        Alert,
        Typography,
        CssBaseline,
        Box,
        TextField,
        Button,
        Container,
        Grid , }            from "@mui/material"
import {firebaseApp }       from "../../firebase"
import {ref,
        uploadBytes,
        getDownloadURL,}    from "firebase/storage"
import useUser              from "../hooks/getuseAuth"
import {addDoc,
        collection,
        doc,
        updateDoc, 
        getDocs,}           from "firebase/firestore"
import {createTheme, 
        ThemeProvider }     from '@mui/material/styles';
import useProfile           from "../hooks/useProfile"
import store                from '../../store/index';
import {useHistory}         from "react-router-dom";
import Header from "../Header"

const theme = createTheme({
  shadows: ["none"],
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#EC6671',
      contrastText: '#ffffff',
    },
    // 背景のカラー設定
    background: {
      default: '#ffffff',
    },
    // テキストのカラー設定
    text: { primary: '#000000' },
  },
});

const collectionUserName    = "users"
const collectionNayami      = "Nayami"
const collectionMessageName = "message"

const ProfileEdit = () => {
  const [name, setName] = useState(store.getState().displayName)       // プロフィール名
  const [disability , setDisability] = useState(store.getState().memo) // 障がいや病気など
  const [error, setError] = useState(false)                            // エラー判定
  const [success, setSuccess] = useState(false)                        // 成功判定
  const [errormessage , setErrorMessage] = useState("")                // エラーメッセージ
  const [image, setImage] = useState()
  const firestorage = firebaseApp.firestorage
  const firestore = firebaseApp.firestore
  const profileData = useProfile()
  const profile = profileData.profile
  const { user } = useUser()
  const history = useHistory()

  const handleChange = (e) => {
    console.log(e.target.files)
    console.log("handleChange 通過")
    if (e.target.files !== null) {
        setImage(e.target.files[0])
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    // 入力内容が空の場合はエラーを返す
    if(name === ""){
      console.log("ユーザー名が未入力")
      setErrorMessage("ユーザー名を入力してください")
      setError(true)
      return
    }
    if(disability === ""){
      console.log("自己紹介が未入力")
      setErrorMessage("自己紹介を入力してください")
      setError(true)
      return
    }

    try {
        const uid = user.uid
        const docRef = collection(firestore, collectionUserName)
 
        if(image){
            const imageRef = ref(firestorage, 'USER_PROFILE_IMG/' + uid + "/" + image.name)
            // firebase strageへ画像をアップロード
            uploadBytes(imageRef, image).then(() => {
                // getDownloadURLの中で、profileがある場合はupdateDocを指定
                // profileがない場合はaddDocを指定
                // imageがない場合も同様に指定
                getDownloadURL(imageRef).then(url => {
                  console.log(url)
                  if (profile) {
                    const userRef = doc(firestore, collectionUserName , profile?.id)
                    updateDoc(userRef, {
                      name,
                      image: url,
                      disability,})
                    // messageドキュメント内の対象のユーザー情報を更新する
                    updateMessage(name , url)
                    // Nayamiドキュメント内の対象のユーザー情報を更新する
                    updateNayami(name , url)
                  }else{
                    // firestoreに名前、画像URL、uidを追加する
                    addDoc(docRef, {
                        name,
                        image: url,
                        uid,
                        disability,
                      })
                    }
                })
              })
              }else{
                // 画像を選択する
                if (profile) {
                  const userRef = doc(firestore, collectionUserName, profile?.id)
                  updateDoc(userRef, { name , disability})
                  // messageドキュメント内の対象のユーザー情報を更新する
                  updateMessage(name , profile.image)
                  // Nayamiドキュメント内の対象のユーザー情報を更新する
                  updateNayami(name , profile.image)
              } else {
                addDoc(docRef, { 
                  name, 
                  image: "", 
                  uid ,
                  disability ,})
              }}
              console.log("画像アップロード完了!")
              // 成功したアラート表示
              setSuccess(true)
              setTimeout(() => {
                history.push("/")
              },2000)
            } catch (err) {
              console.log(err)
              // 失敗したアラート表示
              setError(true)
            }
          }
  
  //  messegeドキュメント内の対象ユーザーの情報を更新する
  const updateMessage = (getName , getImage) => {
    getDocs(collection(firestore, collectionMessageName)).then((querySnapshot)=>{
      querySnapshot.forEach((docMessage) => {
        // 対象の作品(getrecipenum)と一致するコメントのみ表示する
        if(String(profile.uid) === String(docMessage.data().user.uid)){
          const messageRef = doc(firestore , collectionMessageName , docMessage.id)
          updateDoc(messageRef, { user : { 
                                    name  : getName,
                                    image : getImage,
                                    uid   : docMessage.data().user.uid,}, })
        }
      })
    })
  }

  // Nayamiドキュメント内の対象ユーザーの情報を更新する
  const updateNayami = (getName , getImage) => {
    getDocs(collection(firestore, collectionNayami)).then((querySnapshot)=>{
      querySnapshot.forEach((docNayami) => {
        // 対象の作品のIDと一致するコメントのみ表示する
        if(String(profile.uid) === String(docNayami.data().userinfo.uid)){
          console.log(getImage)
          const nayamiRef = doc(firestore , collectionNayami , docNayami.id)
          updateDoc(nayamiRef, { userinfo : { 
                                  userimgurl : getImage,
                                  user       : getName,
                                  uid        : docNayami.data().userinfo.uid,}, })
        }
      })
    })
  }

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
            <Header/>
        </Container>
        <Container maxWidth="sm">
        <CssBaseline />
          {error && <Alert severity="error">{errormessage}</Alert>}
          {success && (<Alert severity="success"> {profile ? "更新" : "作成"}しました</Alert>)}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <Container align="left">
              {/* ユーザー名の表示 */}
              <Typography 
                sx = {{ fontSize: 18 ,
                  backgroundColor : "#ffffff",
                  color : "#000000",}}>
                お名前
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                defaultValue={name}
                value={name ? name :  ""}
                onChange={e => 
                  setName(e.target.value)}/>
            </Container>
          <br/>
          <Grid container spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4} align="center">
              <Button type="submit" fullWidth variant="contained" >
                {profile ? "更新する" : "作成する"}
              </Button>
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
          <br/>
          <br/>
          </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ProfileEdit