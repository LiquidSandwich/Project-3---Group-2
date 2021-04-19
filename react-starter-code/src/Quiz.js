// import './Options.css';
import Login from './Login.js';
import { GoogleLogout } from 'react-google-login';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Results from './Results.js';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Fills clientID variable with API ID key
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
const BASE_URL = '/api/v1/new';

export function Quiz(props) {
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { game } = props;
  const answerStats = [false, false, false, false, false, false, false, false, false, false];

  // // Code that sets login status to false when button is clicked
  const onSuccess = (res) => {
    setIsLoggedIn(!isLoggedIn);
  };
  
  const handleAnswerChoiceClick = (answer) => {
    if (answer == game['questions'][currentQuestion]['correct_answer']) {
      answerStats[currentQuestion] = true;
      
    }
    setCurrentQuestion(currentQuestion + 1);
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
            { currentQuestion < 10 ? (
            <div className="main">
              <div className='question_number'>
							  <span>Question {currentQuestion + 1}</span>/{10}
						  </div>
						  <div className="question_text">
						    {game['questions'][currentQuestion]['question']}
						  </div>
						  <div className="answer_choices">
						    {game['questions'][currentQuestion]['choices'].map(answerChoice => (
						    <button onClick={() => handleAnswerChoiceClick(answerChoice)}>{answerChoice}</button>
						    ))}
						  </div>
            </div>) : <Results/>}
        </div>
        ) : <Login />
      }
    </div>);
} 

Quiz.propTypes = {
  game: PropTypes.any.isRequired
};

export default Quiz;
