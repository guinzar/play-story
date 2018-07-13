import React from 'react';
import PropTypes from 'prop-types';
import { platformsList, genresList } from '../../config'

const game = ({ index, id, name, release, thumb, platform, genres, enjoyment, comment, playData }) => {
  release = (new Date(release)).toDateString().split(' ');
  release = `${release[1]} ${release[3]}`;
  genres = genres.map(id => genresList[id]).join(', ');
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{name}</td>
      <td className="align-middle small">{release}</td>
      <td className="align-middle small">{platformsList[platform]}</td>
      <td className="align-middle small">{genres}</td>
      <td>{enjoyment}</td>
      <td>{playData.length}</td>
      <td>0</td>
    </tr>
  );
};

export default game;
