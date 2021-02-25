import './App.css';
import io from 'socket.io-client';
import { ListItem } from './ListItem.js';
import { TicBoard } from './Board.js';
import { Login } from './Login.js';
import { useState, useRef, useEffect } from 'react';

export const socket = io(); // Connects to socket connection

function App() {
  
    return (
    <div>
      <Login />
    </div>
      );
}

export default App;