import GameMode from './GameMode.js';
import React, { useState } from 'react';

export function Results(props) {
    const { answerStats } = props;
    const { userData } = props;
    const [restart, setRestart] = useState(true);
    
    console.log("RESULTS "+ answerStats)
    const handleStats = (answer) => {
        if(answer == true) {
            <div> TRUE </div>
        } else {
            <div> FALSE </div>
        }
    }
    
    const replay = () => {
        setRestart(!restart);
    }
    
    return (
        <div>
        {restart ? (
            <div className="stats">
                <div className="answer_results">
    				{answerStats.map((answerChoice, index) => (
    				<div> {index+1}. {answerChoice} </div>
    				))}
    			</div>
    			<button className="button" onClick={()=>replay()}>Replay</button>
            </div>
            ) :
            <GameMode userData={userData}/>}
        </div>
    );
}

export default Results;
