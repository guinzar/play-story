import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import './Home.css';
import PropTypes from 'prop-types';
import { platformsList } from '../../config';

class Home extends Component {
  componentDidMount() {
    this.props.getHome(this.props.token);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-7">
            <div className="jumbotron h-100">
              <h1 className="display-4">Welcome to PlayStory!</h1>
              <p className="lead">This is an app made for gamers by a long-time gamer</p>
              <p className="lead">Record the games you've played, generate cool timelines, and share gaming moments you've had throughout your lifetime</p>
              <p className="lead">
                Built from the ground up with the MERN (Mongo, Express, React/Redux, Node) stack by <a href="https://www.linkedin.com/guinzar">@guinzar</a>
              </p>
              <hr className="my-3" />
              <p>Note: PlayStory is currently in early stages of development</p>
              <div className="mt-1">
                <strong>Take PlayStory for a spin:</strong>
                <ul className="mt-2">
                  <li>Make an account, go to 'My Games' and add some games</li>
                  <li>Input the years you played those games; the more games you add the better!</li>
                  <li>Check out the infographic of your gaming career over at Timeline!</li>
                </ul>
              </div>
              <div className="mt-1">
                <strong>Current Tech / System Design Features:</strong>
                <ul className="mt-2 mb-0">
                  <li>Custom JWT Authentication with Passport/MongoDB</li>
                  <li>All data accessible from server with fully RESTful API</li>
                  <li>Optimized Global AND User activity feeds</li>
                  <li>DB Data Normalization/Redundancy prioritizing fast read times</li>
                  <li>Custom-built CSS bar-charting timeline display</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-5 pl-0">
            <div className="home-feed p-2 rounded">
              <div className="align-center">
                <h3>Global Activity Feed:</h3>
              </div>
              <div className="small">
                {this.props.stories.map((story, i) => <div key={i}>
                  {new Date(story.date).toLocaleString().split(',')[0]}: <NavLink
                    to={`/${story.username}/games`}
                    exact>
                    {story.username}
                  </NavLink> added: {story.name} ({platformsList[story.platform]}) to games library.
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    stories: state.home.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHome: (token) => dispatch(actions.getUserContent(token, null, 'home'))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
