import './Login.css';
import { useState, useRef, useEffect} from 'react';
import { TicBoard } from './Board.js';
import { ListItem } from './ListItem.js';
import { socket } from './App.js';
import io from 'socket.io-client';

// Function for logging in and displaying tic tac toe board
export function Login(props) {
  
  // Four variables
  // inputRef holds what the user will type in
  // status keeps tracks of user is allowed to see page (if user logged in)
  // lst keeps track of logged in users and their names
  const inputRef = useRef(null);
  const [status, setStatus] = useState(false);
  const [lst, setLst] = useState([]);
    
    // Handles the click of the login button
    /* If the user types in their username and click the login button,
       the code will emit both the login and updateList event. The status will be set
       to true so the user can see the tic tac toe board. If the user tries to login without a name,
       they will be alerted to enter a name.
       When they logout, they will be back to the previous login page.
    */
    function handleToggleClick(){
    if (status == false) {
      if (inputRef.current.value != "") {
        
        setStatus(!status);
        socket.emit('login', inputRef.current.value);
        socket.emit('updateList', inputRef.current.value);
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
  
  // Effect that executes when updateList is emitted
  // Checks user that logged in and displays the type of player they are
  // 1 and 2 are players X and O respectfully
  // Anyone one else is listed as a spectater
  useEffect(() => {
        socket.on('updateList', (data) => {
          const userName = data[0];
          if (data[1] == 1) {
            setLst(lst=>[...lst, "Player X: " + userName]);
          }
          else if (data[1] == 2) {
            setLst(lst=>[...lst, "Player O: " + userName]);
          }
          else {
            setLst(lst=>[...lst, "Spectater: " + userName]);
          }
          
        });
    }, []);
    
    
    // Gets user input and displays login button
    // Once there is a username and the user click login, the status changes to true
    // If status is true, the button then displays logout and the tic tac toe board + usernames are revealed
    return (
      <body>
        <h3>
          Enter Username here:
          <input ref={inputRef} type="text"/>
          <button onClick={handleToggleClick}> {status ? 'Logout' : 'Login'} </button>
        </h3>
      {status ? (
            <h2>
              <h1>Tic Tac Toe</h1>
              <div>
                <TicBoard />
                <ul>
                Users Online:
                  {lst.map(item => <ListItem name={item} />)}
                </ul>
              </div>
            </h2>
       ) : null}
      </body>
      );
 
}