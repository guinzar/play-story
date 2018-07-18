import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/editGame';
import PropTypes from 'prop-types';
import './DetailsForm.css'
import { platformsList, genresList } from '../../../config';
import PlayedYears from './PlayedYears/PlayedYears';

const enjoymentStrings = [
  'This was the worst gaming experience I\'ve ever had in my life',
  'Eating poop would have been preferable to playing this game',
  'Playing this game was excrutiatingly boring or painful',
  'I had a truly awful time playing this game',
  'There was barely anything remotely fun about this game',
  'This game provided a very mediocre amount of fun',
  'I enjoyed this game but only at a very minimal level',
  'The amount of fun I got from this game was decent',
  'This was a pretty fun game.',
  'This game was incredibly awesome',
  'The most fun I\'ve ever had was while playing this game',
  'How much fun did you have playing this game?'
];
const detailsForm = ({ release, platforms, platform, genres, enjoyment, comment, onReleaseInputChange, onReleaseInputDeselect, onPlatformChange, onEnjoymentClick, onCommentInputChange }) => {
  genres = genres.map((genreId, i) => genresList[genreId]).join(', ');
  const enjoymentButtons = [0,1,2,3,4,5,6,7,8,9,10].map(num =>
    <button key={num} type="button" onClick={()=>onEnjoymentClick(num)} className={`btn btn-secondary${num === enjoyment ? ' active' : ''}`}>{num}</button>);
  return (
    <form className="needs-validation detail-form" noValidate>
      <div className="form-row">
        <label htmlFor="formReleaseDate" className="col-4 col-form-label">Release:</label>
        <div className="col-8 d-flex align-items-end">
          <input onChange={(e) => onReleaseInputChange(e.target.value)} onBlur={() => onReleaseInputDeselect()} type="date" value={release} className="form-control" id="formReleaseDate" />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="formPlatform" className="col-4 col-form-label">Platform:</label>
        <div className="col-8">
          <select value={platform} onChange={(e) => onPlatformChange(+e.target.value)} className="form-control mt-1" id="formPlatform">
            {platforms.map((platformId, i) => <option key={i} value={platformId}>{platformsList[platformId]}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="formGenres" className="col-2 col-form-label">Genres:</label>
        <div className="col-10">
          <div className="form-control-plaintext text-right small" id="formGenres">
            {genres}
          </div>
        </div>
      </div>
      <div className="form-row mb-2">
        <label htmlFor="formRating" className="col-2 col-form-label">Enjoyment:</label>
        <div className="col-10 d-flex flex-column align-items-center">
          <div className="btn-group" role="group">
            {enjoymentButtons}
          </div>
          <div className="small">
            {enjoyment === null ? enjoymentStrings[11] : `"${enjoymentStrings[enjoyment]}"`}
          </div>
        </div>
      </div>
      <div className="form-row mb-2">
        <label htmlFor="formComments" className="col-2 col-form-label">Comment:</label>
        <div className="col-10 d-flex align-items-center justify-content-between">
          <div className="w-100 mr-2">
            <textarea onChange={(e) => onCommentInputChange(e.target.value)} value={comment} className="form-control" id="formComments" rows="2" />
          </div>
          <div>
            <button type="button" className="btn btn-secondary btn-sm">X</button>
          </div>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="formPlayed" className="col-2">Played:</label>
        <div className="col-10">
          <PlayedYears />
        </div>
      </div>
    </form>
  )
};

const mapStateToProps = state => {
  return {
    release: state.editGame.release,
    platforms: state.editGame.platforms,
    platform: state.editGame.platform,
    genres: state.editGame.genres,
    enjoyment: state.editGame.enjoyment,
    comment: state.editGame.comment,
    playData: state.editGame.playData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onReleaseInputChange: (value) => dispatch(actions.changeReleaseInput(value)),
    onReleaseInputDeselect: () => dispatch(actions.deselectReleaseInput()),
    onPlatformChange: (value) => dispatch(actions.changePlatform(value)),
    onEnjoymentClick: (value) => dispatch(actions.changeEnjoyment(value)),
    onCommentInputChange: (input) => dispatch(actions.changeCommentInput(input))
  };
};

detailsForm.propTypes = {
  // selectedGame: PropTypes.object.isRequired,
  // enjoyment: PropTypes.number,
  // comment: PropTypes.string.isRequired,
  onEnjoymentClick: PropTypes.func,
  onCommentInputChange: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(detailsForm);
