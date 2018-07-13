import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUser } from '../../store/actions/user';
import PropTypes from 'prop-types';

import AddGame from '../../components/AddGame/AddGame';
import Game from '../../components/Games/Game';

const ADD_GAME_MODAL = 'addGameModal';

class Games extends Component {
  constructor(props) {
    super(props);
    const path = this.props.location.pathname.split('/');
    this.props.setUser(path[1]);
  }
  componentDidMount() {
    const path = this.props.location.pathname.split('/');
    this.props.getUserPage(this.props.token, path[1], path[2]);
  }
  render() {
    console.log(this.props.username, this.props.user);
    const addGameButton = this.props.username === this.props.user ? (
      <button data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary" type="button">
        +Add Game
      </button>
    ) : null;
    return (
      <React.Fragment>
        <AddGame modalId={ADD_GAME_MODAL} />
        <div className="row">
          <div className="col-8">
            <h1>{this.props.user}'s Games:</h1>
          </div>
          <div className="col-4 text-right">
            {addGameButton}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-sm table-hover table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Release</th>
                  <th scope="col">Platform</th>
                  <th scope="col">Genres</th>
                  <th scope="col">Enjoyment</th>
                  <th scope="col">Played</th>
                  <th scope="col">Stories</th>
                </tr>
              </thead>
              <tbody>
                {this.props.games.map((game, i) => <Game
                  key={i}
                  index={i}
                  id={game.id}
                  name={game.name}
                  release={game.release}
                  thumb={game.thumb}
                  platform={game.platform}
                  genres={game.genres}
                  enjoyment={game.enjoyment}
                  comment={game.comment}
                  playData={game.playData}
                />)}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    user: state.games.user,
    games: state.games.games
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
