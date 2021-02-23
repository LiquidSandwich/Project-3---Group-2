import React from 'react'

export function Square(props) {
    return (
        <button onClick={props.index}>{props.val}</button>
        );
}