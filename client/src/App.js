import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import _ from 'underscore';

import IGDB_API_KEY from './config.js';
const fakeResults = [{"id":18063,"name":"Atlas Reactor","summary":"Atlas Reactor is a 4v4 team-based tactical/strategic PvP game that uses simultaneous turns with 4 action phases during combat. Prep -> Dash -> Blast -> Move. Players can't Move after a Dash action. The players on both teams are given 20 seconds to choose an action each turn that is then played out in order. \nPrep and Blast actions are shown individually for a better idea of what has happened during their phases. \nDash and Move actions are shown simultaneously during their phases.","genres":[4,15,16,24],"first_release_date":1475539200000,"platforms":[6],"cover":{"url":"//images.igdb.com/igdb/image/upload/t_thumb/drxezsfcf9apzycrq3pt.jpg","cloudinary_id":"drxezsfcf9apzycrq3pt","width":600,"height":800},"websites":[{"category":13,"url":"https://store.steampowered.com/app/402570"},{"category":1,"url":"https://www.atlasreactorgame.com/en/?affiliateId=251"},{"category":5,"url":"https://twitter.com/AtlasReactor"},{"category":4,"url":"https://www.facebook.com/AtlasReactor"}]},{"id":52429,"name":"Atlas Reactor - Ultimate Reactor Edition"},{"id":52430,"name":"Atlas Reactor - All Freelancers Edition"},{"id":33173,"name":"Atlas Reactor VR Character Viewer","summary":"Outwit to outlive in Atlas Reactor, the genre-breaking team tactics game coming soon from Trion Worlds.\n\nWith the VR Character Viewer, you can check out all of Atlas’ most wanted Freelancers (and their skins, styles, and skills) in a revolutionary new way!","genres":[15],"first_release_date":1459814400000,"platforms":[6],"websites":[{"category":1,"url":"https://www.atlasreactorgame.com/en/?affiliateId=251"},{"category":13,"url":"https://store.steampowered.com/app/457230"}]},{"id":18545,"name":"Reactor","summary":"Your space ship is wihtin a nuclear reactor. At the center is the core whose walls are deadly for you if you touch them. Over time, the core starts to melt down and in the process starts to expand which leaves you less space to navigate. You share the precious space in the reactor with some particles which are not only attracted to your ship but will also try to bump you into the deadly walls of the core. You in turn try to do the same to them. In order to prevent the core to melt down the player has to bump all the particles into the deadly walls of the core. If the core has already expanded due to meltdown the player can try to bump the particles into two sets of four rods in order to reverse the process of melting down. After eliminating one set of rods the core will shrink back to its original size. To make matters easier the player can utilize decoys which will attract the particles. In doing so the player can maneuver the particles in an advantageous position for bumping them into the deadly core wall or into the rods.","genres":[33],"first_release_date":410140800000,"platforms":[52,59],"cover":{"url":"//images.igdb.com/igdb/image/upload/t_thumb/ppxfpql46tz6lgpgkmut.jpg","cloudinary_id":"ppxfpql46tz6lgpgkmut","width":1000,"height":1364}},{"id":37066,"name":"Starlink: Battle for Atlas","summary":"Starlink: Battle for Atlas is an all-new action-adventure game developed by Ubisoft Toronto. This deep, open-world space saga features Smart Building Technology empowering players to assemble and customize real-world physical starships. Each part attached to the starship appears instantly in-game and players can experiment with different pilot abilities, weapon types, and status effects and unleash devastating combos upon their enemies.","genres":[5,11,15,31],"first_release_date":1539648000000,"platforms":[48,49,130],"cover":{"url":"//images.igdb.com/igdb/image/upload/t_thumb/cbkogolvyufvicobwznt.jpg","cloudinary_id":"cbkogolvyufvicobwznt","width":560,"height":698},"websites":[{"category":3,"url":"https://en.wikipedia.org/wiki/Starlink:_Battle_for_Atlas"},{"category":1,"url":"https://www.ubisoft.com/en-us/game/starlink/"}]},{"id":40165,"name":"Reaktor","first_release_date":539136000000,"platforms":[52],"cover":{"url":"//images.igdb.com/igdb/image/upload/t_thumb/wse0jdhbpwgqxjz412od.jpg","cloudinary_id":"wse0jdhbpwgqxjz412od","width":945,"height":1080}},{"id":35928,"name":"Refactor","summary":"Refactor is a physics-based platformer taking elements from classic Metroidvanias. Placed in a world that is a puzzle itself, you can literally turn the world upside down by rearranging the map and building your own pathways through the game.","genres":[8,9,31,32],"first_release_date":1538265600000,"platforms":[6,92,14,3],"cover":{"url":"//images.igdb.com/igdb/image/upload/t_thumb/rfb8udzxecr94rzz2gj5.jpg","cloudinary_id":"rfb8udzxecr94rzz2gj5","width":1024,"height":300},"websites":[{"category":1,"url":"http://nextgenpants.com/refactor"},{"category":13,"url":"https://store.steampowered.com/app/342730"}]},{"id":101858,"name":"Reactor idle"},{"id":27318,"name":"Neo ATLAS 1469","summary":"You play the role as the Master of a Trading Company, and your aim is to complete the World Map and tell the world what the \"world\" really is, via the help of the admirals you hire. Your sole decision to \"Approve\" or \"Disapprove\" is the key to shape the world!","genres":[13,15,31],"first_release_date":1477526400000,"platforms":[6,46,130],"cover":{"url":"//images.igdb.com/igdb/image/upload/t_thumb/ym4macygxnu27ncuof1r.jpg","cloudinary_id":"ym4macygxnu27ncuof1r","width":247,"height":338},"websites":[{"category":13,"url":"https://store.steampowered.com/app/532690"}]}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: fakeResults,
      open: false
    }
  }
  search = _.debounce((input) => {
    if (!input.length) this.setState({ results: [] });
    else {
      axios.get("https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/games/",
        {
          headers: {
            'user-key': IGDB_API_KEY,
            'Accept': 'application/json'
          },
          params: {
            'search': input,
            'fields': 'name,summary,genres,first_release_date,platforms,cover,websites'
          }
        }
      ).then(({data}) => {
        console.log(data);
        this.setState({
          results: data
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }, 500);
  handleDateChange(date, type) {
    this.setState(type === 'start' ? {
      startDate: date
    } : {
      endDate: date
    });
  }
  onInputHandler(input) {
    this.setState({
      search: input
    });
    this.search(input);
  }
  addGameClickHandler() {
    console.log('clicked')
  }
  render() {
    const dropdown = this.state.results.length ? 
      (<div class="list-group search-results">
        {this.state.results.map((result, i) =>
          <button key={i} class="list-group-item list-group-item-action">
            <div class="media">
              <img src={result.cover ? result.cover.url : 'https://images.igdb.com/igdb/image/upload/t_micro/nocover_qhhlj6.jpg'}
                class='mr-2 rounded' 
                alt=''
              />
              <div class="media-body">
                {result.name}
              </div>
            </div>
          </button>
        )}
      </div>) : null;
    const nav = (
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <a class="navbar-brand" href="#">PlayStory</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Games</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Timeline</a>
            </li>
          </ul>
        </div>
      </nav>
    );
    return (
      <React.Fragment>
        {nav}
        <div class="container">
          <div class="row">
            <div class="col-8 ">
              User's Timeline
            </div>
            <div class="col-4 text-right">
              <button data-toggle="modal" data-target="#exampleModalLong" class="btn btn-primary" type="button">
                +Add Game
              </button>
            </div>
          </div>
          <div class="row">
          </div>
          <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Add Game</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="input-group mb-3">
                    <input value={this.state.search} onChange={e => this.onInputHandler(e.target.value)} type="text" class="form-control" placeholder="Search for a game..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    {dropdown}
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
