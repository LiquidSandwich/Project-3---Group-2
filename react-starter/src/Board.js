import { socket } from './App.js'
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { Square } from './Square.js';
import io from 'socket.io-client';

export function TicBoard(props) {
    
    const [board, setBoard] = useState([]);
    const [count, setCount] = useState(0);
    
    function ClickMe(i) {
        if (count % 2 == 0) {
            board[i]='X';
        }
        else {
            board[i]='O';
        }
        setCount(count => count+1);
        socket.emit('match',board);
        }
    
    useEffect(() => {
        socket.on('match', (data) => {
            setBoard(board=>[...data]);
            setCount(count => count+1);
        });
    }, []);
    
    return (
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
    );
}