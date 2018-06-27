import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayedYear from './PlayedYear/PlayedYear';

const playedYears = () => {
  return <div>
    
    </div>
}

const mapStateToProps = state => {
  return {
    searchInput: state.addGame.playedYears
  };
}
export default connect(mapStateToProps)(playedYears);
