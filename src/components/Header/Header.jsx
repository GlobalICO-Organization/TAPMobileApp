import React from 'react'
import {
  Grid,
  AppBar,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
            <img
              src="/car.png"
              alt="car.png"
              height="50"
              width="150"
            />
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header