import './Login.css';
import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import Options from './Options';

const dotenv = require('dotenv');
dotenv.config();

const clientID = process.env.REACT_APP_GOOGLE_ID;

function Login() {
  const [status, setStatus] = useState(true);
  
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    const data = res.profileObj;
    console.log('Name of user:', data['name']);
    console.log('Image of user:', data['imageUrl']);
    setStatus(!status);
    
  };
  
  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };
  
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
