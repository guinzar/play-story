import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/addGame';
import PropTypes from 'prop-types';
import PlayedYear from './PlayedYear/PlayedYear';

const playedYears = ({ yearsNotPlayed, playedData, onAddPlayedYear }) => {
  const content = (
    <React.Fragment>
      {playedData.map((yearData, i) => <PlayedYear key={yearData.year} index={i} yearData={yearData} />)}
      {yearsNotPlayed.length ?
        <button onClick={() => onAddPlayedYear()} type="button" className="btn btn-primary btn-sm btn-block">+ Year</button>
      : null}
    </React.Fragment>
  )
  return content;
};

const mapStateToProps = state => {
  return {
    yearsNotPlayed: state.addGame.yearsNotPlayed,
    playedData: state.addGame.playedData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPlayedYear: () => dispatch(actions.addPlayedYear())
  };
};

playedYears.propTypes = {
  yearsNotPlayed: PropTypes.array.isRequired,
  playedData: PropTypes.array.isRequired,
  onAddPlayedYear: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(playedYears);
