import React from 'react'
import './Board.css';

// Function that sets up each square for the tic tac toe board
export function Square(props) {
    return (
            <button disabled={props.turn} onClick={props.index}>{props.val}</button>
        );
}