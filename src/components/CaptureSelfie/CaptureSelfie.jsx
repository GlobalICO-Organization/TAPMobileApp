import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Arrow from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none"
  },
  container: {
    minHeight: '90vh',
    textAlign: 'center',
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
  const classes = useStyles()
  const [selfie, setSelfie] = useState('');
  const history = useHistory()
  const imageData = useSelector((state) => state.imageData.value)
  const userData = useSelector((state) => state.userData.value)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async () => {
    setProcessing(true);
    let k = {
      ...userData,
      passport: imageData.image.data,
      selfie,
    }
    let response = await axios.post("https://tap-issuer-backend-dev.herokuapp.com/investor/submitKYCDetails",
      k, {
      headers: {
        "apiKey": "5f3cd49bf3bc85f2558e6421",
        "content-type": "application/json"
      }
    });
    console.log(response);
    setProcessing(false);
    if (response.data.success && response.data.data) {
      history.push('/submit-details/true');
    }
    else {
      history.push('/submit-details/false');
    }
  }

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  const [source, setSource] = useState("")
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0]
        getBase64(file, (r) => setSelfie(r));
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
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
                  Instruction to Capture your Selfie
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
              <List style={
                {
                  width: "100%"
                }
              }>
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
                    Hold device steady.
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
                capture="environment"
                onChange={(e) => handleCapture(e.target)}
              />
              <label htmlFor="icon-button-file">
                <Button
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

export default CaptureSelfie
