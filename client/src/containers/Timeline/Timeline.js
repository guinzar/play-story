import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import * as actions from '../../store/actions/signUp';
import PropTypes from 'prop-types';
import axios from 'axios';

class Timeline extends Component {
  componentDidMount() {
    // console.log(this.props.token);
    // if (this.props.token) {
    //   axios.get('http://localhost:3090/home', {
    //     headers: {
    //       authorization: this.props.token
    //     }
    //   }).then(res => {
    //     console.log(res.data);
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          Timeline
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
