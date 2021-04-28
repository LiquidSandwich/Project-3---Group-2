import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import GameMode from './GameMode';
import Leader from './Leaderboard';
import { socket } from './Socket';

export function Results(props) {
  const { answerStats } = props;
  const { userData } = props;
  const { isLogged } = props;
  const [restart, setRestart] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [scores, setScores] = useState([]);

  const replay = () => {
    setRestart(!restart);
  };

  useEffect(() => {
    socket.on('leaderboard', (data) => {
      setLeaderboard(data.users);
      setScores(data.scores);
      console.log('LEADERBOARD ');
      console.log(leaderboard);
    });
  }, []);

  return (
    <div>
      {restart ? (
        <div className="stats">
          <Leader leaderboard={leaderboard} scores={scores} />
          <div className="answer_results">
            {answerStats.map((answerChoice, index) => (
              <div>
                {' '}
                {index + 1}
                .
                {' '}
                {answerChoice}
                {' '}
              </div>
            ))}
          </div>
          <button type="button" className="button" onClick={() => replay()}>Replay</button>
        </div>
      )
        : <GameMode userData={userData} isLogged={isLogged} />}
    </div>
  );
}

Results.propTypes = {
  userData: PropTypes.objectOf.isRequired,
  isLogged: PropTypes.bool.isRequired,
  answerStats: PropTypes.arrayOf.isRequired,
};

export default Results;
