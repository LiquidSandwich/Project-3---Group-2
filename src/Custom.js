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

  function myFunction() {
    alert('Image could not be loaded.');
    const image = document.getElementsByClassName('Picture')[0];
    image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/200px-Question_mark_%28black%29.svg.png';
  }

  const handleClick = () => {
    document.getElementsByClassName('Picture')[0].onerror = function () { myFunction(); };
    const url = inputRef.current.value;
    if (url !== '' && url.length > 4) {
      const ending = url.substring(url.length - 3);
      if (ending === 'gif' || ending === 'jpg' || ending === 'png') {
        socket.emit('image_change', [url, userData.email]);
        userData.img = url;
        const image = document.getElementsByClassName('Picture')[0];
        image.src = url;
      } else {
        alert('URL is not valid. Must be of type specified and needs to be less than 255 characters.');
      }
    } else {
      alert('Input not long enough to be valid');
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
        *** Image must be of type .png, .jpg, .gif ***
        <br />
        <img src={userData.img} className="Picture" alt="Yo" width="300" height="300" onError="myFunction()" />
      </div>
    </div>
  );
}

Custom.propTypes = {
  custom: PropTypes.objectOf.isRequired,
  userData: PropTypes.objectOf.isRequired,
};

export default Custom;
