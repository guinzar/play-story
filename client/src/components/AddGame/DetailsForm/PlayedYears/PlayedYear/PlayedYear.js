import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/addGame';
import PropTypes from 'prop-types';

const playTimeStrings = [
  'none (have game but didn\'t play)',
  'minimal (minutes) (1 to 60 minutes)',
  'light (hours) (1 to 24 hours)',
  'moderate (days) (24 to 168 hours)',
  'heavy (weeks) (168 to 672 hours)',
  'extreme (months) (672+ hours)'
];

const playedYear = ({ index, yearData, yearsNotPlayed, onRemovePlayedYear, onChangePlayedYearYear, onChangePlayedYearAmount }) => {
  yearsNotPlayed = [...yearsNotPlayed, yearData.year].sort();
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div>
        <select value={yearData.year} onChange={(e) => onChangePlayedYearYear(index, +e.target.value)} className="form-control mt-1" id="asdf">
          {yearsNotPlayed.map((year, i) => <option key={i} value={year}>{year}</option>)}
        </select>
      </div>
      <div className="small">
        Amount:
      </div>
      <div>
        <select value={yearData.playTime} onChange={(e) => onChangePlayedYearAmount(index, +e.target.value)} className="form-control mt-1" id="asdf">
          {playTimeStrings.map((playTime, i) => <option key={i} value={i}>{playTime}</option>)}
        </select>
      </div>
      <div>
        <button onClick={() => onRemovePlayedYear(index)} type="button" className="btn btn-secondary btn-sm">X</button>
      </div>
    </div>
  )
};
const mapStateToProps = state => {
  return {
    yearsNotPlayed: state.addGame.yearsNotPlayed
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRemovePlayedYear: (index) => dispatch(actions.removePlayedYear(index)),
    onChangePlayedYearYear: (index, year) => dispatch(actions.changePlayedYearYear(index, year)),
    onChangePlayedYearAmount: (index, amount) => dispatch(actions.changePlayedYearAmount(index, amount))
  };
};

playedYear.propTypes = {
  index: PropTypes.number.isRequired,
  yearData: PropTypes.object.isRequired,
  onRemovePlayedYear: PropTypes.func.isRequired,
  onChangePlayedYearYear: PropTypes.func.isRequired,
  onChangePlayedYearAmount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(playedYear);
