import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import PropTypes from 'prop-types';
import './Navbar.css';
const navbar = ({ username, leavePage, logOut }) => {
  const navItems = username ? (
    <React.Fragment>
      <li className="nav-item">
        <NavLink
          onClick={leavePage}
          className = "nav-link"
          to={`/${username}`}
          exact
          activeClassName="active">My Stories</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          onClick={leavePage}
          className = "nav-link"
          to={`/${username}/games`}
          exact
          activeClassName="active">My Games</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          onClick={leavePage}
          className = "nav-link"
          to={`/${username}/timeline`}
          exact
          activeClassName="active">My Timeline</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          onClick={leavePage}
          onClick={() => logOut()}
          className = "nav-link"
          to="/logout"
          exact
          activeClassName="active">Log Out</NavLink>
      </li>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <li className="nav-item">
        <NavLink
          onClick={leavePage}
          className = "nav-link"
          to="/login"
          exact
          activeClassName="active">Log In</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          onClick={leavePage}
          className = "nav-link"
          to="/signup"
          exact
          activeClassName="active">Sign Up</NavLink>
      </li>
    </React.Fragment>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark">
      <NavLink
        onClick={leavePage}
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
          {navItems}
        </ul>
      </div>
    </nav>
  );
};
const mapStateToProps = state => {
  return {
    username: state.auth.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    leavePage: () => dispatch(actions.leavePage()),
    logOut: () => dispatch(actions.logOut())
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbar));
