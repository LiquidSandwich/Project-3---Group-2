import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import Login from './Login';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Fills clientID variable with API ID key
const clientID = process.env.REACT_APP_GOOGLE_ID;

function Options() {
    
  const [status, setStatus] = useState(true);
  
  // If the user logs in, status is set to false
  // Sends user back to main page
  const onSuccess = (res) => {
    setStatus(!status);
  };
  
  return (
  <div>
  {status ? (
    <body>
        SUCCESSFUL TRANSFER<br/><br/>
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Log out"
            onLogoutSuccess={onSuccess}
        ></GoogleLogout>
    </body>
    ) : <Login />}
    </div>
  );
}

export default Options;