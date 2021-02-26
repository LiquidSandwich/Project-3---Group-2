import React from 'react'
import './Board.css';

export function Square(props) {
    return (
            <button disabled={props.turn} onClick={props.index}>{props.val}</button>
        );
}