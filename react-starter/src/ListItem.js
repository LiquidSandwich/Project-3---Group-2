import { useState, useRef, useEffect } from 'react';

// Function that lists items, used for listing the users in the game
export function ListItem(props){

    return <li>
        {props.name}
    </li>
}