import './Login.css';
import { useState, useRef, useEffect} from 'react';
import { TicBoard } from './Board.js';
import { ListItem } from './ListItem.js';
import { socket } from './App.js';
import io from 'socket.io-client';


export function Login(props) {
    
  const inputRef = useRef(null);
  const [status, setStatus] = useState(false);
  const [lst, setLst] = useState([]);
  const [userC, setUserC] = useState(0);
    
    
    function handleToggleClick(){
    if (!status) {
      if (inputRef.current.value != "") {
        
        setStatus(!status);
        if (userC == 0) {
          lst[userC] = "Player X: " + inputRef.current.value;
          setLst(lst => [...lst]);
          setUserC(userC => userC+1);
        }
        else if (userC == 1) {
          lst[userC] = "Player O: " + inputRef.current.value;
          setLst(lst => [...lst]);
          setUserC(userC => userC+1);
        }
        else {
          lst[userC] = "Spectater: " + inputRef.current.value;
          setLst(lst => [...lst]);
          setUserC(userC => userC+1);
        }
        socket.emit('login', inputRef.current.value);
        socket.emit('updateList', lst[userC]);
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
        socket.on('updateList', (data) => {
          const userName = data;
          setLst(lst=>[...lst, userName]);
          setUserC(userC => userC+1);
          
        });
    }, []);
    
    return (
    <span>
    <input ref={inputRef} type="text"/>
    <button onClick={handleToggleClick}> {status ? 'Logout' : 'Login'} </button>
    {status ? (
          <div>
            <div>
              <TicBoard />
              <ul> 
                {lst.map(item => <ListItem name={item} value={userC} />)}
              </ul>
            </div>
          </div>
      ) : null}
    </span>
      );
 
}