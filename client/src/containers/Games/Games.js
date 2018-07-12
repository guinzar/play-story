import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUser } from '../../store/actions/user';
import PropTypes from 'prop-types';

import AddGame from '../../components/AddGame/AddGame';

const ADD_GAME_MODAL = 'addGameModal';

class Games extends Component {
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
      <React.Fragment>
        <AddGame modalId={ADD_GAME_MODAL} />
        <div className="row">
          <div className="col-8">
            <h1>Games</h1>
          </div>
          <div className="col-4 text-right">
            <button data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary" type="button">
              +Add Game
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.props.games.map((game, i) => <div key={i}>{game}</div>)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.games.user,
    games: state.games.games
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
