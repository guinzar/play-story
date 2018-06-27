import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'underscore';
import * as actions from '../../store/actions/index';

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }
  onInputHandler(input) {
    this.setState({
      search: input
    });
    this.props.onSearchInput(input);
  }
  render() {
    const dropdown = this.props.addGame.searchResults.length ? 
      (<div className="list-group search-results">
        {this.props.addGame.searchResults.map((result, i) =>
          <button key={i} className="list-group-item list-group-item-action">
            <div className="media">
              <img src={result.cover ? result.cover.url : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
                className='mr-2 rounded' 
                alt=''
              />
              <div className="media-body">
                {result.name}
              </div>
            </div>
          </button>
        )}
      </div>) : null;
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add Game</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input value={this.state.search} onChange={e => this.onInputHandler(e.target.value)} type="text" className="form-control" placeholder="Search for a game..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                {dropdown}
              </div>
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
}

const mapStateToProps = state => {
  return {
    addGame: state.addGame
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchInput: (input) => dispatch(actions.initSearch(input)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);
