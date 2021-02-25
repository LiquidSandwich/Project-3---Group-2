import './App.css';
import io from 'socket.io-client';
import { ListItem } from './ListItem.js';
import { TicBoard } from './Board.js';
import { useState, useRef, useEffect } from 'react';

export const socket = io(); // Connects to socket connection

export function getSocket(props) {
  return props.socket;
}

function App() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState(false);
  const [lst, setLst] = useState([]);
  const [userC, setUserC] = useState(0);
  
  function handleToggleClick(){
    if (!status) {
      if (inputRef.current.value != "") {
        
        setStatus(status => !status);
        
        if (userC == 0) {
          lst[userC] = "Player X: " + inputRef.current.value;
        }
        else if (userC == 1) {
          lst[userC] = "Player O: " + inputRef.current.value;
        }
        else if (userC == 2) {
          lst[userC] = "Spectator(s): " + inputRef.current.value;
        }
        else {
          lst[userC] = inputRef.current.value;
        }
        setLst(lst => [...lst]);
        setUserC(userC => userC+1);
        socket.emit('login', [lst, !status]);
      }
      else {
        alert("Please enter a username!!!");
      }
    }
    else {
      alert("See ya next time");
      setStatus(status => !status)
    }
  }
  
  useEffect(() => {
        socket.on('login', (data) => {
          if (data[1]) {
            setLst(lst => [...data[0]]);
            setUserC(userC => userC+1);
          }
        });
    }, []);
  
  function WarningBanner(props) {
    if (!props.warn) {
      return (<input ref={inputRef} type="text"/>);
    }
    return <div> <TicBoard /> </div>
  }

  
  return (
  <div>
    <WarningBanner warn={status} />
    <button onClick={handleToggleClick}> {status ? 'Logout' : 'Login'} </button>
    <ul> 
      {lst.map(item => <ListItem name={item} value={userC} />)}
    </ul>
  </div>
      );
}

export default App;