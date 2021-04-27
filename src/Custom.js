import React, { useState } from 'react';
import { socket } from './Socket';

// These two lines load environmental variables from .env
const dotenv = require('dotenv');

dotenv.config();

function Custom(props) {
  
  const onSuccess = () => {
    props.custom();
  };
  
  return (
    <div>
      <button type="button" className="exit" onClick={onSuccess}> 
      <img src="https://www.freeiconspng.com/uploads/white-curved-arrow-transparent-11.png" width="70" height="50" alt="submit" /> 
      </button>
      YOOOOOOO
    </div>
    )
}

export default Custom;
