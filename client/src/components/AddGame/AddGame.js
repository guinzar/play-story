import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/addGame';
import PropTypes from 'prop-types';
import './AddGame.css'
import GameSelect from './GameSelect/GameSelect';
import DetailsForm from './DetailsForm/DetailsForm';
import { bindActionCreators } from '../../../node_modules/redux';

const addGame = ({ modalId, token, username, addGameForm, submit }) => {
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
            <button onClick={() => submit(token, username, {
              id: addGameForm.selectedGame.id,
              name: addGameForm.selectedGame.name,
              release: addGameForm.selectedGame.first_release_date,
              thumb: addGameForm.thumb,
              platform: addGameForm.platform,
              genres: addGameForm.selectedGame.genres,
              enjoyment: addGameForm.enjoyment,
              comment: addGameForm.comment,
              playData: addGameForm.playData
            })} type="button" className="btn btn-primary" disabled={addGameForm.selectedGame === null}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    addGameForm: state.addGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (token, username, gameData) => dispatch(actions.addGameSubmit(token, username, gameData))
  };
};

addGame.propTypes = {
  modalId: PropTypes.string.isRequired,
  selectedGame: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(addGame);
