import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUser } from '../../store/actions/user';
import PropTypes from 'prop-types';
import './Stories.css';

import Loading from '../../components/Loading/Loading';
import { platformsList } from '../../config';

class Stories extends Component {
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
    return (
      <div className="container-fluid">
        <div className="row header">
          <div className="col-4">
            <h2>{this.props.user}</h2>
          </div>
          <div className="col-4 stories-header text-center">
            <h2>stories</h2>
          </div>
          <div className="col-4">
            
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="stories rounded p-2">
              <div className="stories-highlight lead">
                The Stories feature is in dev / coming soon. Here's just a raw text feed of your added game activity for now:
              </div>
              <div>
                {this.props.stories.length ? this.props.stories.map((story, i) => <div key={i}>
                  {new Date(story.date).toDateString()}: {this.props.user} added: {story.name} ({new Date(story.release).toISOString().substr(0, 10)}) ({platformsList[story.platform]}) to games library.
                </div>) : <Loading />}
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
    username: state.auth.username,
    user: state.stories.user,
    stories: state.stories.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page))
  };
};

Stories.propTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  user: PropTypes.string,
  stories: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  getUserPage: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stories));
