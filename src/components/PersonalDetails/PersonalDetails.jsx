import React, { 
  // useState, 
  useEffect } from 'react'
import {
  Slide,
  Grid,
  TextField,
  Checkbox,
  Button,
  // Select,
  // InputLabel,
  // MenuItem,
  // FormControl,
} from '@material-ui/core'
import { setUserData } from '../../redux/slice/userDataSlice'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import axios from 'axios'
import moment from 'moment'

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
  checkbox: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
})

const PersonalDetails = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData.value)
  console.log(userData);
  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName !== undefined ? userData.firstName : '',
      middleName: userData.middleName !== undefined ? userData.middleName : '',
      lastName: userData.lastName !== undefined ? userData.lastName: '',
      presentStreetAddress1: userData.street_address_1 !== undefined ? userData.street_address_1 : '',
      presentStreetAddress2: userData.street_address_2 !== undefined ? userData.street_address_2 : '',
      presentCity: userData.city !== undefined ? userData.city : '',
      presentZipCode: userData.zipCode !== undefined ? userData.zipCode : '',
      presentCountry: userData.country !== undefined ? userData.country : '',
      checked: false,
      permanentStreetAddress1: '',
      permanentStreetAddress2: '',
      permanentCity: '',
      permanentZipCode: '',
      permanentCountry: '',
      contactNumber: userData.contactNumber !== undefined ? "+"+userData.contactNumber : '',
      email: userData.email !== undefined ? userData.email : '',
      dob: userData.dob ? userData.dob : ''
    },
    validate: values => {
      const errors = {}
      if(values.checked === true)
      {
        values.permanentStreetAddress1=values.presentStreetAddress1
        values.permanentStreetAddress2=values.presentStreetAddress2
        values.permanentCity=values.presentCity
        values.permanentZipCode=values.presentZipCode
        values.permanentCountry=values.presentCountry
      }
      if (values.firstName?.length === 0) {
        errors.firstName = true
      } else {
        errors.firstName = false
      }

      if (values.lastName?.length === 0) {
        errors.lastName = true
      } else {
        errors.lastName = false
      }

      if(values.presentStreetAddress1?.length === 0) {
          errors.presentStreetAddress1 = true
      } else {
          errors.presentStreetAddress1 = false
      }

      if( values.presentZipCode?.length === 0 ) {
        errors.presentZipCode = true
      } else {
        errors.presentZipCode = false
      }

      if( values.presentCity?.length === 0 ) {
        errors.presentCity = true
      } else {
        errors.presentCity = false
      }

      if( values.presentCountry?.length === 0 ) {
        errors.presentCountry = true
      } else {
        errors.presentCountry = false
      }
      
      if( values.permanentStreetAddress1?.length === 0 ) {
        errors.permanentStreetAddress1 = true
      } else {
        errors.permanentStreetAddress1 = false
      }

      if( values.permanentCity?.length === 0 ) {
        errors.permanentCity = true
      } else {
        errors.permanentCity = false
      }

      if( values.permanentZipCode?.length === 0 ) {
        errors.permanentZipCode = true
      } else {
        errors.permanentZipCode = false
      }

      if( values.permanentCountry?.length === 0 ) {
        errors.permanentCountry = true
      } else {
        errors.permanentCountry = false
      }

      if( values.contactNumber?.length === 0 ) {
        errors.contactNumber = true
      } else {
        errors.contactNumber = false
      }

      if( values.email?.length === 0 ) {
        errors.email = true
      } else {
        errors.email = false
      }

      if (values.dob?.trim().length === 0) {
        errors.dob = true
      } else {
        errors.dob = false
      }

      for(const [key,value] of Object.entries(errors)){
        if(value) {
          return errors;
        }
      }
      return {};
    },

    onSubmit: values => { 
      // setSubmitting(true)
      const temp = {};
      temp.firstName = values.firstName
      temp.middleName = values.middleName
      temp.lastName = values.lastName
      temp.contactNumber =  values.contactNumber
      temp.email = values.email
      temp.pAStreetAddress1 = values.permanentStreetAddress1
      temp.pAStreetAddress2 = values.permanentStreetAddress2
      temp.pAZipCode = values.permanentZipCode 
      temp.pACity = values.permanentCity
      temp.pAState = userData.state
      temp.pACountry = userData.country
      temp.pStreetAddress1 = values.presentStreetAddress1
      temp.pStreetAddress2 = values.presentStreetAddress2
      temp.pZipCode = values.presentZipCode
      temp.pCity = values.presentCity
      temp.pState = userData.state
      temp.pCountry = userData.country
      temp.walletAddress = userData.walletAddress;
      temp.accountCreationDate = userData.creationTS;
      temp.investorId = userData._id;
      temp.dob = moment(values.dob).format('MM-DD-YYYY');
      temp.approved = false;
      temp.rejected = false;
      temp.resubmit = false;
      temp.dateOfSubmission = Date.now();
      temp.approvedByICA = false;
      temp.isFromUSA = userData.country.toLowerCase() === "united states of america" ? true : false;
      temp.companyId = userData?.company?.id
      temp.company = "crypto asset rating inc"
      console.log(temp)
      dispatch(setUserData(temp));
      history.push('/capture-passport-details')
    },
  });

  // const [country, setCountry] = React.useState(userData?.country);
  const [countries, setCountries] = React.useState([]);
  // const handleChange = (event) => {
  //  setCountry(event.target.value);
  //
  // };

  useEffect(() => {
    (async () => {
      let res = await axios.get("https://tap-issuer-backend-dev.herokuapp.com/shared/getCountries", {
        headers: {
          "apiKey": "5f3cd49bf3bc85f2558e6421",
          "content-type": "application/json"
        }
      });
      setCountries(res.data.data.sort());
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
                required
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.firstName ? formik.errors?.firstName : false }
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
                id="middleName"
                name="middleName"
                label="Middle Name"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.middleName ? formik.errors?.middleName : false }
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
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.lastName ? formik.errors?.lastName : false }
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
                required
                id="presentStreetAdderss1"
                name="presentStreetAddress1"
                label="Street Address 1"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.presentStreetAdderss1 ? formik.errors?.presentStreetAdderss1 : false }
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
                id="presentStreetAdderss2"
                name="presentStreetAddress2"
                label="Street Address 2"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.presentStreetAdderss2 ? formik.errors?.presentStreetAdderss2 : false }
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
                required
                id="presentCity"
                name="presentCity"
                label="City"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.presentCity ? formik.errors?.presentCity : false }
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
                required
                id="presentZipCode"
                name="presentZipCode"
                label="ZIP / Postal Code"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.presentZipCode ? formik.errors?.presentZipCode : false }
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
                  id="checked"
                  name="checked"
                  color="primary"
                  value={formik.checked}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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
              md={10}
              lg={6}
              xl={6}
            >
              <TextField
                required
                id="permanentStreetAdderss1"
                name="permanentStreetAddress1"
                label="Street Address 1"
                variant="outlined"
                className={classes.textField}
                onBlur={formik.handleBlur}
                error={ formik.touched.permanentStreetAddress1 ? formik.errors?.permanentStreetAddress1 : false}
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
                id="permanentStreetAdderss2"
                name="permanentStreetAddress2"
                label="Street Address 2"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.permanentStreetAddress2 ? formik.errors?.permanentStreetAddress2 : false }
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
                id="permanentCity"
                name="permanentCity"
                label="City"
                variant="outlined"
                className={classes.textField}
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
                id="permanentZipCode"
                name="permanentZipCode"
                label="ZIP / Postal Code"
                variant="outlined"
                className={classes.textField}
                error={formik.touched.permanentZipCode ? formik.errors?.permanentZipCode : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.permanentZipCode}
              />
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
                required
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                variant="outlined"
                className={classes.textField}
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
                required
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className={classes.textField}
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
                type = "submit"
                className={classes.button}
                variant="contained"
              >
                Next
            </Button>
            </Grid>
          </Grid>
        </form>
      </Slide>
    </>
  )
}

export default PersonalDetails

    // Validate
    // setSubmitting(true)
    // const walletAddress = userData.walletAddress;
    // const accountCreationDate = userData.creationTS;
    // const investorId = userData._id;
    // const firstName = userData.firstName;
    // const lastName = userData .lastName;
    // const email = userData.email;
    // const contactNumber = userData.contactNumber;
    // const country = userData.country;
    // const state = userData.state;
    // const dob = moment(userData.dateOfBirth).format('YYYY-MM-DD');
    // const approved = false;
    // const rejected = false;
    // const resubmit = false;
    // const dateOfSubmission = Date.now();
    // const approvedByICA = false;
    // const isFromUSA = userData.country.toLowerCase() === "united states of america" ? true : false;
    // const company = await query.get("company").toLocaleLowerCase();
    // const companyId = userData?.company?.id;
    // const response = await investorService.submitKYCDetails(formData);
    // if (response.success && response.data) {
    //   setSuccess(true)
    // }
    // else {
    //   message.error("Something went wrong please try again!");
    // }
    // setSubmitting(false)
