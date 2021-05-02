import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Component for user personalization
function Custom(props) {
  const inputRef = useRef(null);
  const { userData } = props;

  const onSuccess = () => {
    props.custom();
  };

  // Function for handling color changes
  const colorChanger = (event) => {
    console.log(userData);
    if (event.target.value === 'Light Blue') {
      document.body.style.backgroundColor = '#31a9e2';
    } else {
      document.body.style.backgroundColor = event.target.value;
    }
  };

  // Function for handling font style changes
  const fontChanger = (event) => {
    if (event.target.value === 'Default') {
      document.body.style.fontFamily = 'Catamaran';
    } else {
      document.body.style.fontFamily = event.target.value;
    }
  };

  const handleClick = () => {
    if (inputRef.current.value !== '') {
      socket.emit('image_change', [inputRef.current.value, userData.email]);
    }
  };

  return (
    <div>
      <button type="button" className="settings exit" onClick={onSuccess}>
        {' '}
        <i className="fas fa-arrow-circle-left">{' '}</i>
      </button>
      <div>
        Select Color:
        {' '}
        {' '}
        <select onChange={colorChanger} name="trivia_category">
          <option selected="selected">Choose</option>
          <option value="Light Blue">Light Blue</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Orange">Orange</option>
          <option value="Purple">Purlple</option>
          <option value="Indigo">Indigo</option>
          <option value="Pink">Pink</option>
        </select>

        <br />
        <br />
        Select Font:
        {' '}
        {' '}
        <select onChange={fontChanger} name="trivia_category">
          <option selected="selected">Choose</option>
          <option value="Default">Default</option>
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
          <option value="system-ui">System-ui</option>
        </select>

        <br />
        <br />
        Change Avatar:
        {' '}
        {' '}
        <input ref={inputRef} aria-label="textbox" type="text" />
        {' '}
        {' '}
        <button type="button" onClick={handleClick}> Change </button>
        <br />
        <br />
        (To change your avatar, please copy and paste the url of the image)
        <br />
        <br />
        <img src={userData.img} alt="Yo" />
      </div>
    </div>
  );
}

Custom.propTypes = {
  custom: PropTypes.objectOf.isRequired,
  userData: PropTypes.objectOf.isRequired,
};

export default Custom;
