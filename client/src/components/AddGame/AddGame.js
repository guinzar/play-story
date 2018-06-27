import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';
import './AddGame.css'
import SearchDropdown from './SearchDropdown/SearchDropdown';

const addGame = ({id, addGame, onSearchInputChange}) => {
  const gameSelect = addGame.selectedGame ?
    <button className="btn btn-success btn-block selected-game-btn">
      <div className="media">
        <img src={addGame.selectedGame.cover ? addGame.selectedGame.cover.url : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
          className='mr-2 my-auto' 
          alt=''
        />
        <div className="media-body my-auto">
          <h6 className="my-auto">{addGame.selectedGame.name}</h6>
        </div>
      </div>
    </button>
    :
    <div className="input-group mb-3">
      <input value={addGame.searchInput} onChange={e => onSearchInputChange(e.target.value)} type="text" className="form-control" placeholder="Search for a game..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
      <SearchDropdown />
    </div>;
  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Add Game</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {gameSelect}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    addGame: state.addGame
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchInputChange: (input) => dispatch(actions.changeSearchInput(input))
  }
}

addGame.propTypes = {
  id: PropTypes.string,
  addGame: PropTypes.object,
  onSearchInputChange: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(addGame);
