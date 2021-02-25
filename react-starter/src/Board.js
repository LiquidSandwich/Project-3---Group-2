import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { socket, ctr } from './App.js';
import { Square } from './Square.js';
import io from 'socket.io-client';

export function TicBoard() {
    
    const [board, setBoard] = useState([board => [...board]]);
    const [count, setCount] = useState(0);
    
    function ClickMe(i) {
        if (count % 2 == 0) {
            board[i]='X';
        }
        else {
            board[i]='O';
        }
        setBoard(board=>[...board]);
        setCount(count => count+1);
        socket.emit('match', board);
    }
    
    useEffect(() => {
        socket.on('match', (data) => {
            setBoard(board=>[...data]);
            setCount(count => count+1);
        });
    }, []);
    
    if (ctr == 0 || ctr == 1) {
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
    else {
        return(
        <div>
            <Square  val={board[0]}/>
            <Square  val={board[1]}/>
            <Square  val={board[2]}/>
            <Square  val={board[3]}/>
            <Square  val={board[4]}/>
            <Square  val={board[5]}/>
            <Square  val={board[6]}/>
            <Square  val={board[7]}/>
            <Square  val={board[8]}/>
        </div>
        );
    }
}
