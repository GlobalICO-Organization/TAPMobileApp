import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'


const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    height:"80vh",
  },
  
})

const SubmitDetails = () => {
  const classes = useStyles()
  const params = useParams();
  const result = params.result;
  return (
    <>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}>
        <>
        {result === "true" ? <>
        <h1>KYC Successful</h1><br />
        <h2> Now you can continue your investment process. </h2>
        </>
        : 
        <>
        "KYC Not Successful"
        </>
        }
        </>
    </Grid>
    </>
  )
}

export default SubmitDetails