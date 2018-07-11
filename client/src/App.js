import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import SignUp from './containers/SignUp/SignUp';
import LogIn from './containers/LogIn/LogIn';
import UserPage from './containers/UserPage/UserPage';
import Games from './containers/MyGames/MyGames';
import Timeline from './containers/Timeline/Timeline';

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={Home} />
        <Route path="/*/games" component={Games} />
        <Route path="/*/timeline" component={Timeline} />
        <Route path="/" component={UserPage} />
        {/* <Redirect to="/" /> */}
      </Switch>
    );
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          {routes}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
