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
        
        setStatus(status => !status);
        
        lst[userC] = inputRef.current.value;
        setLst(lst => [...lst]);
        
        setUserC(userC => userC+1);
        
        socket.emit('login', [lst, userC]);
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
          setLst(lst => [...data[0]]);
          setUserC(userC => userC+1);
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