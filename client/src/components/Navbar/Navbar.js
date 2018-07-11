import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import PropTypes from 'prop-types';

const navbar = ({ token, logOut }) => {
  // console.log(props.location.pathname);
  const loggedInItems = (
    <React.Fragment>
      <li className="nav-item">
        <NavLink
          className = "nav-link"
          to="/me"
          exact
          activeClassName="active">My Stories</NavLink>
      </li>
      <li className="nav-item">
        <NavLink 
          className = "nav-link"
          to="/mygames"
          exact
          activeClassName="active">My Games</NavLink>
      </li>
      <li className="nav-item">
        <NavLink 
          className = "nav-link"
          to="/timeline"
          exact
          activeClassName="active">My Timeline</NavLink>
      </li>
      <li className="nav-item">
        <NavLink 
          onClick={() => logOut()}
          className = "nav-link"
          to="/logout"
          exact
          activeClassName="active">Log Out</NavLink>
      </li>
    </React.Fragment>
  );
  const loggedOutItems = (
    <React.Fragment>
      <li className="nav-item">
        <NavLink 
          className = "nav-link"
          to="/login"
          exact
          activeClassName="active">Log In</NavLink>
      </li>
      <li className="nav-item">
        <NavLink 
          className = "nav-link"
          to="/signup"
          exact
          activeClassName="active">Sign Up</NavLink>
      </li>
    </React.Fragment>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink 
        className="navbar-brand"
        to="/">PlayStory</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink 
              className="nav-link"
              to="/"
              exact
              activeClassName="active">Home</NavLink>
          </li>
          {token ? loggedInItems : loggedOutItems}
        </ul>
      </div>
    </nav>
  );
};
const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actions.logOut())
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
