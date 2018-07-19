import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserContent } from '../../store/actions/auth';
import { setUserAndSortTimeline } from '../../store/actions/timeline';
import PropTypes from 'prop-types';
import './Timeline.css';
import Loader from '../../components/Loader/Loader';
import Year from '../../components/Timeline/Year';
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
    return (
      <div className="container-fluid">
        <div className="row header">
          <div className="col-4">
            <h2>{this.props.user}</h2>
          </div>
          <div className="col-4 text-center">
            <h2>
              {'timeline'.split('').map((char, i) => <span
                key={i}
                className={`timeline-header-color-${i < 5 ? i + 1 : i + 1 - 2 * (i - 4)}`}>
                {char}
              </span>)}
            </h2>
          </div>
          <div className="col-4">
            
          </div>
        </div>
        <div className="row">
          {this.props.years.length ? <div className="col d-flex align-items-end">
            <div className="d-flex flex-column timeline-yaxis justify-content-end">
              {Array(5).fill().map((e, i) => <div key={i} className={`d-flex flex-column justify-content-end timeline-yaxis-segment small ${`timeline-yaxis-color-${4 - i}`}`}>
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
          </div> : <div className="col"><div className="loader-background rounded p-1"><Loader /></div></div>}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserAndSortTimeline: (user, sort) => dispatch(setUserAndSortTimeline(user, sort)),
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page))
  };
};

Timeline.propTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  user: PropTypes.string,
  years: PropTypes.array.isRequired,
  setUserAndSortTimeline: PropTypes.func.isRequired,
  getUserPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
