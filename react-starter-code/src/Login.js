import './Login.css';
import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import Options from './Options';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Fills clientID variable with API ID key
const clientID = process.env.REACT_APP_GOOGLE_ID;

// Component that handles Login
function Login() {
  
  // Boolean that tracks status on if the user is logged in or not
  const [status, setStatus] = useState(true);
  
  // If the user logs in, the below code executes
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    const data = res.profileObj;
    console.log('Name of user:', data['name']);
    console.log('Image of user:', data['imageUrl']);
    setStatus(!status);
  };
  
  // If the user fails to login, the below code executes
  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };
  
  /* 
  Shows starting page of webapp.
  Once user logs in with their Google Account,
  user will than be taken to the Options Component.
  */
  return (
    <div>
    {status ? (
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
          cookiePolicy={'single_host_origin'}
        />
      </h1>
      ) : <Options />}
    </div>
  );
}

export default Login;
