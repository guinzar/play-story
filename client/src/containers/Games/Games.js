import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUser } from '../../store/actions/user';
import { changeSort } from '../../store/actions/games';
import PropTypes from 'prop-types';

import AddGame from '../../components/AddGame/AddGame';
import Game from '../../components/Games/Game';
import './Games.css';
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
    // console.log(this.props.username, this.props.user);
    const addGameButton = this.props.username === this.props.user ? (
      <button data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary" type="button">
        +Add Game
      </button>
    ) : null;
    const headers = [['#', false], ['Name', true], ['Release', true],
      ['Genres', false], ['Enjoyment', true], ['Played', false], ['Stories', false]];
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
                  {headers.map((header, i) => (
                    <th key={i} scope="col"
                      onClick={header[1] ? () => this.props.onHeaderClick(header[0]) : null}
                      className={`games-header${header[1] ? ' games-header-clickable': ''}`}>
                      {header[0]}{this.props.sortBy === header[0] ? this.props.sortAscending ? '▲' : '▼' : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.props.games.map((game, i) => <Game key={i} index={i + 1} game={game} />)}
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
    games: state.games.games,
    sortBy: state.games.sortBy,
    sortAscending: state.games.sortAscending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page)),
    onHeaderClick: (header) => dispatch(changeSort(header))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
