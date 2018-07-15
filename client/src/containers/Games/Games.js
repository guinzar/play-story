import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUserAndSort, changeSort, clickAddGame, editGame } from '../../store/actions/games';
import PropTypes from 'prop-types';

import AddGame from '../../components/AddGame/AddGame';
import Game from '../../components/Games/Game';
import './Games.css';
const ADD_GAME_MODAL = 'addGameModal';

class Games extends Component {
  constructor(props) {
    super(props);
    const path = this.props.location.pathname.split('/');
    const params = this.props.location.search.substr(1).split('&').reduce((acc, param) => {
      param = param.split('=');
      if (param[0] && param[1]) {
        acc[param[0]] = param[1]
      }
      return acc;
    }, {});
    this.props.setUserAndSort(path[1], params.sort);
  }
  componentDidMount() {
    const path = this.props.location.pathname.split('/');
    this.props.getUserPage(this.props.token, path[1], path[2]);
  }
  render() {
    // console.log(this.props.username, this.props.user);
    const addGameButton = this.props.username === this.props.user ? (
      <button onClick={() => this.props.onAddGameClick()} data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary mt-2" type="button">
        +Add Game
      </button>
    ) : null;
    const headers = [['#', false], ['Name', true], ['Release', true],
      ['Genres', false], ['Enjoyment', true], ['Played', false], ['Stories', false]];
    return (
      <React.Fragment>
        <AddGame modalId={ADD_GAME_MODAL} />
        <div className="row">
          <div className="col-9">
            <h1>{this.props.user}'s Games:</h1>
          </div>
          <div className="col-3 text-right">
            {addGameButton}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <table className="table table-sm table-hover table-bordered games-table">
                <thead className="thead-light">
                  <tr>
                    {headers.map((header, i) => (
                      <th key={i} scope="col">
                        {header[1] ? <NavLink
                          onClick={header[1] ? () => this.props.onHeaderClick(header[0]) : null}
                          className=""
                          to={`?sort=${header[0].toLowerCase()}_${this.props.sortBy === header[0] ? this.props.sortAscending ? 'desc' : 'asc' : 'desc'}`}
                          exact
                          activeClassName="active">
                          {header[0]}{this.props.sortBy === header[0] ? this.props.sortAscending ? '▲' : '▼' : ''}
                        </NavLink> : header[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.props.games.map((game, i) => <Game
                    key={i}
                    index={i + 1}
                    game={game}
                    onGameClick={this.props.username === this.props.user ? () => this.props.onGameClick(game) : null}
                  />)}
                </tbody>
              </table>
            </div>
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
    setUserAndSort: (user, sort) => dispatch(setUserAndSort(user, sort)),
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page)),
    onAddGameClick: () => dispatch(clickAddGame()),
    onHeaderClick: (header) => dispatch(changeSort(header)),
    onGameClick: (game) => dispatch(editGame(game))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
