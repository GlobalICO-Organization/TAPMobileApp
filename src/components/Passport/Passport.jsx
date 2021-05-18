import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setImageData } from '../../redux/slice/imageDataSlice'
import {
  Slide,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  circularProgress: {
    color: '#093742',
  }
})

const Passport = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState(false)

  const onCaptured = (response) => {
    setProcessing(true)
  }

  const onCropped = (response) => {
    setProcessing(false)
    dispatch(setImageData(response));
    history.push('/result')
  }

  const onError = (err) => {
    console.log(err)
  }

  const opt = {
    text:{
      NONE: "ALIGN",
      SMALL_DOCUMENT: "MOVE CLOSER",
      GOOD_DOCUMENT: "TAP TO CAPTURE",
      CAPTURING: "CAPTURING",
      TAP_TO_CAPTURE: "TAP TO CAPTURE"
    }
  };
 

  const startCamera = () => {
    if (window.AcuantCameraUI) {
      if (window.AcuantCamera.isCameraSupported) {
        window.AcuantCameraUI.start({
          onCaptured,
          onCropped,
        },
        onError,
        opt,
        )
      }
      else {
        window.AcuantCamera.startManualCapture({
          onCaptured,
          onCropped
        }, onError)
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
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid item>
            {
              !processing && <div>
                <video id="acuant-player" controls autoPlay playsInline style={
                  {
                    display: "none"
                  }
                }>
                </video>
                <div style={
                  {
                    textAlign: "center"
                  }
                }>
                  <canvas id="acuant-video-canvas" width="100%" height="auto">
                  </canvas>
                </div>
              </div>
            }
            {
              processing && <div>
                <CircularProgress
                  className={classes.circularProgress}
                />
              </div>
            }
          </Grid>
          <Grid item>
            {
              !processing && <Button
                variant="contained"
                color="default"
                onClick={startCamera}> Start Camera</Button>
            }
          </Grid>
        </Grid>
      </Slide>
    </>
  )
}

export default Passport