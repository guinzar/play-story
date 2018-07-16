import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUser } from '../../store/actions/user';
import PropTypes from 'prop-types';

class UserPage extends Component {
  constructor(props) {
    super(props);
    const path = this.props.location.pathname.split('/');
    this.props.setUser(path[1]);
  }
  componentDidMount() {
    const path = this.props.location.pathname.split('/');
    this.props.getUserPage(this.props.token, path[1], 'user');
  }
  render() {
    // console.log(this.props.user)
    return (
      <div className="container">
        <div className="row">
          <h1>{this.props.user}'s Stories:</h1>
          {this.props.stories.map((story, i) => <div key={i}></div>)}
        </div>
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
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
