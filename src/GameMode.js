import './GameMode.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';
import { useSpring, animated } from 'react-spring';
import Settings from './Settings';
import Custom from './Custom';

import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Fills clientID variable with API ID key
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const BASE_URL = '/api/v1/new';

function GameMode(props) {
  const [modeSet, setModeSet] = useState(false);
  const [custom, setCustom] = useState(false);
  const { userData, isLogged, playerType } = props;
  const { email } = userData;
  const springprops = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    delay: 400,
  });

  const firstName = userData.name.split(' ')[0];

  // // Code that sets login status to false when button is clicked
  const onSuccess = () => {
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
    isLogged();
  };

  const gameModeHandler = (mode) => {
    const data = JSON.stringify({
      mode,
    });
    const url = `${BASE_URL}/mode`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }).then((response) => {
      console.log(response);
    });
  };

  const colorHandler = (color) => {
    const data = JSON.stringify({
      color,
    });
    fetch('/api/v1/player/color', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => response.json());
    isLogged();
  };

  const onToggle = () => {
    setCustom(!custom);
  };

  useEffect(() => {
    socket.on('modeSet', () => {
      setModeSet(!modeSet);
    });
  }, []);

  return (
    <animated.div style={springprops}>
      <div>
        {custom ? (
          <Custom custom={onToggle} />
        ) : (
          <div>
            {modeSet ? (
              <Settings userData={userData} isLogged={isLogged} playerType={playerType} />
            ) : (
              <div className="display">
                <div className="logout">
                  <GoogleLogout clientId={CLIENT_ID} buttonText="Log out" onLogoutSuccess={onSuccess} />
                </div>
                <button type="button" className="settings" onClick={onToggle}>
                  {' '}
                  <i className="fas fa-cog">{' '}</i>
                </button>
                <animated.div style={springprops}>
                  <div>
                    <h1>
                      Welcome,
                      {' '}
                      {firstName}
                      !
                      <br />
                      <br />
                    </h1>
                    <h2 id="teamname">nogginy</h2>
                    <div className="colors">
                      <button type="button" className="color mint" onClick={() => colorHandler('mint')}>white</button>
                      <button type="button" className="color red" onClick={() => colorHandler('red')}>red</button>
                      <button type="button" className="color blue" onClick={() => colorHandler('blue')}>blue</button>
                      <button type="button" className="color yellow" onClick={() => colorHandler('yellow')}>yellow</button>
                      <button type="button" className="color pink" onClick={() => colorHandler('pink')}> pink </button>
                    </div>
                    { playerType === 'host' ? (
                      <div>
                        <button type="button" className="button" onClick={() => gameModeHandler('single')}>
                          Single
                        </button>
                        <button type="button" className="button" onClick={() => gameModeHandler('multiplayer')}>
                          Multiplayer
                        </button>
                      </div>
                    ) : (
                      <div> Waiting for Game to start... </div>
                    )}
                  </div>
                </animated.div>
              </div>
            )}
          </div>
        )}
      </div>
    </animated.div>
  );
}

GameMode.propTypes = {
  userData: PropTypes.objectOf.isRequired,
  isLogged: PropTypes.func.isRequired,
  playerType: PropTypes.string.isRequired,
};

export default GameMode;
