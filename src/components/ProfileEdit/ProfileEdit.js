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
import useUser              from "../hooks/getuseAuth"
import {addDoc,
        collection,}        from "firebase/firestore"
import {createTheme, 
        ThemeProvider }     from '@mui/material/styles';
import useProfile           from "../hooks/useProfile"
import store                from '../../store/index';
import {useHistory}         from "react-router-dom";
import Header               from "../Header"

/////////////////////////////////////////
// スタイル
/////////////////////////////////////////

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

const collectionUserName    = "UserInfo"
const collectionNayami      = "Nayami"
const collectionMessageName = "message"

const ProfileEdit = () => {
  const [name, setName] = useState(store.getState().displayName)       // プロフィール名
  const [error, setError] = useState(false)                            // エラー判定
  const [success, setSuccess] = useState(false)                        // 成功判定
  const [errormessage , setErrorMessage] = useState("")                // エラーメッセージ
  const firestore = firebaseApp.firestore
  const profileData = useProfile()
  const profile = profileData.profile
  const { user } = useUser()
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    // 入力内容が空の場合はエラーを返す
    if(name === ""){
      console.log("名前が未入力")
      setErrorMessage("名前を入力してください")
      setError(true)
      return
    }

    const uid = user.uid
    const docRef = collection(firestore, collectionUserName)

    // firestoreに名前、uid、emailを追加する
    addDoc(docRef, {
        name  :name,
        uid   :uid,
        email :user.email,
      })
    // 成功したアラート表示
    setSuccess(true)
    setTimeout(() => {
      history.push("/")
    },2000)
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