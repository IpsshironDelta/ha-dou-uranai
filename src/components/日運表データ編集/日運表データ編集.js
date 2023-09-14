import React, 
     { useState , 
       useEffect}         from 'react'
import Button             from '@mui/material/Button'
import Grid               from '@mui/material/Grid'
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import { useHistory }     from "react-router-dom";
import Header             from "../Header"
import DayDataEditButton  from "./DayDataEditButton"
import DayDataEditTable from "./DayDataEditTable"
import DayDataEditTable_2 from "./DayDataEditTable-2"

function 日運表データ編集() {
  const history = useHistory()

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">日運表データ編集</Typography >
            <Typography variant="h6">「日運バイオリズム」を書き換えると自動出力される鑑定文を変えることが出来ます。</Typography >
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <DayDataEditButton
                id      = "update"
                text    = "更新する"
                variant = "contained"
                xs      = "12"
                link    = "/daychart"/>
          </Grid>
          <Grid item xs={4} align="center">
            <DayDataEditButton
                id      = "back"
                text    = "日運表画面へ戻る"
                variant = "contained"
                xs      = "12"
                link    = "/daychart"/>
          </Grid>
          <Grid item xs={4} align="center">
          </Grid>

          {/* バイオリズム表領域 */}
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="center">
            <Grid item xs={12} align="left">
              <Typography variant="h6">バイオリズム表</Typography >
            </Grid>
            <DayDataEditTable/>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="center">
            <Grid item xs={12} align="left">
              <Typography variant="h6">日運の宿番号表</Typography >
            </Grid>
            <DayDataEditTable_2/>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <DayDataEditButton
                id      = "update"
                text    = "更新する"
                variant = "contained"
                xs      = "12"
                link    = "/daychart"/>
          </Grid>
          <Grid item xs={4} align="center">
            <DayDataEditButton
                id      = "back"
                text    = "日運表画面へ戻る"
                variant = "contained"
                xs      = "12"
                link    = "/daychart"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 日運表データ編集;
