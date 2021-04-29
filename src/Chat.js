import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

function Chat(props) {
  const [chatMessages, setMessages] = useState([]);
  const chatInput = useRef(null);
  //   const [players, setPlayers] = useState([]);

  const onChat = () => {
    props.chat();
  };

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
    });
  });

  return (
    <div>
      <button type="button" className="chat" onClick={onChat}>
        {' '}
        <img src="https://www.freeiconspng.com/uploads/live-chat-icon-20.png" width="70" height="50" alt="submit" />
      </button>
      <div>
        <h6>Game Messages</h6>
        Enter message here:
        {' '}
        <input ref={chatInput} type="text" />
        <button type="button" onClick={onEnterMessage}>Send Message</button>
        <ul>
          {chatMessages.map((item) => (
            <li>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Chat.propTypes = {
  chat: PropTypes.objectOf.isRequired,
};

export default Chat;
