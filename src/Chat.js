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

  function onEnterMessage(message) {
    if (message != null) {
      console.log(chatMessages);
      console.log(players);
      const chat = chatMessages;
      const newMessage = message;
      chat.push(`${userName} : ${newMessage}`);
      setMessages(chat);
      socket.emit('message_logged', { chat });
    }
  }

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
      <div className="messages">
        <h6>Game Messages</h6>
        <ul>
          {chatMessages.map((item) => (
            <li>
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
      <button onClick={() => onEnterMessage(chatInput.current.value)} type="button">Send Message</button>
    </div>
  );
}

Chat.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Chat;
