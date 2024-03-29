import React, {
  useState,
  useEffect
} from 'react'
import {
  Slide,
  Grid,
  Checkbox,
  Button,
  CircularProgress,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import { setRouteData } from '../../redux/slice/routeDataSlice'
import { setUserData } from '../../redux/slice/userDataSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import MuiTextField from '@material-ui/core/TextField'
import axios from 'axios'
import moment from 'moment'
import MuiFormControl from '@material-ui/core/FormControl';

const TextField = withStyles({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 1)"
    }
  }
})(MuiTextField)

const FormControl = withStyles({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 1)"
    }
  }
})(MuiFormControl)

const useStyles = makeStyles({
  container: {
    minHeight: '90vh',
    textAlign: 'center',
  },
  item: {
    marginBottom: '3vh',
  },
  button: {
    backgroundColor: '#EBEBF5',
    fontFamily: 'Lato,sans-serif',
    color: '#093742',
  },
  link: {
    textDecoration: 'none'
  },
  checkbox: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  circularProgress: {
    color: '#093742',
  },
})

const PersonalInfo = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData.value)
  const routeData = useSelector((state) => state.routeData.value)
  const { userId } = useParams()

  console.log("personalInfo");
  console.log(userData);

  useEffect(() => {
    (async () => {
      if (routeData.isHome) {
        dispatch(setRouteData({
          isHome: true,
          isPersonalInfo: true
        }))
      }
      else {
        history.push(`/${userId}`)
      }
    })()
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName ? userData.firstName : '',
      middleName: userData.middleName ? userData.middleName : '',
      lastName: userData.lastName ? userData.lastName : '',
      presentStreetAddress1: userData.street_address_1 ? userData.street_address_1 : '',
      presentStreetAddress2: userData.street_address_2 ? userData.street_address_2 : '',
      presentCity: userData.city ? userData.city : '',
      presentState: userData.state ? userData.state : '',
      presentZipCode: userData.zipCode ? userData.zipCode : '',
      presentCountry: userData.country ? userData.country : '',
      checked: false,
      permanentStreetAddress1: '',
      permanentStreetAddress2: '',
      permanentCity: '',
      permanentState: '',
      permanentZipCode: '',
      permanentCountry: '',
      contactNumber: userData.contactNumber ? userData.contactNumber : '',
      email: userData.email ? userData.email : '',
      dob: userData.dob ? userData.dob : ''
    },

    validate: values => {
      const errors = {}

      if (values.checked === true) {
        values.permanentStreetAddress1 = values.presentStreetAddress1
        values.permanentStreetAddress2 = values.presentStreetAddress2
        values.permanentCity = values.presentCity
        values.permanentState = values.presentState
        values.permanentZipCode = values.presentZipCode
        values.permanentCountry = values.presentCountry
      }

      if (values.permanentStreetAddress1?.trim().length === 0) {
        errors.permanentStreetAddress1 = true
      } else {
        errors.permanentStreetAddress1 = false
      }

      if (values.permanentCity?.trim().length === 0) {
        errors.permanentCity = true
      } else {
        errors.permanentCity = false
      }

      if (values.permanentZipCode?.trim().length === 0) {
        errors.permanentZipCode = true
      } else {
        errors.permanentZipCode = false
      }

      if (values.permanentState?.trim().length === 0) {
        errors.permanentState = true
      } else {
        errors.permanentState = false
      }

      if (values.permanentCountry === '') {
        errors.permanentCountry = true
      } else {
        errors.permanentCountry = false
      }

      if (values.presentStreetAddress1?.trim().length === 0) {
        errors.presentStreetAddress1 = true
      } else {
        errors.presentStreetAddress1 = false
      }

      if (values.presentCity?.trim().length === 0) {
        errors.presentCity = true
      } else {
        errors.presentCity = false
      }

      if (values.presentZipCode?.trim().length === 0) {
        errors.presentZipCode = true
      } else {
        errors.presentZipCode = false
      }

      if (values.presentState?.trim().length === 0) {
        errors.presentState = true
      } else {
        errors.presentState = false
      }

      if (values.presentCountry === '') {
        errors.presentCountry = true
      } else {
        errors.presentCountry = false
      }


      if (values.contactNumber?.trim().length === 0) {
        errors.contactNumber = true
      } else {
        errors.contactNumber = false
      }

      if (values.dob?.trim().length === 0) {
        errors.dob = true
      } else {
        errors.dob = false
      }

      for (const value of Object.values(errors)) {
        if (value) {    
          return errors
        }
      }

      return {}
    },
    onSubmit: values => {
      const temp = {}
      temp.apiKey = userData?.apiKey;
      temp.firstName = values.firstName
      temp.middleName = values.middleName
      temp.lastName = values.lastName
      temp.contactNumber = values.contactNumber
      temp.email = values.email
      temp.street_address_1 = userData?.street_address_1
      temp.street_address_2 = userData?.street_address_2
      temp.city = userData?.city
      temp.zipCode = userData?.zipCode
      temp.state = userData?.state
      temp.country = userData?.country
      temp.pAStreetAddress1 = values.permanentStreetAddress1
      temp.pAStreetAddress2 = values.permanentStreetAddress2
      temp.pAZipCode = values.permanentZipCode
      temp.pACity = values.permanentCity
      temp.pAState = values.permanentState
      temp.pACountry = values.permanentCountry
      temp.pStreetAddress1 = values.presentStreetAddress1
      temp.pStreetAddress2 = values.presentStreetAddress2
      temp.pZipCode = values.presentZipCode
      temp.pCity = values.presentCity
      temp.pState = values.presentState
      temp.pCountry = values.presentCountry
      temp.accountCreationDate = userData.creationTS
      temp.investorId = userData._id
      temp.dob = moment(values.dob).format('MM-DD-YYYY');
      temp.approved = false
      temp.rejected = false
      temp.resubmit = false
      temp.dateOfSubmission = Date.now()
      temp.approvedByICA = false
      temp.isFromUSA = userData?.country?.toLowerCase() === "united states of america" ? true : false
      temp.company = userData?.company?.toLowerCase().trim();
      temp.investor = userData?.investor;
      temp.mtid = userData?.mtid;
      temp.walletAddress = userData?.walletAddress ? userData.walletAddress : userData?.wallet
      temp.role = userData?.role;
      temp.roles = userData?.roles
      
      dispatch(setUserData(temp))
      history.push(`/${userId}/capture-id-info`)
    },
  })

  const [countries, setCountries] = useState([])
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    (async () => {
      setProcessing(true)
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL_DEV}/shared/getCountries`, {
        headers: {
          apiKey: userData?.apiKey,
          "content-type": "application/json"
        }
      })
      setCountries(res?.data?.data?.sort(function (a, b) {
        if (a.name.en < b.name.en) { return -1; }
        if (a.name.en > b.name.en) { return 1; }
        return 0;
      }))
      setProcessing(false)
    })()
  }, [])


  return (
    <>
      {!processing && <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
      >
        <form onSubmit={formik.handleSubmit}>
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
                disabled
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                error={formik.touched.firstName ? formik.errors?.firstName : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
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
                disabled
                fullWidth
                id="middleName"
                name="middleName"
                label="Middle Name"
                variant="outlined"
                error={formik.touched.middleName ? formik.errors?.middleName : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.middleName}
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
                disabled
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                error={formik.touched.lastName ? formik.errors?.lastName : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
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
                disabled={userData.investor}
                required={!userData.investor}
                fullWidth
                id="presentStreetAddress1"
                name="presentStreetAddress1"
                label="Street Address 1"
                variant="outlined"
                error={formik.touched.presentStreetAddress1 ? formik.errors?.presentStreetAddress1 : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentStreetAddress1}
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
                disabled={userData.investor}
                fullWidth
                id="presentStreetAdderss2"
                name="presentStreetAddress2"
                label="Street Address 2"
                variant="outlined"
                error={formik.touched.presentStreetAdderss2 ? formik.errors?.presentStreetAdderss2 : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentStreetAddress2}
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
                disabled={userData.investor}
                required={!userData.investor}
                fullWidth
                id="presentCity"
                name="presentCity"
                label="City"
                variant="outlined"
                error={formik.touched.presentCity ? formik.errors?.presentCity : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.presentCity}
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
                disabled={userData.investor}
                required={!userData.investor}
                fullWidth
                id="presentZipCode"
                name="presentZipCode"
                label="ZIP / Postal Code"
                variant="outlined"
                error={formik.touched.presentZipCode ? formik.errors?.presentZipCode : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.presentZipCode}
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
                disabled={userData.investor}
                required={!userData.investor}
                fullWidth
                id="presentState"
                name="presentState"
                label="State"
                variant="outlined"
                error={formik.touched.presentState ? formik.errors?.presentState : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.presentState}
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
              <FormControl
                variant="outlined"
                required={!userData.investor}
                disabled = {userData.investor}
                style={{
                  width: "100%"
                }} >
                <InputLabel id="presentCountryLabel">Present Country</InputLabel>
                <Select
                  labelId="presentCountryLabel"
                  label="Present Country"
                  id="presentCountry"
                  name="presentCountry"
                  error={formik.touched.presentCountry ? formik.errors?.presentCountry : false}
                  onBlur={formik.handleBlur}
                  value={formik.values.presentCountry}
                  onChange={formik.handleChange}
                >
                  {
                    countries?.map((c, index) => <MenuItem key={index} value={c.name.en}> {c.name.en} </MenuItem>)
                  }
                  <MenuItem value=''>None</MenuItem>
                </Select>
              </FormControl>
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
                <FormControlLabel
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      id="checked"
                      name="checked"
                      color="primary"
                      checked={formik.values.checked}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Same As Present Address"
                />
              </Grid>
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
                required
                fullWidth
                id="permanentStreetAdderss1"
                name="permanentStreetAddress1"
                label="Street Address 1"
                variant="outlined"
                onBlur={formik.handleBlur}
                error={formik.touched.permanentStreetAddress1 ? formik.errors?.permanentStreetAddress1 : false}
                onChange={formik.handleChange}
                value={formik.values.permanentStreetAddress1}
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
                fullWidth
                id="permanentStreetAdderss2"
                name="permanentStreetAddress2"
                label="Street Address 2"
                variant="outlined"
                error={formik.touched.permanentStreetAddress2 ? formik.errors?.permanentStreetAddress2 : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.permanentStreetAddress2}
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
                required
                fullWidth
                id="permanentCity"
                name="permanentCity"
                label="City"
                variant="outlined"
                error={formik.touched.permanentCity ? formik.errors?.permanentCity : false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.permanentCity}
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
                required
                fullWidth
                id="permanentZipCode"
                name="permanentZipCode"
                label="ZIP / Postal Code"
                variant="outlined"
                error={formik.touched.permanentZipCode ? formik.errors?.permanentZipCode : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.permanentZipCode}
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
                required
                fullWidth
                id="permanentState"
                name="permanentState"
                label="State"
                variant="outlined"
                error={formik.touched.permanentState ? formik.errors?.permanentState : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.permanentState}
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
              <FormControl
                variant="outlined"
                required
                style={{
                  width: "100%"
                }} >
                <InputLabel id="permanentCountryLabel">Permanent Country</InputLabel>
                <Select
                  labelId="permanentCountryLabel"
                  label="Permanent Country"
                  id="permanentCountry"
                  name="permanentCountry"
                  error={formik.touched.permanentCountry ? formik.errors?.permanentCountry : false}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentCountry}
                  onChange={formik.handleChange}
                >
                  {
                    countries?.map((c, index) => <MenuItem key={index} value={c.name.en}> {c.name.en} </MenuItem>)
                  }
                  <MenuItem value=''>None</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Date of Birth */}
            <br/>
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
                Date of Birth
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
                fullWidth
                required
                id="dob"
                name="dob"
                label="Date of Birth"
                variant="outlined"
                type="date"
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                error={formik.touched.dob ? Boolean(formik.errors?.dob) : false}
                format="mm-dd-yyyy"
                placeholder='mm-dd-yyyy'
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: '01-01-1900', // Optional: Set minimum allowed date
                  },
                }}          
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
                disabled={userData.investor}
                required={!userData.investor}
                fullWidth
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                variant="outlined"
                onBlur={formik.handleBlur}
                value={formik.values.contactNumber}
                error={formik.touched.contactNumber ? formik.errors?.contactNumber : false}
                onChange={formik.handleChange}
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
                disabled
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email ? formik.errors?.email : false}
                onChange={formik.handleChange}
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
              <Button
                type="submit"
                fullWidth
                className={classes.button}
                variant="outlined"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Slide>}
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

export default PersonalInfo
