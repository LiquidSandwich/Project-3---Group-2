import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Results } from './Results';
import Chat from './Chat';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

export function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showChat, setChat] = useState(false);
  const {
    game,
    userData,
    isLogged,
  } = props;
  const [answerStats, setAnswerStats] = useState(new Array(10).fill('Incorrect'));

  const handleAnswerChoiceClick = (answer) => {
    const newAnswerStats = answerStats;
    if (answer === game.questions[currentQuestion].correct_answer) {
      newAnswerStats[currentQuestion] = 'Correct';
    }
    setAnswerStats(newAnswerStats);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleChat = () => {
    setChat(!showChat);
  };

  return (
    <div>
      <div>
        {currentQuestion < 10 ? (
          <div className="display">
            <div className="main">
              <div className="question_number">
                <span>
                  Question
                  {' '}
                  {' '}
                  {currentQuestion + 1}
                </span>
                /
                {10}
              </div>
              <div className="question_text">
                {game.questions[currentQuestion].question.replace(/&amp;/g, '&')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#039;/g, "'")
                  .replace(/&ldquo;/g, '"')
                  .replace(/&rdquo;/g, '"')}
              </div>
              <div className="answer_choices">
                {game.questions[currentQuestion].choices.map((answerChoice) => (
                  <button type="button" className="button" onClick={() => handleAnswerChoiceClick(answerChoice)}>
                    {answerChoice.replace(/&amp;/g, '&')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&quot;/g, '"')
                      .replace(/&#039;/g, "'")
                      .replace(/&ldquo;/g, '"')
                      .replace(/&rdquo;/g, '"')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Results
            answerStats={answerStats}
            userData={userData}
            isLogged={isLogged}
          />
        )}
      </div>
      <div className="chat">
        { showChat ? (
          <Chat chat={handleChat} />
        ) : (
          <button type="button" className="settings" onClick={handleChat}>
            {' '}
            <img src="https://www.freeiconspng.com/uploads/live-chat-icon-20.png" width="70" height="50" alt="submit" />
          </button>
        )}
      </div>
    </div>
  );
}

Quiz.propTypes = {
  game: PropTypes.objectOf.isRequired,
  userData: PropTypes.objectOf.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default Quiz;
