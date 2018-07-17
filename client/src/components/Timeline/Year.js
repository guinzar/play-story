import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/games';
import PropTypes from 'prop-types';
import { platformsList, genresList } from '../../config'

const year = ({ year, yearData, birthday, games }) => {
  // console.log(year);
  let maxAmount = 0;
  if (yearData) {
    for (let i = 5; i >= 0; i--) {
      if (yearData[i]) {
        maxAmount = i;
        break;
      }
    }
  }
  if (birthday) birthday = `age: ${year - birthday.substr(0, 4) - 1}-${year - birthday.substr(0, 4)}`;
  return (
    <div className="d-flex flex-column justify-content-end timeline-year">
      <div className="timeline-year-content">
        {yearData ? Array(5).fill().map((e, i) => <div key={i} className={`timeline-year-segment${5 - i <= maxAmount ? ` timeline-year-color-${5 - i}` : ''}`}>
          {yearData[5 - i] ? yearData[5 - i].map(id => games[id]).map((game, n) => <div key={n} className="media">
              <img src={game.thumb ? `https://images.igdb.com/igdb/image/upload/t_thumb/${game.thumb}.jpg` : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
                className='mr-1 rounded'
                alt=''
              />
              <div className="media-body">
                <div>
                  {game.name}
                </div>
              </div>
            </div>) : null}
        </div>) : null}
      </div>
      <div className="timeline-year-label">
        <div>
          {year}
        </div>
        <div className="small">
          {yearData ? birthday : null}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    birthday: state.auth.birthday,
    games: state.timeline.games,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(year);
