import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/editGame';
import PropTypes from 'prop-types';
import './EditGame.css'
import GameSelect from './GameSelect/GameSelect';
import DetailsForm from './DetailsForm/DetailsForm';

const editGame = ({ modalId, token, username, editGameForm, submit }) => {
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Add/Edit Game</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container-fluid px-0">
              <GameSelect />
              {editGameForm.id ? <DetailsForm /> : null}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={() => submit(token, username, {
              id: editGameForm.id,
              name: editGameForm.name,
              release: new Date(editGameForm.release).getTime(),
              thumb: editGameForm.thumb,
              platforms: editGameForm.platforms,
              platform: editGameForm.platform,
              genres: editGameForm.genres,
              enjoyment: editGameForm.enjoyment,
              comment: editGameForm.comment,
              playData: editGameForm.playData
            })} type="button" className="btn btn-primary" disabled={editGameForm.id === null}>Save</button>
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
    editGameForm: state.editGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (token, username, gameData) => dispatch(actions.editGameSubmit(token, username, false, gameData))
  };
};

editGame.propTypes = {
  modalId: PropTypes.string.isRequired,
  // selectedGame: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(editGame);
