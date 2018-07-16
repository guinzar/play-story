import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  games: {},
  years: []
  // sortBy: 'Release',
  // sortAscending: false,
};
// const sort = (g1, g2, sortBy, sortAscending) => {
//   if (sortAscending) return g2[sortBy.toLowerCase()] < g1[sortBy.toLowerCase()];
//   return g2[sortBy.toLowerCase()] > g1[sortBy.toLowerCase()];
// };
const setUserAndSort = ( state, action ) => {
  // if (action.sort) {
  //   const sort = action.sort.split('_');
  //   sort[0] = sort[0].charAt(0).toUpperCase() + sort[0].substr(1);
  //   sort[1] = sort[1] === 'asc';
  //   return {
  //     ...state,
  //     user: action.user,
  //     sortBy: sort[0],
  //     sortAscending: sort[1]
  //   };
  // }
  return {
    ...state,
    user: action.user
  };
};
const showGames = ( state, action ) => {
  if (action.games.length) {
    let years = {};
    const games = {};
    let startYear, endYear;
    action.games.forEach(game => {
      games[game.id] = {
        name: game.name,
        thumb: game.thumb,
        platform: game.platform
      };
      game.playData.forEach(yearData => {
        if (!startYear || !endYear) startYear = endYear = yearData.year;
        else if (yearData.year < startYear) startYear = yearData.year;
        else if (yearData.year > endYear) endYear = yearData.year;
        years[yearData.year] = years[yearData.year] || {};
        years[yearData.year][yearData.amount] = years[yearData.year][yearData.amount] || [];
        years[yearData.year][yearData.amount].push(game.id);
      });
    });
    years = Array(endYear - startYear + 1).fill().map((e, i) => [i + startYear, years[i + startYear]]);
    return {
      ...state,
      games: games,
      years: years
    };
  }
  return state
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_USER_AND_SORT_TIMELINE: return setUserAndSort( state, action );
    case actionTypes.SHOW_USER_TIMELINE: return showGames( state, action );
    default: return state;
  }
};

export default reducer;
