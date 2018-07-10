import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import SignUp from './containers/SignUp/SignUp';
import LogIn from './containers/LogIn/LogIn';
import MyGames from './containers/MyGames/MyGames';

class App extends Component {
  render() {
    const routes = (
      <Switch>
        {/* <Route path="/login" component={LogIn} /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/mygames" component={MyGames} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
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
