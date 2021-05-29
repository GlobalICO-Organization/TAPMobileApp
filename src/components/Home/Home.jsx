import React , {useEffect} from 'react'
import ParticlesBg from 'particles-bg'
import {
  Grid,
  Button,
  Zoom
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/slice/userDataSlice'
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
  }
})

const Home = () => {
  const classes = useStyles()
  const {userId} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      let res = await axios.post("https://tap-issuer-backend-dev.herokuapp.com/investor/getUserDetails",{
        userId               
      },{
        headers:{
          "apiKey":"5f3cd49bf3bc85f2558e6421",
          "content-type":"application/json"
        }
      });
      dispatch(setUserData(res.data.data));
    })()
  }, [])

  return (
    <>
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
            <Link className={classes.link} to='/personal-details'>
              <Button
                className={classes.button}
                variant="contained"
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
  )
}

export default Home