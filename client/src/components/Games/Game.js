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
      <td>
        <div className="media">
          <img src={game.thumb ? `https://images.igdb.com/igdb/image/upload/t_thumb/${game.thumb}.jpg` : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
            className='mr-2 rounded' 
            alt=''
          />
          <div className="media-body">
            <div>
              {game.name}
            </div>
            <div className="small">
              {platformsList[game.platform]}
            </div>
          </div>
        </div>
      </td>
      <td className="align-middle small">{release}</td>
      <td className="align-middle small">{genres}</td>
      <td className="align-middle">{game.enjoyment}</td>
      <td className="align-middle">{game.playData.map((yearData, i) => <div key={i} className="small">
        {yearData.year} [{yearData.amount}]
      </div>)}</td>
      <td className="align-middle">0</td>
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
