import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to={"/home"} />
        </Switch>
      </HashRouter>
    </>
  )
}

export default App;
