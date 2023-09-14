import React, 
     { useState , 
       useEffect}      from 'react'
import Button          from '@mui/material/Button'
import Grid            from '@mui/material/Grid'
import Box             from '@mui/material/Box'
import Container       from '@mui/material/Container'
import Typography      from '@mui/material/Typography'
import { useHistory }  from "react-router-dom";
import Header          from "../Header"
import MonthEditButton from "./MonthEditButton"
import MonthDataEditTable from "./MonthDataEditTable"
import MonthDataEditTable_2 from "./MonthDataEditTable-2"

function 月運表データ編集() {
  const history = useHistory()

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">月運表データ編集</Typography >
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
          <MonthEditButton
              id      = "update"
              text    = "更新する"
              variant = "contained"
              xs      = "12"
              link    = "/monthchart"/>
          </Grid>
          <Grid item xs={4} align="center">
            <MonthEditButton
              id      = "back"
              text    = "月運表画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/monthchart"/>
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
            <MonthDataEditTable/>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="center">
            <Grid item xs={12} align="left">
              <Typography variant="h6">12カ月周期の宿月運表</Typography >
            </Grid>
            <MonthDataEditTable_2/>
            <Grid item xs={12} align="left">
              <Typography 
                sx = {{
                  fontSize : 14,}}>※月運の切り替わりが新暦の1日になるように月運の宿をおおまかに変換しています。</Typography >
            </Grid>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
          <MonthEditButton
              id      = "update"
              text    = "更新する"
              variant = "contained"
              xs      = "12"
              link    = "/monthchart"/>
          </Grid>
          <Grid item xs={4} align="center">
            <MonthEditButton
              id      = "back"
              text    = "月運表画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/monthchart"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 月運表データ編集;
