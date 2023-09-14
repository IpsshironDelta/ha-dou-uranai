import React, 
     { useState , 
       useEffect}    from 'react'
import Button        from '@mui/material/Button'
import Grid          from '@mui/material/Grid'
import Box           from '@mui/material/Box'
import Container     from '@mui/material/Container'
import Typography    from '@mui/material/Typography'
import { useHistory } from "react-router-dom";
import Header from "../Header"
import YearDataEditButton from "./YearDataEditButton"
import YearDataEditTable from "./YearDataEditTable"
import YearDataEditTable_2 from "./YearDataEditTable-2"

function 年運表データ編集() {
  const history = useHistory()

  return (
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#fce9ed' }}>
        <Header/>
        <Grid container spacing={2}>
          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <Typography variant="h4">年運表データ編集</Typography >
            <Typography variant="h6">「年運バイオリズム」を書き換えると自動出力される鑑定文を変えることが出来ます。</Typography >
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <YearDataEditButton
              id      = "yeardataupdate"
              text    = "更新する"
              variant = "contained"
              xs      = "12"
              link    = "/yearchart"/>
          </Grid>
          <Grid item xs={4} align="center">
            <YearDataEditButton
              id      = "yeardataback"
              text    = "年運表画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/yearchart"/>
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
            <YearDataEditTable/>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={10} align="center">
            <Grid item xs={12} align="left">
              <Typography variant="h6">28年周期の宿年運表</Typography >
            </Grid>
            <YearDataEditTable_2/>
            <Grid item xs={12} align="left">
              <Typography 
                sx = {{
                  fontSize : 14,}}>※2009年以前、2036年以降は28年周期で繰り返し、斗宿は2年繰り返す</Typography >
            </Grid>
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <YearDataEditButton
              id      = "yeardataupdate"
              text    = "更新する"
              variant = "contained"
              xs      = "12"
              link    = "/yearchart"/>
          </Grid>
          <Grid item xs={4} align="center">
            <YearDataEditButton
              id      = "yeardataback"
              text    = "年運表画面へ戻る"
              variant = "contained"
              xs      = "12"
              link    = "/yearchart"/>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 年運表データ編集;
