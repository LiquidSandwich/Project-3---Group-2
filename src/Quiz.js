import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { Results } from './Results';
import { socket } from './Socket';
import Chat from './Chat';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

export function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let correctQuestions = 0;

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
  const [answerStats, setAnswerStats] = useState(new Array(10).fill('Incorrect'));
  const [showChat, setChat] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAnswerChoiceClick = (answer) => {
    let i;
    for (i = 0; i < game.questions[currentQuestion].choices.length; i += 1) {
      document.getElementsByClassName('button')[i].disabled = true;
    }

    const newAnswerStats = answerStats;
    const a = game.questions[currentQuestion].correct_answer;

    const index = game.questions[currentQuestion].choices.indexOf(a);
    const color = document.body.style.backgroundColor;
    document.getElementsByClassName('button')[index].style.backgroundColor = '#00FF00';

    if (answer === game.questions[currentQuestion].correct_answer) {
      newAnswerStats[currentQuestion] = 'Correct';
    }

    sleep(2000).then(() => { setAnswerStats(newAnswerStats); });
    sleep(2000).then(() => { setCurrentQuestion(currentQuestion + 1); });

    if (currentQuestion >= 9) {
      sleep(1200).then(() => {
        for (i = 0; i < game.questions[currentQuestion].choices.length; i += 1) {
          document.getElementsByClassName('button')[i].disabled = false;
          document.getElementsByClassName('button')[i].style.backgroundColor = color;
        }
      });
      sleep(1500).then(() => {
        setAnswerStats(newAnswerStats);
        setCurrentQuestion(currentQuestion + 1);
        for (i = 0; i < 10; i += 1) {
          if (newAnswerStats[i] === 'Correct') {
            correctQuestions += 1;
          }
        }
        socket.emit('leaderboard', { username: userData.name, correctQuestions });
        socket.emit('gameOver');
      });
    } else {
      sleep(1200).then(() => {
        for (i = 0; i < game.questions[currentQuestion].choices.length; i += 1) {
          document.getElementsByClassName('button')[i].disabled = false;
          document.getElementsByClassName('button')[i].style.backgroundColor = color;
        }
      });
    }
  };

  const onToggleChat = () => {
    setChat(!showChat);
  };

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
          <Chat userName={userName} />
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
