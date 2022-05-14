import React, { 
  useEffect, 
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
  label:{
    width:"100%",
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

  console.log(userData);

  const [selfie, setSelfie] = useState('')
  const [source, setSource] = useState('')
  const [processing, setProcessing] = useState(false)

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
    let response
    if(userData.investor) {
      response = await axios.post(`${process.env.REACT_APP_BACKEND_URL_DEV}/shared/submitKYCDetails`,
      k, {
      headers: {
        "apiKey": userData.apiKey,
        "content-type": "application/json"
      }
    } 
    )
  } else {
    response = await axios.post(`${process.env.REACT_APP_BACKEND_URL_DEV}/shared/submitKYCDetails`,
      k, {
      headers: {
        "apiKey": userData.apiKey,
        "content-type": "application/json"
      }
    } 
    ) 
  }
    
    setProcessing(false)
    if (response.data.success && response.data.data) {
      history.push(`/${userId}/submit-details/true`)
    }
    else {
      history.push(`/${userId}/submit-details/false`)
    }
  }

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0]
        getBase64(file, (r) => setSelfie(r))
        const newUrl = URL.createObjectURL(file)
        setSource(newUrl)
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
        { !processing && source.length === 0 ?
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
                onChange={(e) => handleCapture(e.target)}
              />
              <label className={classes.label} htmlFor="icon-button-file">
                <Button
                  fullWidth
                  className={classes.button}
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                >
                  Capture
              </Button>
              </label>
            </Grid>
          </Grid> : <> { !processing && <Grid
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
                src={source}
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
                onClick={() => setSource("")}
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

export default CaptureSelfie
