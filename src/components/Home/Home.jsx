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
import CryptoJS from 'crypto-js';
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
  let { userId } = useParams() 
  
  let tuserId = userId.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
  let bytes  = CryptoJS.AES.decrypt(tuserId, 'direction is better than speed');
  const apiKey = bytes.toString(CryptoJS.enc.Utf8);

  const [processing, setProcessing] = useState(false)
  const [companyName, setCompanyName ] = useState('');

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
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/investor/getUserDetails`, {
        userId
      }, {
        headers: {
          apiKey,
          "content-type": "application/json"
        }
      })
      if (!res.data.success || !res.data.data) {
        setProcessing(false)
        history.push('/error')
      }
      console.log(res);
    
      // let words = res.data.data.company.split(' ');  
      // let CapitalizedWords = [];  
      // words.forEach(element => {  
      //     CapitalizedWords.push(element[0]?.toUpperCase() + element?.slice(1, element.length));  
      // });  
      // res.data.data.company = CapitalizedWords.join(' ');
    
      setCompanyName(res.data.data.company.trim());
      res.data.data.apiKey = apiKey;
      dispatch(setUserData(res.data.data))
      console.log(res);
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
              <h2>Welcome to {isMobile ? <><br/></> : <></>} {companyName}</h2>
              <h2>To begin your KYC {isMobile ? <><br/></> : <></>} click start.</h2>
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