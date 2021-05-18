import React from 'react'
import {
  Slide,
  Grid,
  TextField,
  Checkbox,
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  item: {
    marginBottom: '3vh',
  },
  textField: {
    width: '100%'
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  },
  link: {
    textDecoration: 'none'
  },
  checkbox:{
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
})

const Details = () => {
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

          <Grid item>
            <h2>
              <b>
                Personal details
              </b>
            </h2>
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <b>
              Name
            </b>
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="First Name"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              error={false}
              label="Middle Name"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Last Name"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <b>
              Present Address
            </b>
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Street Address"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="City"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="ZIP / Postal Code"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Country"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <b>
              Permanent Address
            </b>
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <Grid item>
              <Checkbox
                color="primary"
                className={classes.checkbox}
              />
            Same as Present Address
            </Grid>
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={6}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Street Address"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="City"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="ZIP / Postal Code"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Country"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <b>
              Contact Details
            </b>
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Contact Number"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Grid
            container
            item
            className={classes.item}
            xs={10}
            sm={10}
            md={10}
            lg={6}
            xl={6}
          >
            <TextField
              required={true}
              error={false}
              label="Email"
              variant="outlined"
              className={classes.textField}
            />
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
            <Link className={classes.link} to='/passport'>
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

export default Details