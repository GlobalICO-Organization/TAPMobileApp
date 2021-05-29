import React, { useEffect, useState } from 'react'
import { setImageData } from '../../redux/slice/imageDataSlice'
import {
  Grid,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  circularProgress: {
    color: '#093742',
  }
})

const CapturePassport = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    startCamera()
  }, []);

  const onCaptured = (response) => {
    setProcessing(true)
    window.AcuantCameraUI.end();
  }

  const onCropped = (response) => {
    dispatch(setImageData(response));
    setProcessing(false)
    history.push('/capture-passport-result')
  }

  const onError = (err) => {
    console.log(err)
  }

  const opt = {
    text: {
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
      {
        !processing && 
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
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
        </Grid>
      }
      {
        processing && <Grid
        container
        item
        direction="column"
        style={{
          height:"90vh"
        }}
        justify="center"
        alignItems="center"
        >          
          <CircularProgress
            className={classes.circularProgress}
          />
        </Grid>
      }
    </>
  )
}

export default CapturePassport