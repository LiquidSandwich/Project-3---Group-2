
export function Results(props) {
    const { answerStats } = props;
    console.log("RESULTS "+ answerStats)
    const handleStats = (answer) => {
        if(answer == true) {
            <div> TRUE </div>
        } else {
            <div> FALSE </div>
        }
    }
    return (
        <div className="stats">
            <div className="answer_results">
				{answerStats.map((answerChoice, index) => (
				<div> {index+1}. {answerChoice} </div>
				))}
			</div>
        </div>
    );
}

export default Results;
