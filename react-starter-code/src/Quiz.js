// import './Options.css';
import Login from './Login.js';
import { GoogleLogout } from 'react-google-login';
import { useState, useEffect } from 'react';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Fills clientID variable with API ID key
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const BASE_URL = '/api/v1/new';

function Quiz(props) {
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // // Code that sets login status to false when button is clicked
  const onSuccess = (res) => {
    setIsLoggedIn(!isLoggedIn);
  };
  
    return ( 
      <div>
      {isLoggedIn ? (
        <div className="display">
            <div className="logout">
              <GoogleLogout 
                className = "logout"
                clientId={CLIENT_ID}
                buttonText="Log out"
                onLogoutSuccess={onSuccess}
              ></GoogleLogout>    
            </div>
            <div className="main">
              <h1>Quiz goes here.</h1>
            </div>
        </div>
        ) : <Login />
    }
    </div>);
} 
export default Quiz;
