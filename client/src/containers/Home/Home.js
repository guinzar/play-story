import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import './Home.css';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader/Loader';
import { platformsList } from '../../config';

const formatDate = str => {
  let date = new Date(str);
  let date1 = date.toLocaleDateString().split('/');
  let date2 = date.toLocaleTimeString();
  return `${date1[0]}/${date1[1]} ${date2.substr(0, 5)} ${date2.substr(-2)}`;
};

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
              <p className="lead mb-1">This is an app made for gamers by a long-time gamer</p>
              <NavLink
                to={`/sample/timeline`}
                exact>
                <img className="home-sample-img rounded my-1" src="https://i.imgur.com/wZXHPei.jpg" />
              </NavLink>
              <p className="lead my-1">Record the games you've played, generate cool timelines, and share gaming moments you've had throughout your lifetime</p>
              <p className="lead mb-1">
                Built from the ground up with the MERN (Mongo, Express, React/Redux, Node) stack by <a href="https://www.linkedin.com/guinzar">@guinzar</a>
              </p>
              <hr className="my-2" />
              <p className="mb-2">Note: PlayStory is currently in early stages of development</p>
              <div className="mb-0">
                <strong>Take PlayStory for a spin:</strong>
                <ul className="my-1">
                  <li>Make an account, go to 'My Games' and add some games</li>
                  <li>Input the years you played those games; the more games you add the better!</li>
                  <li>Check out the infographic of your gaming career over at Timeline!</li>
                </ul>
              </div>
              <div>
                <strong>Current Tech / System Design Features:</strong>
                <ul className="my-1">
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
            <div className="home-feed p-2 rounded h-100">
              <div className="text-center">
                <h3>Global Activity Feed</h3>
              </div>
              {this.props.stories.length > 0 ? <div className="small">
                {this.props.stories.map((story, i) => <div key={i}>
                  {formatDate(story.date)}: <NavLink
                    to={`/${story.username}/games`}
                    exact>
                    {story.username}
                  </NavLink> added: {story.name} ({platformsList[story.platform]}) to games library.
                </div>)}
              </div> : <Loader />}
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

Home.propTypes = {
  token: PropTypes.string,
  stories: PropTypes.array.isRequired,
  getHome: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
