import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  games: {},
  years: []
};
const setUserAndSort = ( state, action ) => {
  return {
    ...state,
    user: action.user
  };
};
const showGames = ( state, action ) => {
  if (!action.games) return state;
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
