import './Options.css';
import Login from './Login';
import { GoogleLogout } from 'react-google-login';
import { useState, useEffect } from 'react';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Fills clientID variable with API ID key
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const BASE_URL = '/api/v1/new'

function Options(props) {
  
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);
  
  // Code that sets login status to false when button is clicked
  const onSuccess = (res) => {
    setIsLoggedIn(!isLoggedIn);
  };
  
  const firstName = props.userData.name.split(" ")[0];
  
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  }; 
  
  const difficultyHandler = (event) => {
    setDifficulty(event.target.value);
  }; 
  
  const handleOptions = () => {
    const data = JSON.stringify({
        'diffculty' : difficulty, 
        'category' : category
    });
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
  }

  
  return (
  <div>
    {isLoggedIn ? (
      <body>
        <h1>
          Welcome Back, {firstName}!<br/><br/>
        </h1>
        <h2 id="teamname">
          nogginy
        </h2>
        <h7>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Log out"
            onLogoutSuccess={onSuccess}
          ></GoogleLogout>
        </h7>

          <label for="trivia_difficulty">Choose a Category:</label>
          <select onChange={difficultyHandler} name="trivia_difficulty">
      			<option value="any">Any Difficulty</option>
      			<option value="easy">Easy</option>
      			<option value="medium">Medium</option>
      			<option value="hard">Hard</option>
      		</select>
          
          <label for="trivia_category">Choose a Category:</label>
  
          <select onChange={categoryHandler} name="trivia_category">
          	<option value="any">Any Category</option>
          	<option value="9">General Knowledge</option>
          	<option value="10">Entertainment: Books</option>
          	<option value="11">Entertainment: Film</option>
          	<option value="12">Entertainment: Music</option>
          	<option value="13">Entertainment: Musicals &amp; Theatres</option>
          	<option value="14">Entertainment: Television</option>
          	<option value="15">Entertainment: Video Games</option>
          	<option value="16">Entertainment: Board Games</option>
          	<option value="17">Science &amp; Nature</option>
          	<option value="18">Science: Computers</option>
          	<option value="19">Science: Mathematics</option>
          	<option value="20">Mythology</option>
          	<option value="21">Sports</option>
          	<option value="22">Geography</option>
          	<option value="23">History</option>
          	<option value="24">Politics</option>
          	<option value="25">Art</option>
          	<option value="26">Celebrities</option>
          	<option value="27">Animals</option>
          	<option value="28">Vehicles</option>
          	<option value="29">Entertainment: Comics</option>
          	<option value="30">Science: Gadgets</option>
          	<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          	<option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
          
          <button onClick={handleOptions}>Play Game</button>
        
      </body>
      
      ) : <Login />}
  </div>
  );
}

export default Options;