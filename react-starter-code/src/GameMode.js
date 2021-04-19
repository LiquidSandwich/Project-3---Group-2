import './GameMode.css';
import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';

import Login from './Login';
import Settings from './Settings';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Fills clientID variable with API ID key
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const BASE_URL = '/api/v1/new';

function GameMode(props) {
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modeSet, setModeSet] = useState(false);

  const firstName = props.userData.name.split(' ')[0];

  // // Code that sets login status to false when button is clicked
  const onSuccess = () => {
    setIsLoggedIn(!isLoggedIn);
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

  return (
    <div>
      {isLoggedIn ? (
        modeSet ? <Settings /> : (
          <div className="display">
            <div className="logout">
              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Log out"
                onLogoutSuccess={onSuccess}
              />
            </div>
            <div>
              <h1>
                Welcome Back,
                {' '}
                {firstName}
                !
                <br />
                <br />
              </h1>
              <h2 id="teamname">
                nogginy
              </h2>

              <button className="button" onClick={() => gameModeHandler('single')}>Single</button>

            </div>
          </div>
        )
      ) : <Login />}
    </div>
  );
}

export default GameMode;
