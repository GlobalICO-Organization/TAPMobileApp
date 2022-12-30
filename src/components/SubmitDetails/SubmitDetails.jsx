import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    minHeight: '80vh',
  },
})

const SubmitDetails = () => {
  const classes = useStyles()
  const history = useHistory()
  const routeData = useSelector((state) => state.routeData.value)
  const { result, userId } = useParams()
  
  useEffect(() => {
    (async () => {
      if (!routeData.isCaptureSelfie) {
        history.push(`/${userId}`)
      }
    })()
  }, [])


  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.root}>
        <>
          {result === "true" ? <>
            <h1>KYC Successful</h1><br />
            <h2>Once your KYC is approved by NFT Marketplace admin you will receive and email for login.</h2>
          </>
            :
            <>
              <h1>KYC Not Successful , Try Again .</h1>
            </>
          }
        </>
      </Grid>
    </>
  )
}

export default SubmitDetails