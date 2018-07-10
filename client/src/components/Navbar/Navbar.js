import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const navbar = props => {
  console.log(props.location.pathname);
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
          <li className="nav-item">
            <NavLink
              className = "nav-link"
              to="/me"
              exact
              activeClassName="active">My Feed</NavLink>
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
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(navbar);
