import './GameMode.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';
import Settings from './Settings';
import Custom from './Custom';

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

  const firstName = userData.name.split(' ')[0];

  // // Code that sets login status to false when button is clicked
  const onSuccess = () => {
    // setIsLoggedIn(!isLoggedIn);
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
    setModeSet(!modeSet);
  };

  const onToggle = () => {
    setCustom(!custom);
  };

  return (
    <div>
      {custom ? (
        <Custom custom={onToggle} />
      ) : (
        <div>
          {modeSet ? (
            <Settings userData={userData} isLogged={isLogged} />
          ) : (
          <div className="display">
            
              <div className="logout">
                <GoogleLogout clientId={CLIENT_ID} buttonText="Log out" onLogoutSuccess={onSuccess} />
              </div>
              
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
            </div>
          )}
        </div> 
      )}
  </div>
  );
}

GameMode.propTypes = {
  userData: PropTypes.objectOf.isRequired,
  isLogged: PropTypes.bool.isRequired,
  playerType: PropTypes.string.isRequired,
};

export default GameMode;
