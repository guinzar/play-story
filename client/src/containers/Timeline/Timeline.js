import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { getUserContent } from '../../store/actions/auth';
import { setUserAndSortTimeline } from '../../store/actions/timeline';
import PropTypes from 'prop-types';
import './Timeline.css';

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
  componentDidUpdate() {
    if (this.props.games.length) {
      let years = [{}, {}, {}, {}, {}, {}];
      const games = {};
      let startYear, endYear;
      this.props.games.forEach(game => {
        games[game.id] = {
          name: game.name,
          thumb: game.thumb,
          platform: game.platform
        };
        game.playData.forEach(yearData => {
          if (!startYear || !endYear) startYear = endYear = yearData.year;
          else if (yearData.year < startYear) startYear = yearData.year;
          else if (yearData.year > endYear) endYear = yearData.year;
          years[yearData.amount][yearData.year] = years[yearData.amount][yearData.year] || [];
          years[yearData.amount][yearData.year].push(game.id);
        });
      });
      years = Array(6).fill().map((e, amount) => Array(endYear - startYear + 1).fill().map((e, i) => years[amount][i + startYear])).reverse();
      const ctx = document.getElementById("myChart");
      const data = {
        labels: Array(endYear - startYear + 1).fill().map((e, i) => i + startYear),
        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: years.map((amountData, amount) => ({
          label: 'poop',
          data: amountData.map(year => year ? (5 - amount) : null),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        })),
      };
      const options = {
        plugins: {
          datalabels: {
            align: 'end',
            anchor: 'end',
            color: 'black',
            display: (context)=> {
              // return true;
              return context.dataset.data[context.dataIndex] > 0;
            },
            font: {
              weight: 'bold'
            },
            formatter: function(amount, context) {
              // console.log(amount);
              return years[5 - amount][context.dataIndex].map(id => games[id].name);
              // return [context.dataIndex];
            }
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
              stacked: false
          }],
          yAxes: [{
              // stacked: true,
              ticks: {
                beginAtZero: true,
                max: 5,
              }
          }]
          
        },
        responsive: true,
        maintainAspectRatio: false
      };
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1>{this.props.user}'s Timeline:</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <canvas id="myChart" height="400" width="2000"></canvas>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    user: state.timeline.user,
    games: state.timeline.games,
    // sortBy: state.games.sortBy,
    // sortAscending: state.games.sortAscending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserAndSortTimeline: (user, sort) => dispatch(setUserAndSortTimeline(user, sort)),
    getUserPage: (token, user, page) => dispatch(getUserContent(token, user, page)),
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
