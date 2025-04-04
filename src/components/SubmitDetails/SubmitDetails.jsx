import React, { useEffect,useState } from 'react'
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
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    (async () => {
      if (!routeData.isCaptureSelfie) {
        history.push(`/${userId}`)
      }

    })()
  }, [])

  useEffect(() => {
    if (result === "true") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            window.close();
            if (window.closed) {
              console.log("Window closed successfully.");
            } else {
              alert("Please close this tab manually to continue.");
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [result]);

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
            <p>Closing in: {countdown}</p>
          </>
            :
            <>
              <h1>KYC Successful</h1>
              <h2> Now you can continue your investment process. </h2>
            </>
          }
        </>
      </Grid>
    </>
  )
}

export default SubmitDetails
