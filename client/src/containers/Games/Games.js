import React, { Component } from 'react';
import AddGame from '../../components/AddGame/AddGame';

const ADD_GAME_MODAL = 'addGameModal';

class Games extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8 ">
            Games
          </div>
          <div className="col-4 text-right">
            <button data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary" type="button">
              +Add Game
            </button>
          </div>
        </div>
        <div className="row">
        </div>
        <AddGame modalId={ADD_GAME_MODAL} />
      </React.Fragment>
    );
  }
}

export default Games;
