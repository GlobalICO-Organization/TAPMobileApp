import React, {
  useEffect,
  useState
} from 'react'
import {
  Grid,
  Button,
  Zoom,
  CircularProgress,
} from '@material-ui/core'
import {
  useHistory,
  useParams,
} from 'react-router'
import {
  useDispatch,
} from 'react-redux'
import {isMobile} from 'react-device-detect';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { setUserData } from '../../redux/slice/userDataSlice'
import { setRouteData } from '../../redux/slice/routeDataSlice'
import ParticlesBg from 'particles-bg'
import Arrow from '@material-ui/icons/ArrowDropUp'
import axios from 'axios'

const useStyles = makeStyles({
  grid: {
    minHeight: '90vh',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  },
  link: {
    textDecoration: 'none'
  },
  circularProgress: {
    color: '#093742',
  },
})

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { userId } = useParams() 
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    (async () => {
      if(!isMobile) {
        alert('We recommend you to use mobile app to complete your KYC for better results.')
      }
    })()
  }, [])
  

  useEffect(() => {
    (async () => {
      dispatch(setRouteData({
        isHome: true
      }))
    })()
  }, [])

  useEffect(() => {
    (async () => {
      setProcessing(true)
      let res = await axios.post("https://tap-issuer-backend-dev.herokuapp.com/investor/getUserDetails", {
        userId
      }, {
        headers: {
          "apiKey": "5f3cd49bf3bc85f2558e6421",
          "content-type": "application/json"
        }
      })
      if (!res.data.success || !res.data.data) {
        setProcessing(false)
        history.push('/error')
      }
      dispatch(setUserData(res.data.data))
      setProcessing(false)
    })()
  }, [])

  return (
    <>
      {!processing && <>
        <ParticlesBg
          color="#7de5ff"
          num={50}
          type="cobweb"
          bg={true}
        />
        <Zoom in={true}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.grid}
          >
            <Grid item
            >
              <h2>Welcome to CAR,</h2>
              <h2>To begin your KYC click start.</h2>
              <br />
            </Grid>
            <Grid item>
              <Link className={classes.link} to={`/${userId}/personal-info`}>
                <Button
                  className={classes.button}
                  variant="outlined"
                >
                  Start
            </Button>
              </Link>
              <br />
              <div id="arrow">
                <Arrow />
              </div>
            </Grid>
          </Grid>
        </Zoom>
      </>
      }
      {
        processing && <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.grid}
        >
          <CircularProgress
            className={classes.circularProgress}
          />
        </Grid>
      }
    </>
  )
}

export default Home