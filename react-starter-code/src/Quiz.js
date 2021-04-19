// import './Options.css';
import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import Login from './Login';
import { Results } from './Results';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Fills clientID variable with API ID key
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

export function Quiz(props) {
  // Boolean that tracks status on if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { game } = props;
  const { userData } = props;
  const [answerStats, setAnswerStats] = useState(new Array(10).fill('Incorrect'));

  // // Code that sets login status to false when button is clicked
  const onSuccess = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleAnswerChoiceClick = (answer) => {
    const newAnswerStats = answerStats;
    if (answer === game.questions[currentQuestion].correct_answer) {
      newAnswerStats[currentQuestion] = 'Correct';
    }
    setAnswerStats(newAnswerStats);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="display">
          <div className="logout">
            <GoogleLogout
              className="logout"
              clientId={CLIENT_ID}
              buttonText="Log out"
              onLogoutSuccess={onSuccess}
            />
          </div>
          {currentQuestion < 10 ? (
            <div className="main">
              <div className="question_number">
                <span>
                  Question
                  {currentQuestion + 1}
                </span>
                /
                {10}
              </div>
              <div className="question_text">{game.questions[currentQuestion].question}</div>
              <div className="answer_choices">
                {game.questions[currentQuestion].choices.map((answerChoice) => (
                  <button type="button" onClick={() => handleAnswerChoiceClick(answerChoice)}>
                    {answerChoice}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <Results answerStats={answerStats} userData={userData}/>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
export default Quiz;
