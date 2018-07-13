import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    this.props.getHome(this.props.token);
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1>Home</h1>
          {this.props.stories.map((story, i) => <div key={i}>{story}</div>)}
        </div>
      </React.Fragment>
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
