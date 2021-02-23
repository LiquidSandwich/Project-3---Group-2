import './App.css';
import { ListItem } from './ListItem.js';
import { TicBoard } from './Board.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function App() {

  return (
    <div>
      <TicBoard />
    </div>
  );
}

export default App;