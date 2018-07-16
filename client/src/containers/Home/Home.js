import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import './Home.css';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    this.props.getHome(this.props.token);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="jumbotron">
              <h1 className="display-4">Welcome to PlayStory!</h1>
              <p className="lead">This is an app made for gamers by a long-time gamer</p>
              <p className="lead">Record the games you've played, generate cool timelines, and share gaming moments you've had throughout your lifetime</p>
              <p className="lead">
                Built from the ground up with the MERN (Mongo, Express, React/Redux, Node) stack by <a href="https://www.linkedin.com/guinzar">@guinzar</a>
              </p>
              <hr className="my-4" />
              <p>Note: PlayStory is currently in early stages of development</p>
              <p>Take PlayStory for a spin:</p>
              <li>Make an account, go to 'My Games' and add some games</li>
              <li>Input the years you played those games; the more games you add the better!</li>
              <li>Check out the infographic of your gaming career over at Timeline!</li>
            </div>
          </div>
          {/* <div className="col-6">
            {this.props.stories.map((story, i) => <div key={i}>{story}</div>)}
          </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
