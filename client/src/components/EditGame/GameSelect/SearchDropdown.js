import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SearchDropdown.css'
import SelectGameButton from './SelectGameButton';

const searchDropdown = ({ searchResults }) => {
  return searchResults.length ? 
    (<div className="list-group search-results w-100 mt-1">
      {searchResults.map((game, i) =>
        <SelectGameButton key={i} game={game} />
      )}
    </div>) : null;
};

const mapStateToProps = state => {
  return {
    searchResults: state.editGame.searchResults
  };
};

searchDropdown.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(searchDropdown);
