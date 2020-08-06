import React, { useState } from 'react'
import './App.css'
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Detail from './pages/Detail';
import { useSelector } from 'react-redux'


export default function App() {
  const state = useSelector(state => state)
  const ProtectedRoute = (props) => {
    if (state.user.isAuthenticated === true) {
      return <Route {...props} />
    } else {
      return <Redirect to='/login' />
    }
  }

  const Four0FourPage = () => {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Jobs} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/jobs' component={Jobs} />
        {/* <Route exact path='/jobs/:id' render={(props) => <Detail jobTitle="HTML" props={props} />} /> */}
        <ProtectedRoute
          path='/jobs/:id'
          render={(props) => <Detail jobTitle="HTML" props={props} />}
        />
        <Route path="*" component={Four0FourPage} />
      </Switch>
    </div>
  )
}
