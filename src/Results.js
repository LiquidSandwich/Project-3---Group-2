import './Results.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import GameMode from './GameMode';
import Login from './Login';

export function Results(props) {
  const {
    answerStats,
    userData,
    isLogged,
  } = props;

  const { email } = userData;

  const [restart, setRestart] = useState(true);
  const [exit, setExit] = useState(false);
  const [playerType, setPlayerType] = useState('');

  const replay = () => {
    fetch(`/api/v1/player?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()).then((responseData) => {
        console.log('HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
        console.log(responseData);
        setPlayerType(responseData.player_type);
      });
    setRestart(!restart);
  };

  const exitHandler = () => {
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
      .then((response) => response.json())
      .then(setExit(!exit));
  };

  return (
    <div>
      { restart ? (
        exit ? (
          <Login />
        ) : (
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
            <button type="button" className="button" onClick={exitHandler}>Exit</button>
          </div>
        )
      ) : (<GameMode userData={userData} isLogged={isLogged} playerType={playerType} />
      )}
    </div>
  );
}

Results.propTypes = {
  userData: PropTypes.objectOf.isRequired,
  isLogged: PropTypes.bool.isRequired,
  answerStats: PropTypes.arrayOf.isRequired,
};

export default Results;
