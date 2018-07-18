import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/editGame';
import PropTypes from 'prop-types';
import './GameSelect.css'
import SearchDropdown from './SearchDropdown/SearchDropdown';

const gameSelect = ({ searchInput, token, username, isEdit, id, name, thumb, onSearchInputChange, onSelectedGameClick, onRemoveGameClick }) => {
  const content =  id ?
    <div className="d-flex">
      <button onClick={() => onSelectedGameClick(searchInput)} className="btn btn-success btn-block selected-game-btn">
        <div className="media">
          <img src={thumb ? `https://images.igdb.com/igdb/image/upload/t_thumb/${thumb}.jpg` : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
            className='mr-2 my-auto' 
            alt=''
          />
          <div className="media-body my-auto">
            <h6 className="my-auto">{name}</h6>
          </div>
        </div>
      </button>
      {isEdit ? <button onClick={() => onRemoveGameClick(token, username, {id: id})} className="btn btn-danger">-</button> : null }
    </div>
    :
    <React.Fragment>
      <div className="input-group">
        <input autoFocus value={searchInput} onChange={e => onSearchInputChange(e.target.value)} type="text" id="game-search-input" className="form-control" placeholder="Search for a game..." />
      </div>
      <SearchDropdown />
    </React.Fragment>
  return (
    <div className="row">
      <div className="col">
        {content}
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    searchInput: state.editGame.searchInput,
    isEdit: state.editGame.isEdit,
    id: state.editGame.id,
    name: state.editGame.name,
    thumb: state.editGame.thumb
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchInputChange: (input) => dispatch(actions.changeSearchInput(input)),
    onSelectedGameClick: (name) => dispatch(actions.removeSelectedGame(name)),
    onRemoveGameClick: (token, username, gameData) => dispatch(actions.editGameSubmit(token, username, true, gameData))
  };
};

gameSelect.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  onSelectedGameClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(gameSelect);
