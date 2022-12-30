import React, {
  useEffect,
} from 'react'
import { setRouteData } from '../../redux/slice/routeDataSlice'
import { setUserData } from '../../redux/slice/userDataSlice'
import { useHistory, useParams } from 'react-router-dom'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  Slide,
  Grid,
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  list: {
    width: "100%",
  },
  item: {
    marginTop: '3vh'
  },
  circularProgress: {
    color: '#093742',
  },
  button: {
    width:"100%",
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  },
  link: {
    width:"100%",
    textDecoration: 'none',
  },
})

const CaptureIDInfo = () => {
  const classes = useStyles()
  const routeData = useSelector((state) => state.routeData.value)
  const userData = useSelector((state) => state.userData.value)
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams()

  useEffect(() => {
    (async () => {
      if (routeData.isPersonalInfo) {
        dispatch(setRouteData({
          isHome: true,
          isPersonalInfo: true,
          isCaptureIDInfo: true
        }))
      }
      else {
        history.push(`/${userId}`)
      }
    })()
  }, [])

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
          justifyContent="flex-start"
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
                Choose ID to Capture
              </b>
            </h2>
          </Grid>

          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <label>*Recommended</label>
          </Grid>



          <Grid
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
            justifyContent="center"
            alignItems="center"
            
          >
            <Link className={classes.link} to={`/${userId}/capture-id-front`}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => {
                  dispatch(setUserData({
                    ...userData,
                    cardType: 'PP'
                  }))
                }}
              >
               {isMobile ? "Capture" : "Upload" }  Passport
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
            justifyContent="center"
            alignItems="center"
            className={classes.item}
          >
            <Link className={classes.link} to={`/${userId}/capture-id-front`}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => {
                  dispatch(setUserData({
                    ...userData,
                    cardType: 'DL'
                  }))
                }}
              >
                {isMobile ? "Capture" : "Upload" } Driving Liscense
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
            justifyContent="center"
            alignItems="center"
            className={classes.item}
          >
            <Link className={classes.link} to={`/${userId}/capture-id-front`}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => {
                  dispatch(setUserData({
                    ...userData,
                    cardType: 'ID'
                  }))
                }}
              >
                {isMobile ? "Capture" : "Upload" } Other ID
            </Button>
            </Link>
          </Grid>


        </Grid>
      </Slide>
    </>
  )
}

export default CaptureIDInfo