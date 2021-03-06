import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import SignUp from './containers/SignUp/SignUp';
import LogIn from './containers/LogIn/LogIn';
import Stories from './containers/Stories/Stories';
import Games from './containers/Games/Games';
import Timeline from './containers/Timeline/Timeline';

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Redirect from="/logout" to="/" />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={Home} />
        <Route path="/:user/games" exact component={Games} />
        <Route path="/:user/timeline" exact component={Timeline} />
        <Route path="/:user" exact component={Stories} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <React.Fragment>
        <Navbar />
        {routes}
      </React.Fragment>
    );
  }
}

export default withRouter(App);
