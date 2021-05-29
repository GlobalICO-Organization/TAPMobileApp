import React from 'react'
import {
  Slide,
  Grid,
  Button,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  item: {
    marginBottom: '3vh',
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  }, link: {
    textDecoration: 'none',
    width: "100%"
  },
})

const CapturePassportResult = () => {
  const imageData = useSelector((state) => state.imageData.value)
  const classes = useStyles()
  let result = "Ensure all texts are visible."
  let error = false
  if (imageData?.cardType === 0) {
    result = <>Unable to Detect Document</>
    error = true
  } else {
    if (imageData?.dpi < 300) {
      result = <>Quality of Image is Low</>
      error = true
    } else {
      if (imageData?.sharpness < 50) {
        result = <>Image appears Blurry</>
        error = true
      } else {
        if (imageData?.glare < 90) {
          result = <>Image has Glare</>
          error = true
        }
      }
    }
  }
  return (
    <>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.container}
        >
          <Grid item>
            <h2>
              <b>
                Result
              </b>
            </h2>
          </Grid>

          <Grid
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
            className={classes.item}
          >
            <Alert
              variant="outlined"
              style={
                {
                  width: "100%"
                }
              }
              severity={error ? "error" : "success"}>
              <AlertTitle
                style={{
                  textAlign: 'left'
                }}
              >{error ? "Please Retry" : "You May Continue"}</AlertTitle>
              {result}
            </Alert>
          </Grid>

          <Grid
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
            className={classes.item}
          >
            <img
              src={imageData?.image?.data}
              alt="User Document"
              width="100%"
              height="100%"
            >
            </img>
          </Grid>

          <Grid
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
            className={classes.item}
          >
            <Link className={classes.link} to='/capture-selfie'>
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
              >
                Continue With This Image
            </Button>
            </Link>
          </Grid>

          <Grid
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
            className={classes.item}
          >
           
            <Link className={classes.link} to='/capture-passport-details'>
            <Button
              fullWidth
              variant="outlined"
            >
              Retry
            </Button>
            </Link>

          </Grid>
        </Grid>
      </Slide>
    </>
  )
}
export default CapturePassportResult