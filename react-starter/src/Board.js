import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import { Square } from './Square.js';
import io from 'socket.io-client';


// Function for tic tac toe board
export function TicBoard(props) {
    
    // Variables for the board
    // board holds the index and values for the tic tac toe board
    // count keeps track of if an X or O should be placed
    // turn keeps track of turn count
    // game keeps track of if the restart button should show
    const [board, setBoard] = useState(Array(9).fill(null));
    const [count, setCount] = useState(0);
    const [turn, setTurn] = useState(true);
    const [player, setPlayer] = useState([]);
    const [game, setGame] = useState(true);
    
    
    // Function that runs when a tic tac toe cell has been clicked
    // Only Player X and Y have access to this function
    // As long as cell is not filled and its the right players turn, then the cell according to their playertype
    // After each move, calulate winner is run to see if someone won
    function ClickMe(i) {
        if (player[0] == true && board[i] != 'O' && board[i] != 'X') {
            if (count % 2 == 0 && turn == true) {
                board[i]='X';
                setCount(count => count+1);
                setTurn(false);
                socket.emit('click', board);
            }
            calculateWinner(board);
        }
        
        if (player[1] == true && board[i] != 'O' && board[i] != 'X') {    
              if (count % 2 == 1 && turn == true){
                board[i]='O';
                setCount(count => count+1);
                setTurn(false);
                socket.emit('click', board);
            }
            calculateWinner(board);
          }
    }
    
    // Calculates winner of Tic Tac Toe
    function calculateWinner(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                socket.emit("outcome", [true, board[a]]);
            }
        }
        if (count == 8) {
            socket.emit("outcome", [false, count]);
        }
        
    }
    
    // Function that runs if the restart button is clicked.
    // Only Player X and Y can click it
    // Emits reset effect to reset board
    function restartGame() {
        
        if (player[0] == true || player[1] == true) {
            socket.emit("reset");
        }

    }
    
    // Effect that activates when the tic tac toe board is clicked
    // As long as it is the players turn, update the board and their turn status
    useEffect(() => {
        socket.on('click', (data) => {
            if(turn == true) {
                setBoard(board=>[...data]);
                setCount(count => count+1);
                setTurn(true);
            }
        });
    }, []);
    
    
    // Effect the activates when a user logs in
    // Checks to see what type of player they are
    // If they are X or Y, then change player to true
    // Else, they are a spectater and false
    useEffect(() => {
        socket.on('login', (data) => {
            const ctr = data[2];
            const userName = data[1];
            const templst = data[0];
            const playerType = templst[ctr][userName];
            if (playerType == "X" || playerType == "O"){
                player[ctr] = true;
                setPlayer(player=>[...player]);
            }
            else {
                player[ctr] = false;
                setPlayer(player=>[...player]);
            }
        });
    }, []);
    
    // Effect that activates when the outcome has been determined
    // Sets game to false and alerts to all users the outcome of the game
    useEffect(() => {
        socket.on('outcome', (data) => {
          const outcome = data;
          setGame(false);
          alert(outcome);
        });
    }, []);
    
    
    // Effect that activates when either Player X or O clicks the restart button
    // Sets the board back to a blank slate and alerts every user that the game has reset
    useEffect(() => {
        socket.on('reset', (data) => {
            setBoard(board=>[board[0,1,2,3,4,5,6,7,8]='']);
            setCount(0);
            setTurn(true);
            setGame(true);
            setPlayer(player=>[...player]);
            alert("Game has been reset!!!")
        });
    }, []);
    
    // Returns the tic tac toe board and if game is false, then the restart button is shown
    return (
    <div>
        <div>
            <Square index={()=>ClickMe(0)} val={board[0]}/>
            <Square index={()=>ClickMe(1)} val={board[1]}/>
            <Square index={()=>ClickMe(2)} val={board[2]}/>
            <Square index={()=>ClickMe(3)} val={board[3]}/>
            <Square index={()=>ClickMe(4)} val={board[4]}/>
            <Square index={()=>ClickMe(5)} val={board[5]}/>
            <Square index={()=>ClickMe(6)} val={board[6]}/>
            <Square index={()=>ClickMe(7)} val={board[7]}/>
            <Square index={()=>ClickMe(8)} val={board[8]}/>
        </div>
        <div>{game ? (
            <div> 
            </div>
            ) : <button onClick={()=>restartGame()}> Restart </button> }
        </div>
    </div>
    );
}
