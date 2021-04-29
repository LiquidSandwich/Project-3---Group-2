import './Chat.css';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

function Chat(props) {
  const [chatMessages, setMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const chatInput = useRef(null);
  const { userName } = props;

  const onEnterMessage = () => {
    if (chatInput != null) {
      const message = chatInput.current.value;
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit('message_logged', { message });
    }
  };

  useEffect(() => {
    socket.on('message_logged', (data) => {
      console.log('message logged');
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setPlayers(data.usernames);
    });
  });

  return (
    <div>
      <div className="messages">
        <h6>Game Messages</h6>
        <ul>
          {chatMessages.map((item) => (
            <li>
              {userName}
              :
              {' '}
              { item }
            </li>
          ))}
        </ul>
      </div>
      <div className="playerlist">
        <h6>Players:</h6>
        <div>
          {players.map((player) => (
            <li>{ player }</li>
          ))}
        </div>
      </div>
      Enter message here:
      {' '}
      <input ref={chatInput} type="text" />
      <button onClick={onEnterMessage} type="submit">Send Message</button>
    </div>
  );
}

Chat.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Chat;
