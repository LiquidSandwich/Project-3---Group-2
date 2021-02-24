import './App.css';
import { TicBoard } from './Board.js';
import { Login } from './Login.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function App() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState(false);
  
  function handleToggleClick(){
    if (!status) {
      if (inputRef.current.value != "") {
        alert("Username entered:" + inputRef.current.value);
        setStatus(status => !status)
      }
      else {
        alert("Please enter a username");
      }
    }
    else {
      alert("See ya next time");
      setStatus(status => !status)
    }
  }
  
  function WarningBanner(props) {
    if (!props.warn) {
      return (
        <input ref={inputRef} type="text"/>
        );
    }
    
    return (
    <div> 
      <TicBoard /> 
    </div>
    );
    
  }
  
  return (
  <div>
    <WarningBanner warn={status} />
    <button onClick={handleToggleClick}> {status ? 'Logout' : 'Login'} </button>
  </div>
      );

}

export default App;