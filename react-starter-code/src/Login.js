import './Login.css';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import io from 'socket.io-client';
import GameMode from './GameMode';

export const socket = io();

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Component that handles Login
function Login() {
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({ name: '', img: '' });

  // If the user logs in, the below code executes
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    const data = res.profileObj;
    const { email } = data;
    const { name } = data;
    const { imageUrl } = data;

    console.log('Email of user:', data.email);
    console.log('Name of user:', data.name);
    console.log('Image of user:', data.imageUrl);
    setIsLoggedIn(!isLoggedIn);
    setUserData({ name, img: imageUrl });
    socket.emit('login', [email, name, imageUrl]);
  };

  // If the user fails to login, the below code executes
  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
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
          <h2>
            trivia and chat with friends
          </h2>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Log in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
          />
        </h1>
      )
        : <GameMode userData={userData} />}
    </div>
  );
}

export default Login;
