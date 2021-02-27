import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import { Square } from './Square.js';
import io from 'socket.io-client';


export function TicBoard(props) {
    
    const [board, setBoard] = useState(Array(9).fill(null));
    const [count, setCount] = useState(0);
    const [turn, setTurn] = useState(true);
    const [player, setPlayer] = useState([]);
    const [game, setGame] = useState(true);
    
    function ClickMe(i) {
        
        if (player[0] == true && board[i] != 'O' && board[i] != 'X') {
            if (count % 2 == 0 && turn == true) {
                board[i]='X';
                setCount(count => count+1);
                setTurn(false);
                setBoard(board=>[...board]);
                socket.emit('click', board);
            }
            calculateWinner(board);
        }
        
        if (player[1] == true && board[i] != 'O' && board[i] != 'X') {    
              if (count % 2 == 1 && turn == true){
                board[i]='O';
                setCount(count => count+1);
                setTurn(false);
                setBoard(board=>[...board]);
                socket.emit('click', board);
            }
            calculateWinner(board);
          }
    }
    
    
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
    
    function restartGame() {
        
        if (player[0] == true) {
            player[0] = false;
            socket.emit("reset");
        }
        if (player[1] == true) {
            player[1] = false;
            socket.emit("reset");
        }
    }
    
    useEffect(() => {
        socket.on('click', (data) => {
            if(turn == true) {
                setBoard(board=>[...data]);
                setCount(count => count+1);
                setTurn(true);
            }
            else {
                setBoard(board=>[...data]);
                setCount(count => count+1);
                setTurn(true);
            }
        });
    }, []);
    
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
        });
    }, []);
    
    useEffect(() => {
        socket.on('outcome', (data) => {
          const outcome = data;
          setGame(false);
          alert(outcome);
        });
    }, []);
    
    useEffect(() => {
        socket.on('reset', (data) => {
            setBoard(board=>[Array(9).fill(null)]);
            setCount(0);
            setTurn(true);
            setGame(true);
            setPlayer(player => [...player, player[0]=true]);
            setPlayer(player => [...player, player[1]=true]);
            alert("Both players have reset the game!!!")
            alert(player[0]);
            alert(player[1]);
        });
    }, []);
    
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
