import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserContent } from '../../store/actions/auth';
import { setUserAndSortTimeline } from '../../store/actions/timeline';
import { clickAddGame } from '../../store/actions/games';
import PropTypes from 'prop-types';
import './Timeline.css';
import Year from '../../components/Timeline/Year';
import EditGame from '../../components/EditGame/EditGame';
const ADD_GAME_MODAL = 'addGameModal';
const playTimeStrings = [
  ['minimal', '(1 to 24 hours)'],
  ['light', '(24 to 50 hours)'],
  ['moderate', '(50 to 100 hours)'],
  ['heavy', '(100 to 300 hours)'],
  ['uber', '(300+ hours)']
];

class Timeline extends Component {
  constructor(props) {
    super(props);
    const path = this.props.location.pathname.split('/');
    const params = this.props.location.search.substr(1).split('&').reduce((acc, param) => {
      param = param.split('=');
      if (param[0] && param[1]) {
        acc[param[0]] = param[1]
      }
      return acc;
    }, {});
    this.props.setUserAndSortTimeline(path[1], params.sort);
  }
  componentDidMount() {
    const path = this.props.location.pathname.split('/');
    this.props.getUserPage(this.props.token, path[1], path[2]);
  }
  render() {
    const addGameButton = this.props.username === this.props.user ? (
      <button onClick={() => this.props.onAddGameClick()} data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary mt-2" type="button">
        +Add Game
      </button>
    ) : null;
    return (
      <div className="container-fluid">
        <EditGame modalId={ADD_GAME_MODAL} />
        <div className="row">
          <div className="col text-center">
            <h2>{this.props.user}'s Gaming Timeline</h2>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex align-items-end">
            <div className="d-flex flex-column timeline-yaxis justify-content-end">
              {Array(5).fill().map((e, i) => <div key={i} className="d-flex flex-column justify-content-end timeline-yaxis-segment small">
                <div className="timeline-yaxis-string">
                  <div>
                    <strong>{playTimeStrings[4 - i][0]}</strong>
                  </div>
                  <div className="timeline-yaxis-string-descrip">
                    {playTimeStrings[4 - i][1]}
                  </div>
                </div>
              </div>)}
            </div>
            <div className="timeline d-flex flex-nowrap align-items-end">
              {this.props.years.map((year, i) => <Year key={i} year={year[0]} yearData={year[1]} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    user: state.timeline.user,
    years: state.timeline.years,
    // sortBy: state.games.sortBy,
    // sortAscending: state.games.sortAscending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserAndSortTimeline: (user, sort) => dispatch(setUserAndSortTimeline(user, sort)),
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page)),
    onAddGameClick: () => dispatch(clickAddGame())
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
