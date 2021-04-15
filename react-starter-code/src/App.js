import './App.css';
import React from 'react';
import io from 'socket.io-client';
import Login from './Login';

function App() {
  
  return (
    <div>
      <Login className="display"/>
    </div>
  );
}

export default App;
