import {
  Route,
  Switch,
} from 'react-router-dom'
import React from 'react'
import Home from './components/Home/index'
import Details from './components/Details/index'
import Passport from './components/Passport/index'
import Result from './components/Result/index'

const AppRoutes = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route exact path='/details'>
      <Details />
    </Route>
    <Route exact path='/passport'>
      <Passport />
    </Route>
    <Route exact path='/result'>
      <Result />
    </Route>
  </Switch>
)

export default AppRoutes