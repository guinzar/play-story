import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/editGame';
import PropTypes from 'prop-types';

const selectGameButton = ({ game, onSelectGame }) => {
  return (
    <button onClick={() => onSelectGame(game)} className="list-group-item list-group-item-action">
      <div className="media">
        <img src={game.cover ? game.cover.url : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
          className='mr-2 rounded' 
          alt=''
        />
        <div className="media-body">
          {game.name} (<span className="small">{(new Date(game.first_release_date)).getFullYear()}</span>)
        </div>
      </div>
    </button>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectGame: (game) => dispatch(actions.selectGame(game))
  };
};

selectGameButton.propTypes = {
  game: PropTypes.object.isRequired,
  onSelectGame: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(selectGameButton);
