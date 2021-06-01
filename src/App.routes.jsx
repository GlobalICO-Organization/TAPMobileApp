import React from 'react'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Home from './components/Home/index'
import PersonalInfo from './components/PersonalInfo/index'
import CaptureIDInfo from './components/CaptureIDInfo/index'
import CaptureIDFront from './components/CaptureIDFront/index'
import CaptureIDBack from './components/CaptureIDBack/index'
import CaptureSelfie from './components/CaptureSelfie/index'
import SubmitDetails from './components/SubmitDetails/index'
import Error from './components/Error/index'


const AppRoutes = () => (
  <Switch>
  
    <Route exact path='/'>
      <Redirect to='/error' />
    </Route>

    <Route exact path='/error'>
      <Error />
    </Route>

    <Route exact path='/:userId'>
      <Home/>
    </Route>

    <Route exact path='/:userId/personal-info'>
      <PersonalInfo />
    </Route>
    
    <Route exact path='/:userId/capture-id-info'>
      <CaptureIDInfo/>
    </Route>

    <Route exact path='/:userId/capture-id-front'>
      <CaptureIDFront/>
    </Route>

    <Route exact path='/:userId/capture-id-back'>
      <CaptureIDBack/>
    </Route>

    <Route exact path='/:userId/capture-selfie'>
      <CaptureSelfie />
    </Route>

    <Route exact path='/:userId/submit-details/:result'>
      <SubmitDetails />
    </Route>

    <Route>
      <Error />
    </Route>


  </Switch>
)

export default AppRoutes



