import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Grid,
  Slide,
  CircularProgress,
  List,
  ListItem,
  Button,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@material-ui/core'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  Alert,
  AlertTitle
} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { setBackData } from '../../redux/slice/backDataSlice'
import { setRouteData } from '../../redux/slice/routeDataSlice'
import Arrow from '@material-ui/icons/ArrowRight'
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  circularProgress: {
    color: '#093742',
  },
  label: {
    width: "100%",
  },
  list: {
    width: '100%',
  },
  alert: {
    width: '100%'
  },
  alertTitle: {
    textAlign: 'left'
  },
  item: {
    marginBottom: '3vh',
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  }
})

const CaptureIDBack = () => {
  const { userId } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const routeData = useSelector((state) => state.routeData.value)

  const [imageData, setImageData] = useState({})
  const [processing, setProcessing] = useState(false)
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  let result = <>Ensure all texts are visible.</>
  let error = false
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
      } else {
        if (imageData?.cardType === 0) {
          result = <>Unable to Detect Document</>
          error = true
        }
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (routeData.isCaptureIDFront) {
        dispatch(setRouteData({
          isHome: true,
          isPersonalInfo: true,
          isCaptureIDInfo: true,
          isCaptureIDFront: true,
          isCaptureIDBack: true,
        }))
      }
      else {
        history.push(`/${userId}`)
      }
    })()
  }, [])

  // const onCaptured = (response) => {
  //   setProcessing(true)
  // }

  // const onCropped = (response) => {
  //   setImageData(response)
  //   setProcessing(false)
  // }

  // const onError = (err) => {
  //   console.log(err)
  // }

  const handleSubmit = () => {
    dispatch(setBackData(imageData))
    history.push(`/${userId}/capture-selfie`)
  }

  // const handleCapture = () => {
  //   window.AcuantCamera.startManualCapture({
  //     onCaptured,
  //     onCropped
  //   }, onError)
  // }

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setVideoStream(stream);

      // Attach the video stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match the video frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image data
    const imageDataUrl = canvas.toDataURL('image/png');
    setImageData(imageDataUrl);

    // Stop the video stream
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null); // Clear the video stream state
    }

    // Detach the video element
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Detach the stream from the video element
    }
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (err) {
      console.log(err)
    }
  }

  const handleFileUpload = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0]
        getBase64(file, (r) => setImageData(r))
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
        {(!processing && !videoStream) && JSON.stringify(imageData) === '{}' ?
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.container}
          >
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
              <h2>
                <b>
                  {isMobile && "Instruction to Capture Back of ID"}
                  {!isMobile && "Instruction to Upload Back of ID"}
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
              <List
                className={classes.list}
              >
                <Divider />
                <ListItem >
                  <ListItemIcon>
                    <Arrow />
                  </ListItemIcon>
                  <ListItemText>

                    {isMobile && "Place ID close to device."}
                    {!isMobile && "Ensure quality of image is good"}

                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem >
                  <ListItemIcon>
                    <Arrow />
                  </ListItemIcon>
                  <ListItemText>
                    Ensure sufficient light.
                  </ListItemText>
                </ListItem>

                <Divider />
                {isMobile && <>
                  <ListItem >
                    <ListItemIcon>
                      <Arrow />
                    </ListItemIcon>
                    <ListItemText>
                      Hold device steady.
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </>
                }

                <ListItem >
                  <ListItemIcon>
                    <Arrow />
                  </ListItemIcon>
                  <ListItemText>
                    Make sure all edges of the ID are visible.
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem >
                  <ListItemIcon>
                    <Arrow />
                  </ListItemIcon>
                  <ListItemText>
                    Make sure there are no glare and shadows .
                  </ListItemText>
                </ListItem>
                <Divider />
              </List>
            </Grid>
            <Grid
              container
              item
              justify="center"
              align="center"
              xs={10}
              sm={10}
              md={10}
              lg={6}
              xl={6}
              className={classes.item}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                capture="user"
                onChange={(e) => handleFileUpload(e.target)}
              />
              <label className={classes.label} htmlFor="icon-button-file">
                <Button
                  fullWidth
                  className={classes.button}
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                >
                  Upload
                </Button>
              </label>
              <Button
                fullWidth
                style={{ marginTop: '20px' }}
                aria-label="capture picture"
                variant="outlined"
                className={classes.button}
                onClick={() => handleCapture()}
              >
                Capture
              </Button>
            </Grid>

          </Grid> : <> {(!processing && !videoStream) && <Grid
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
                className={classes.alert}
                severity={error ? "error" : "success"}>
                <AlertTitle
                  className={classes.alertTitle}
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
                src={imageData}
                // src={JSON.stringify(imageData) !== '{}' ? imageData.image.data : ' '}
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
              <Button
                fullWidth
                onClick={handleSubmit}
                className={classes.button}
                variant="outlined"
              >
                Next
              </Button>
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
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setImageData({})}
              >
                Retry
              </Button>
            </Grid>
          </Grid>
          }
          </>
        }
      </Slide>

      {videoStream && (
        <div>
          <video ref={videoRef} style={{ width: '100%', height: '500px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={capturePhoto}
            >
              Capture Photo
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {
        processing && <Grid
          container
          item
          direction="column"
          className={classes.container}
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

export default CaptureIDBack