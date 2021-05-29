import {
  Route,
  Switch,
} from 'react-router-dom'
import React from 'react'
import Home from './components/Home/index'
import PersonalDetails from './components/PersonalDetails/index'
import CapturePassportDetails from './components/CapturePassportDetails/index'
import CapturePassport from './components/CapturePassport/index'
import CapturePassportResult from './components/CapturePassportResult/index'
import CaptureSelfie from './components/CaptureSelfie/index'
import SubmitDetails from './components/SubmitDetails/index'
import NotFound from './components/NotFound/index'
import NotMobile from './components/NotMobile/index'


const AppRoutes = () => (
  <Switch>


    <Route exact path='/personal-details'>
      <PersonalDetails />
    </Route>
    
    <Route exact path='/capture-passport-details'>
      <CapturePassportDetails />
    </Route>

    <Route exact path='/capture-passport'>
      <CapturePassport />
    </Route>

    <Route exact path='/capture-passport-result'>
      <CapturePassportResult />
    </Route>

    <Route exact path='/capture-selfie'>
      <CaptureSelfie />
    </Route>

    <Route exact path='/submit-details/:result'>
      <SubmitDetails />
    </Route>

    <Route exact path='/not-found'>
      <NotFound />
    </Route>

    <Route exact path='/not-mobile'>
      <NotMobile />
    </Route>

    <Route exact path='/:userId'>
      <Home/>
    </Route>


  </Switch>
)

export default AppRoutes



