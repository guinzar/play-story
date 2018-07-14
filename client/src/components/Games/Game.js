import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/games';
import PropTypes from 'prop-types';
import { platformsList, genresList } from '../../config'
import './Game.css';

const game = ({ index, game, onClick }) => {
  let release = (new Date(game.release)).toDateString().split(' ');
  release = `${release[1]} ${release[3]}`;
  const genres = game.genres.map(id => genresList[id]).join(', ');
  return (
    <tr onClick={() => onClick(game)} className="game-entry">
      <th scope="row">{index}</th>
      <td className="w-25">
        <div>
          {game.name}
        </div>
        <div className="small">
          {platformsList[game.platform]}
        </div>
      </td>
      <td className="align-middle small">{release}</td>
      <td className="align-middle small">{genres}</td>
      <td>{game.enjoyment}</td>
      <td>{game.playData.length}</td>
      <td>0</td>
    </tr>
  );
};
const mapStateToProps = state => {
  return {

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onClick: (game) => dispatch(actions.editGame(game))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(game);
