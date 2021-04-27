import './Login.css';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import GameMode from './GameMode';
// import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// const BASE_URL = '/api/v1/new';

// Component that handles Login
function Login() {
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({ name: '', img: '' });
  const [playerType, setPlayerType] = useState('');

  const isLogged = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // If the user logs in, the below code executes
  const onSuccess = (res) => {
    /* eslint-disable no-console */
    console.log('[Login Success]');
    const data = res.profileObj;
    const { email } = data;
    const { name } = data;
    const { imageUrl } = data;
    isLogged();
    setUserData({ name, img: imageUrl });
    // socket.emit('login', [email, name, imageUrl]);
    const loginData = JSON.stringify({
      email,
      name,
      imageUrl,
    });
    const url = '/api/v1/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: loginData,
    }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        console.log(responseData.playerType);
        if (responseData.status === 200) {
          setPlayerType(responseData.playerType);
        }
      });
  };

  // useEffect(() => {
  //   socket.on('login', (userType) => {
  //     setPlayerType(userType);
  //   });
  // }, []);

  // If the user fails to login, the below code executes
  const onFailure = () => {
    console.log('[Login Failed]');
  };

  /*
  Shows starting page of webapp.
  Once user logs in with their Google Account,
  user will than be taken to the GameMode Component.
  */
  return (
    <div>
      {isLoggedIn ? (
        <h1>
          nogginy
          <h2>trivia and chat with friends</h2>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Log in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
          />
        </h1>
      ) : (
        <GameMode userData={userData} isLogged={isLogged} playerType={playerType} />
      )}
    </div>
  );
}

export default Login;
