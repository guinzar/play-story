import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/addGame';
import PropTypes from 'prop-types';
import './AddGame.css'
import GameSelect from './GameSelect/GameSelect';
import DetailsForm from './DetailsForm/DetailsForm';
import { bindActionCreators } from '../../../node_modules/redux';

const addGame = ({ modalId, addGameForm, submit }) => {
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Add Game</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container-fluid px-0">
              <GameSelect />
              {addGameForm.selectedGame ? <DetailsForm /> : null}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={() => submit({
              gameId: addGameForm.selectedGame.id,
              name: addGameForm.selectedGame.name,
              thumb: addGameForm.selectedGame.cover ? addGameForm.selectedGame.cover.url : null,
              
            })} type="button" className="btn btn-primary" disabled={addGameForm.selectedGame === null}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
// selectedGame: null,
//   searchInput: '',
//   searchResults: fakeResults,
//   platform: null,
//   enjoyment: null,
//   comment: '',
//   yearsNotPlayed: [],
//   playedData: []
const mapStateToProps = state => {
  return {
    addGameForm: state.addGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (gameData) => dispatch(actions.addGameSubmit(gameData))
  };
};

addGame.propTypes = {
  modalId: PropTypes.string.isRequired,
  selectedGame: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(addGame);
