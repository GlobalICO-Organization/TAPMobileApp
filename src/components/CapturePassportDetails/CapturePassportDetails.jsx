import React from 'react'
import {
  Slide,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Arrow from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles({
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
    textDecoration: 'none'
  },
})

const CapturePassportDetails = () => {
  const classes = useStyles()

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
                Instruction to Capture your ID
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
                  Place ID close to device.
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
                  Make sure all edges of the ID are visible.
                </ListItemText>
              </ListItem>

              <Divider />

              <ListItem >
                <ListItemIcon>
                  <Arrow />
                </ListItemIcon>
                <ListItemText>
                  Make sure there are no glare and shadows on the ID.
                </ListItemText>
              </ListItem>

              <Divider />

            </List>
          </Grid>

          <Grid
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
            justify="center"
            alignItems="center"
            className={classes.item}
          >
            <Link className={classes.link} to='/capture-passport'>
              <Button
                className={classes.button}
                variant="contained"
              >
                Next
            </Button>
            </Link>
          </Grid>

        </Grid>
      </Slide>
    </>
  )
}

export default CapturePassportDetails