import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUser } from '../../store/actions/user';
import PropTypes from 'prop-types';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.props.setUser(this.props.location.pathname.substr(1));
  }
  componentDidMount() {
    // console.log(this.props.user);
    this.props.getUserPage(this.props.token, `user${this.props.location.pathname}`);
  }
  render() {
    console.log(this.props.user)
    return (
      <div className="row">
        <h1>{this.props.user}</h1>
        {this.props.stories.map((story, i) => <div key={i}>{story}</div>)}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.user.user,
    stories: state.user.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    getUserPage: (token, page) => dispatch(getUserContent(token, page))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
