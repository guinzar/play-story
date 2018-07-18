import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getUserContent } from '../../store/actions/auth';
import { setUserAndSort, changeSort, clickAddGame, editGame } from '../../store/actions/games';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import EditGame from '../../components/EditGame/EditGame';
import Game from '../../components/Games/Game';
import './Games.css';
const EDIT_GAME_MODAL = 'editGameModal';
const headers = [['#', false], ['Name', true], ['Release', true],
  ['Genres', false], ['Enjoyment', true], ['Played', false], ['Comment', false]];

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
    const addGameButton = this.props.username === this.props.user ? (
      <button onClick={() => this.props.onAddGameClick()} data-toggle="modal" data-target={`#${EDIT_GAME_MODAL}`} className="btn btn-success mt-1" type="button">
        <strong>Add Game</strong>
      </button>
    ) : null;
    return (
      <div className="container-fluid">
        <EditGame modalId={EDIT_GAME_MODAL} />
        <div className="row header">
          <div className="col-4">
            <h2>{this.props.user}</h2>
          </div>
          <div className="col-4 games-header text-center">
            <h2>games</h2>
          </div>
          <div className="col-4 text-right">
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
                      <th key={i} scope="col" className={['Name', 'Genres', 'Comment'].includes(header[0]) ? 'w-25' : null}>
                        {header[1] ? <NavLink
                          onClick={header[1] ? () => this.props.onHeaderClick(header[0]) : null}
                          className="games-nav-link"
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
                  {this.props.games.length ? this.props.games.map((game, i) => <Game
                    key={game.id}
                    index={i + 1}
                    game={game}
                    onGameClick={this.props.username === this.props.user ? () => this.props.onGameClick(game) : null}
                  />) : <tr><td colSpan="7"><Loading /></td></tr>}
                </tbody>
              </table>
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

Games.propTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  user: PropTypes.string,
  games: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  setUserAndSort: PropTypes.func.isRequired,
  getUserPage: PropTypes.func.isRequired,
  onAddGameClick: PropTypes.func.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onGameClick: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
