import PropTypes from 'prop-types';
import React, { useState } from 'react';
import GameMode from './GameMode';

export function Results(props) {
  const { answerStats, userData, isLogged } = props;
  const [restart, setRestart] = useState(true);

  const replay = () => {
    setRestart(!restart);
  };

  const exit = () => {
    const { email } = userData;
    const data = JSON.stringify({
      email,
    });
    fetch('/api/v1/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => response.json());
  };

  return (
    <div>
      {restart ? (
        <div className="stats">
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
          <button type="button" className="button" onClick={exit}>Exit</button>
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
