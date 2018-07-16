import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getUserContent } from '../../store/actions/auth';
import { setUserAndSortTimeline } from '../../store/actions/timeline';
import PropTypes from 'prop-types';

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
    let timeline = null;
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
      console.log(games);
      // const yearData = Array(6).fill().map((e, amount) => Array(endYear - startYear + 1).fill().map((e, i) => years[i + startYear]);
      console.log(years);
      const data = {
        // labels: years.map((e, i) => i + startYear),
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
        },{
          label: '# of Votes',
          data: [13, 19, 3, 5, 2, 3],
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
        }]
      };
      const options = {
        plugins: {
					datalabels: {
            color: 'black',
						display: (context)=> {
              console.log('asdf')
              // console.log(context)
              // return false;
              return true;
							// return context.dataset.data[context.dataIndex] > 2;
						},
						// font: {
						// 	weight: 'bold'
						// },
						// formatter: function(value, context) {
            //   return context.chart.data.labels[context.dataIndex];
            // }
					}
				},
        scales: {
          xAxes: [{
              stacked: false
          }],
          yAxes: [{
              // stacked: true,
              ticks: {
                beginAtZero:true
              }
          }]
        }
      };
      timeline = <Bar data={data} options={options} />;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1>{this.props.user}'s Timeline:</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {timeline}
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
