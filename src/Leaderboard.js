import './Leaderboard.css';
import React from 'react';
import PropTypes from 'prop-types';

export function Leaderboard(props) {
  const { leaderboard } = props;
  const { scores } = props;
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <td>
            {leaderboard.map((user) => (
              <tr>{user}</tr>
            ))}
          </td>
          <td>
            {scores.map((score) => (
              <tr>{score}</tr>
            ))}
          </td>
        </tbody>
      </table>
    </div>
  );
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf.isRequired,
  scores: PropTypes.arrayOf.isRequired,
};

export default Leaderboard;
