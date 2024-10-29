import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    marginTop:'3vh',
  }
})

const Footer = () => {
  const classes = useStyles()
  return (
    <>
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}>
        &copy; VEEP copyright © 2024 All rights reserved.
    </Grid>
    </>
  )
}

export default Footer
