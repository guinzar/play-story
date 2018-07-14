import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/addGame';
import PropTypes from 'prop-types';
import './GameSelect.css'
import SearchDropdown from './SearchDropdown/SearchDropdown';

const gameSelect = ({ searchInput, id, name, thumb, onSearchInputChange, onSelectedGameClick }) => {
  const content =  id ?
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
    :
    <div className="input-group mb-3">
      <input autoFocus value={searchInput} onChange={e => onSearchInputChange(e.target.value)} type="text" className="form-control" placeholder="Search for a game..." />
      <SearchDropdown />
    </div>;
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
    searchInput: state.addGame.searchInput,
    id: state.addGame.id,
    name: state.addGame.name,
    thumb: state.addGame.thumb
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchInputChange: (input) => dispatch(actions.changeSearchInput(input)),
    onSelectedGameClick: (name) => dispatch(actions.removeSelectedGame(name))
  };
};

gameSelect.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  onSelectedGameClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(gameSelect);
