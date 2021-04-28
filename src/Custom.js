import React from 'react';
import PropTypes from 'prop-types';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

// Component for user personalization
function Custom(props) {
  const onSuccess = () => {
    props.custom();
  };

  // Function for handling color changes
  const colorChanger = (event) => {
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

  return (
    <div>
      <button type="button" className="exit" onClick={onSuccess}>
        <img src="https://www.freeiconspng.com/uploads/white-curved-arrow-transparent-11.png" width="70" height="50" alt="submit" />
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
      </div>
    </div>
  );
}

Custom.propTypes = {
  custom: PropTypes.objectOf.isRequired,
};

export default Custom;
