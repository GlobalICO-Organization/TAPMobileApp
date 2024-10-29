import React from 'react'
import {
  Grid,
  AppBar,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {color} from "@material-ui/system";

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: '#EBEBF5'
  },
})

const Header = () => {
  const classes = useStyles()
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            justify="center"
            alignItems="center"
          >

            <h3 className="company_name" style={{ color: 'black' }}>VruddhiX</h3>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header
