import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/addGame';
import PropTypes from 'prop-types';

const playTimeStrings = [
  'minimal (1 to 24 hours)',
  'light (24 to 50 hours)',
  'moderate (50 to 100 hours)',
  'heavy (100 to 300 hours)',
  'uber (300+ hours)'
];

const playedYear = ({ index, yearData, birthday, yearsNotPlayed, onRemovePlayedYear, onChangePlayedYearYear, onChangePlayedYearAmount }) => {
  yearsNotPlayed = [...yearsNotPlayed, yearData.year].sort();
  if (birthday) birthday = birthday.substr(0, 4);
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div className="d-flex flex-column w-100 mr-2">
        <div className="d-flex align-items-center">
          <div className="detail-form-year-label">
            Year:
          </div>
          <div className="detail-form-year-select">
            <select value={yearData.year} onChange={(e) => onChangePlayedYearYear(index, +e.target.value)} className="form-control mt-1" id="asdf">
              {yearsNotPlayed.map((year, i) => <option key={i} value={year}>
                {year}{birthday ? ` (age ${year - birthday - 1}-${year - birthday})`: null}
              </option>)}
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="detail-form-year-label">
            Amount:
          </div>
          <div className="detail-form-year-select">
            <select value={yearData.amount} onChange={(e) => onChangePlayedYearAmount(index, +e.target.value)} className="form-control mt-1" id="asdf">
              {playTimeStrings.map((amount, i) => <option key={i} value={i}>{amount}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => onRemovePlayedYear(index)} type="button" className="btn btn-secondary btn-sm">X</button>
      </div>
    </div>
  )
};
const mapStateToProps = state => {
  return {
    birthday: state.auth.birthday,
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
