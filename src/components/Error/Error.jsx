import React from 'react'
import {
  Grid
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  grid:{
    height:"90vh",
  }
})

const Error = ({error}) => {
  const classes = useStyles()
  return (
    <Grid 
      item
      container
      direction = "column"
      justifyContent="center"
      alignItems="center"
      className={classes.grid}
    >
    <h2> Something went wrong , try again. </h2>
    </Grid>
  )
}

export default Error