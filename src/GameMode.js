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
// Fills base url with part of the REST API URL
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const BASE_URL = '/api/v1/new';

function GameMode(props) {
  // Sets states and props
  const [modeSet, setModeSet] = useState(false);
  const [custom, setCustom] = useState(false);
  const {
    userData,
    isLogged,
    playerType,
    room,
  } = props;
  const { email } = userData;
  const springprops = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    delay: 400,
  });
  const [displayChatIcon, setdisplayChat] = useState(false); // show chat only for multiplayer

  // Takes the username and splits it for the firstname
  const userName = userData.name;
  const firstName = userData.name.split(' ')[0];

  // Emits the leave event if a user refreshes/close the application
  window.onbeforeunload = () => {
    socket.emit('leave', { email, room });
  };

  // // Code that sets login status to false when button is clicked
  const onSuccess = () => {
    const data = JSON.stringify({
      email,
      room,
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

  // Function that handles the chat icon
  // Displays only in multiplayer
  const handleChat = () => {
    setdisplayChat(!displayChatIcon);
  };

  // Function that handles the type of gamemode
  const gameModeHandler = (mode) => {
    if (mode === 'multiplayer') {
      handleChat();
    }
    const data = JSON.stringify({
      mode,
      room,
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

  // Changes the color when one of the orbs are clicked on the main page
  const colorHandler = (color) => {
    document.body.className = `${color}`;
  };

  // Changes the state of custom when the settings button is clicked
  const onToggle = () => {
    setCustom(!custom);
  };

  // Effect that changes the state of the mode
  useEffect(() => {
    socket.on('modeSet', () => {
      setModeSet(!modeSet);
    });
  }, []);

  // Displays the main page for the application
  // Has Settings button, Single and Multiplayer buttons, and the logout button
  return (
    <animated.div style={springprops}>
      <div>
        {custom ? (
          <Custom custom={onToggle} userData={userData} room={room} />
        ) : (
          <div>
            {modeSet ? (
              <Settings
                userData={userData}
                isLogged={isLogged}
                playerType={playerType}
                displayChatIcon={displayChatIcon}
                userName={userName}
                room={room}
              />
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
                    </h1>
                    <h2 id="teamname">nogginy</h2>
                    <img src={userData.img} className="custom" alt="Pic" width="300" height="300" />
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
  room: PropTypes.string.isRequired,
};

export default GameMode;
