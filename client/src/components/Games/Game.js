import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/games';
import PropTypes from 'prop-types';
import { platformsList, genresList } from '../../config'
import './Game.css';

const game = ({ index, game, onGameClick }) => {
  let release = (new Date(game.release)).toDateString().split(' ');
  release = `${release[1]} ${release[3]}`;
  const genres = game.genres.map(id => genresList[id]).join(', ');
  return (
    <tr onClick={onGameClick ? onGameClick : null} className="game-entry">
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
      <td>{game.playData.map((yearData, i) => <div key={i} className="small">
        {yearData.year} [{yearData.amount}]
      </div>)}</td>
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
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(game);
