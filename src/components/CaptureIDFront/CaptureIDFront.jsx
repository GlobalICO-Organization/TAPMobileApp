import React, {
  useEffect,
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
import { setFrontData } from '../../redux/slice/frontDataSlice'
import { setRouteData } from '../../redux/slice/routeDataSlice'
import Arrow from '@material-ui/icons/ArrowRight'
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  circularProgress: {
    color: '#093742',
  },
  list: {
    width: "100%",
  },
  item: {
    marginBottom: '3vh',
  },
  alert: {
    width: '100%'
  },
  alertTitle: {
    textAlign: 'left'
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  }
})

const CaptureIDFront = () => {
  const { userId } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const routeData = useSelector((state) => state.routeData.value)
  const userData = useSelector((state) => state.userData.value)
  const [imageData, setImageData] = useState({})
  const [processing, setProcessing] = useState(false)

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
      if (routeData.isCaptureIDInfo) {
        dispatch(setRouteData({
          isHome: true,
          isPersonalInfo: true,
          isCaptureIDInfo: true,
          isCaptureIDFront: true,
        }))
      }
      else {
        history.push(`/${userId}`)
      }
    })()
  }, [])

  const onCaptured = (response) => {
    setProcessing(true)
  }

  const onCropped = (response) => {
    setImageData(response)
    setProcessing(false)
  }

  const onError = (err) => {
    console.log(err)
  }

  const handleSubmit = () => {
    dispatch(setFrontData(imageData.image.data))
    history.push(`/${userId}/capture-id-back`)
  }

  const handleCapture = () => {
    window.AcuantCamera.startManualCapture({
      onCaptured,
      onCropped
    }, onError)
  }

  return (
    <>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
      >
        {!processing && JSON.stringify(imageData) === '{}' ?
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
                  {isMobile && "Instruction to Capture Front of ID"}
                  {!isMobile && "Instruction to Upload Front of ID"}
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

                { userData.cardType === "ID" &&
                   <>
                    <ListItem >
                      <ListItemIcon>
                        <Arrow />
                      </ListItemIcon>
                      <ListItemText>
                          Provided ID should have your picture, name, address, date of birth,  and its own uniuqe number. If any of condition do not meet your KYC may not complete.
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
              <Button
                fullWidth
                variant="outlined"
                className={classes.button}
                onClick={() => handleCapture()}
              >
                Capture
              </Button>
            </Grid>
          </Grid> : <> {!processing && <Grid
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
                src={JSON.stringify(imageData) !== '{}' ? imageData.image.data : ' '}
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

export default CaptureIDFront