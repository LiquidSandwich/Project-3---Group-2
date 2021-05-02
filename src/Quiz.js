import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { Results } from './Results';
import { socket } from './Socket';
import Chat from './Chat';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

export function Quiz(props) {
  const [chatMessages, setMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [answerStats, setAnswerStats] = useState(new Array(10).fill('Incorrect'));
  const [showChat, setChat] = useState(false);
  const springprops = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  const {
    game,
    userData,
    isLogged,
    displayChatIcon,
    userName,
  } = props;

  const handleAnswerChoiceClick = (answer) => {
    const newAnswerStats = answerStats;
    if (answer === game.questions[currentQuestion].correct_answer) {
      setCorrectQuestions(correctQuestions + 1);
      newAnswerStats[currentQuestion] = 'Correct';
    }
    setAnswerStats(newAnswerStats);
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion >= 9) {
      socket.emit('leaderboard', { username: userData.name, correctQuestions });
      socket.emit('gameOver');
    }
  };

  const onToggleChat = () => {
    setChat(!showChat);
  };

  useEffect(() => {
    socket.on('message_logged', (data) => {
      console.log('message logged');
      console.log(chatMessages);
      setMessages(data.chat);
      setPlayers(data.usernames);
    });
  });

  return (
    <div>
      {currentQuestion < 10 ? (
        <animated.div style={springprops}>
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
        </animated.div>
      ) : (
        <Results
          answerStats={answerStats}
          userData={userData}
          isLogged={isLogged}
        />
      )}
      <div className="chat">
        { displayChatIcon ? (
          <button type="button" className="settings" onClick={onToggleChat}>
            {' '}
            <img src="https://images.vexels.com/media/users/3/136808/isolated/preview/d3455a22af5f3ed7565fb5fb71bb8d43-send-message-icon-by-vexels.png" width="40" height="40" alt="submit" />
          </button>
        ) : <div />}
        { showChat ? (
          <Chat chatMessages={chatMessages} players={players} userName={userName} />
        ) : (
          <button type="button" className="settings" onClick={onToggleChat}>
            {' '}
            <img src="https://images.vexels.com/media/users/3/136808/isolated/preview/d3455a22af5f3ed7565fb5fb71bb8d43-send-message-icon-by-vexels.png" width="40" height="40" alt="submit" />
          </button>
        )}
      </div>
    </div>
  );
}

Quiz.propTypes = {
  game: PropTypes.objectOf.isRequired,
  userData: PropTypes.objectOf.isRequired,
  isLogged: PropTypes.func.isRequired,
  displayChatIcon: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Quiz;
