import React, {Component} from 'react';
import AddGame from '../../components/AddGame/AddGame';

const ADD_GAME_MODAL = 'addGameModal';

class MyGames extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8 ">
            User's Timeline
          </div>
          <div className="col-4 text-right">
            <button data-toggle="modal" data-target={`#${ADD_GAME_MODAL}`} className="btn btn-primary" type="button">
              +Add Game
            </button>
          </div>
        </div>
        <div className="row">
        </div>
        <AddGame id={ADD_GAME_MODAL} />
      </React.Fragment>
    );
  }
}

export default MyGames;
