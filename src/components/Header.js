import * as React   from 'react'
import AppBar       from '@mui/material/AppBar'
import Box          from '@mui/material/Box'
import Toolbar      from '@mui/material/Toolbar'
import Typography   from '@mui/material/Typography'
import Button       from '@mui/material/Button'
import IconButton   from '@mui/material/IconButton'
import { useHistory }  from "react-router-dom";

export default function ButtonAppBar() {
  const history = useHistory()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        style={{ backgroundColor: "#cf0f27" }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography 
            variant="h6" 
            component="div"
            onClick  = {() => {
              history.push("/")}} 
            sx={{ flexGrow: 1 ,color:"#ffffff"}}>
            波動占いの学校
          </Typography>
          <Button 
            color="inherit"
            onClick  = {() => {
              history.push("/signup")}}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
