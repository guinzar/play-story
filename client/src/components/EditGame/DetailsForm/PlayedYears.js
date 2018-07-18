import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/editGame';
import PropTypes from 'prop-types';
import PlayedYear from './PlayedYear';

const playedYears = ({ yearsNotPlayed, playData, onAddPlayedYear }) => {
  const content = (
    <React.Fragment>
      {playData.map((yearData, i) => <PlayedYear key={yearData.year} index={i} yearData={yearData} />)}
      {yearsNotPlayed.length ?
        <button onClick={() => onAddPlayedYear()} type="button" className="btn btn-primary btn-sm btn-block">+ Year</button>
      : null}
    </React.Fragment>
  )
  return content;
};

const mapStateToProps = state => {
  return {
    yearsNotPlayed: state.editGame.yearsNotPlayed,
    playData: state.editGame.playData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPlayedYear: () => dispatch(actions.addPlayedYear())
  };
};

playedYears.propTypes = {
  yearsNotPlayed: PropTypes.array.isRequired,
  playData: PropTypes.array.isRequired,
  onAddPlayedYear: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(playedYears);
