import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/addGame';
import PropTypes from 'prop-types';
import './AddGame.css'
import GameSelect from './GameSelect/GameSelect';
import PlayedYears from './PlayedYears/PlayedYears';

const addGame = ({ modalId, addGame }) => {
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
            <GameSelect />
            <PlayedYears />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    addGame: state.addGame
  };
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

addGame.propTypes = {
  modalId: PropTypes.string.isRequired,
  addGame: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(addGame);
