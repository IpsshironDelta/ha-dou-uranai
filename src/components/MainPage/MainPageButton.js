import * as React      from 'react';
import { styled }      from '@mui/material/styles';
import Button          from '@mui/material/Button';
import Stack           from '@mui/material/Stack';
import { purple }      from '@mui/material/colors';
import { useHistory }  from "react-router-dom";
import Grid            from '@mui/material/Grid'
import store           from '../../store';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#ff5757',
  borderColor: '#EC6671',
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
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export default function CustomizedButtons(props) {

  const history = useHistory()

  // 命式が入力されているか判定する
  const handleMeishikiJudge = (getLink , getID) => {
    if( store.getState().userYear == "" || store.getState().userMonth == "" || store.getState().userDay == ""){
      console.log("未入力！！")
      if(getID == "yearthchart" || getID == "monthchart" || getID == "daychart"){
        console.log(getID , "なので、遷移しない")
        return
      }
    }else{
      console.log(store.getState().userYear)
      console.log(store.getState().userMonth)
      console.log(store.getState().userDay)
    }
    history.push(getLink)
  }

    // 命式をクリアする
  const MeishikiClear = (getID) => {
    if(getID == "clear"){
      console.log("命式クリア！！")
      store.getState().userYear   = ""
      store.getState().userMonth = ""
      store.getState().userDay   = ""
      console.log(store.getState().userYear)
      console.log(store.getState().userMonth)
      console.log(store.getState().userDay)
    }
  }
  return (
    <Stack spacing={2} direction="row">
      <Grid 
        item xs  = {props.xs}
        align    = {props.align}>
        <BootstrapButton disableRipple
        id       = {props.id}
        variant  = {props.variant}
        onClick  = {() => {
              handleMeishikiJudge(props.link , props.id)
              MeishikiClear(props.id)}}>
          {props.text}
        </BootstrapButton>
      </Grid>
    </Stack>
  );
}
