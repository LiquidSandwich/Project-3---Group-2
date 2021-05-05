import './Chat.css';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Maps the messages
const Messages = (props) => props.data.map((m) => (m[0] !== '' ? (
  <li>
    <div className="innermsg">{m}</div>
  </li>
) : (<li className="update">{m[1]}</li>)));

function Chat(props) {
  // Sets the states and props
  const chatInput = useRef(null);
  const {
    chatMessages, players, userName, room,
  } = props;

  // Function that handles the entering of a message
  function onEnterMessage(message) {
    if (message != null) {
      console.log(chatMessages);
      console.log(players);
      console.log(userName);
      const chat = chatMessages;
      const newMessage = message;

      const today = new Date();

      let hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
      const amPM = today.getHours() >= 12 ? 'PM' : 'AM';
      hours = hours < 10 ? `0${hours}` : hours;
      const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
      const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
      const time = `${hours}:${minutes}:${seconds} ${amPM}`;

      chat.push(`${userName} : ${newMessage}`, `${time}`);
      socket.emit('message_logged', { chat, room });
    }
  }

  // Displays the chat
  // Chat updates when a user types and submits
  // Are local to each room
  return (
    <div>
      <section style={{ width: '15%', margin: 'auto' }}>
        <div className="messages">
          <h6>Game Messages</h6>
          <ul id="messages"><Messages data={chatMessages} /></ul>
        </div>
      </section>
      <section style={{ width: '10%', margin: 'auto' }}>
        <div className="playerlist">
          <h6>Players:</h6>
          <div>
            {players.map((player) => (
              <li>{ player }</li>
            ))}
          </div>
        </div>
      </section>
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
  room: PropTypes.string.isRequired,
};

export default Chat;
