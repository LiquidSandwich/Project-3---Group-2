import './Chat.css';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();
const Messages = (props) => props.data.map((m) => (m[0] !== '' ? (
  <li>
    <div className="innermsg">{m}</div>
  </li>
) : (<li className="update">{m[1]}</li>)));

function Chat(props) {
  const chatInput = useRef(null);
  const { chatMessages, players, userName } = props;

  function onEnterMessage(message) {
    if (message != null) {
      console.log(chatMessages);
      console.log(players);
      const chat = chatMessages;
      const newMessage = message;
      chat.push(`${userName} : ${newMessage}`);
      socket.emit('message_logged', { chat });
    }
  }

  return (
    <div>
      <section style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="messages">
          <h6>Game Messages</h6>
          <ul id="messages"><Messages data={chatMessages} /></ul>
        </div>
      </section>
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
  chatMessages: PropTypes.arrayOf.isRequired,
  players: PropTypes.arrayOf.isRequired,
};

export default Chat;
