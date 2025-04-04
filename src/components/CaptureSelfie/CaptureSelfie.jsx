import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Slide,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Button,
  CircularProgress,
} from '@material-ui/core'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { setRouteData } from '../../redux/slice/routeDataSlice'
import Arrow from '@material-ui/icons/ArrowRight'
import axios from 'axios'
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  label: {
    width: "100%",
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  },
  item: {
    marginTop: '3vh'
  },
  circularProgress: {
    color: '#093742',
  },
  link: {
    textDecoration: 'none',
    width: "100%"
  },
}))

const CaptureSelfie = () => {
  const { userId } = useParams()

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const IDFront = useSelector((state) => state.frontData.value)
  const IDBack = useSelector((state) => state.backData.value)
  const userData = useSelector((state) => state.userData.value)
  const routeData = useSelector((state) => state.routeData.value)


  const [selfie, setSelfie] = useState({})
  const [processing, setProcessing] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (routeData.isCaptureIDBack) {
        dispatch(setRouteData({
          isHome: true,
          isPersonalInfo: true,
          isCaptureIDInfo: true,
          isCaptureIDFront: true,
          isCaptureIDBack: true,
          isCaptureSelfie:true,
        }))
      }
      else {
        history.push(`/${userId}`)
      }
    })()
  }, [])


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

  const handleSubmit = async () => {
    setProcessing(true)
    let k = {
      ...userData,
      IDFront,
      IDBack,
      selfie,
    }
    const apiData = process.env.REACT_APP_SERVER_URLS;
    const jsonArray = JSON.parse(apiData)
    const getUrlsByKeyValue = (key, value) => {
      return jsonArray
        .filter(item => item.key === key && item.value === value)
        .map(item => item.url); // Retrieve only the URLs
    };
    const urls = getUrlsByKeyValue(userData?.apiKey);
    let response = await axios.post(`${urls[0]}/investor/submitKYCDetails`,
      k, {
      headers: {
        "apiKey": userData.apiKey,
        "content-type": "application/json"
      }
    })

    setProcessing(false)
    if (response.data.success && response.data.data) {
      history.push(`/${userId}/submit-details/true`)
    }
    else {
      history.push(`/${userId}/submit-details/false`)
    }
  }

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

  const handleFileUpload = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0]
        getBase64(file, (r) => setSelfie(r))
      }
    }
  }

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
    setSelfie(imageDataUrl);

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

  return (
    <>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
      >
        {(!processing && !videoStream) && JSON.stringify(selfie) === '{}' ?
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
                  {!isMobile && 'Instruction to Upload your Selfie'}
                  {isMobile && 'Instruction to Capture your Selfie'}
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
              <List className={classes.list}>
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
                <ListItem >
                  <ListItemIcon>
                    <Arrow />
                  </ListItemIcon>
                  <ListItemText>
                    {isMobile && 'Hold device steady.'}
                    {!isMobile && 'Ensure quality of the image is good'}
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem >
                  <ListItemIcon>
                    <Arrow />
                  </ListItemIcon>
                  <ListItemText>
                    Make sure your face is visible.
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
              {/*<label className={classes.label} htmlFor="icon-button-file">
                <Button
                  fullWidth
                  className={classes.button}
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                >
                  Upload
                </Button>
              </label>*/}
              <Button
                fullWidth
                className={classes.button}
                style={{ marginTop: '20px' }}
                aria-label="capture picture"
                component="span"
                onClick={handleCapture}
                variant="outlined"
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
                  Ensure your face is visible
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
              <img
                src={selfie}
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
                variant="contained"
              >
                Submit
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
                onClick={() => setSelfie({})}
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

export default CaptureSelfie
