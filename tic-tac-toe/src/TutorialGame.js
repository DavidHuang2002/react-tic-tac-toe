import React from "react";


// plan:
// lifting the state into game
	// pass necessary infos via props
	// lift handle click

// add history, replace squares with current most history
	// use step to display history
	// calc the next player based on the step
// display history, with each step name
// go back to history
	// change the step to go back

// controlled component 
function Square(props){
	return (<button className="square" 
					onClick={props.onClick}>
						{props.value}
					</button>);
}

class Board extends React.Component {
	renderSquare(position) {
		return (<Square 
							value={this.props.squares[position]} 
							onClick={()=>{this.props.onClick(position)}}/>);
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			// track of history
			history: [Array(9).fill(null),],

			// we can deduce the player from the step number
			step: 0,

		};
	}

	// helper function for getting player based on the step
	getPlayer = () => (this.state.step % 2 === 0)? 'X': 'O';

	// TODO the tutorial didn't use arrow function but still works, emmm... weird
	// each click -> step ++, new array added to history
	handleClick = (position) => {
		const {history, step} = this.state;
		
		// determine player
		const player = this.getPlayer();

		// make sure we dont mutate the state!
		const squares = history[step].slice();
		// if square has already been occupied/game won, return
		if (squares[position]
			|| calcWinner(squares)
		) return;

		// change the squares array
		// notice： with const its still possible to change properties of 
		// an obj. but cannot reassign the var to a new obj.
		squares[position] = player;

		// add the squares to history, step + 1
		this.setState({
			history: history.slice(0, step+1).concat([squares]),
			step: step+1,
		});
	};

	renderHistory(){
		const moveHistory = this.state.history.map(
			(_, step) => {
				let styling, text;
				if (step===0) {
					styling = {listStyleType: "none"};
					text = "Go to game start";
				} else {
					styling = null;
					text = `Go to step ${step}`
				}

				return (
				<li key={step} style={styling}>
					<button  onClick={()=>this.jumpTo(step)}> 
						{text}
					</button>
				</li>);
			}
		)

		return moveHistory;
	}

	jumpTo(stepTo) {
		// change the step
		console.log('clicked');
		this.setState({step: stepTo});
	}

	render() {
		console.log(this.state.step);
		const {history, step} = this.state;
		const squares = history[step];

		// determine player
		const player = this.getPlayer();

		// check for winner each time its re-rendered
		const winner = calcWinner(squares);
		let status;
		if(winner)
		{
			status = `Winner: ${winner}`;
		}
		else
		{
			status = `Next player: ${player}`;
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board 
					onClick={this.handleClick} 
					squares={squares}/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol start={0}>{this.renderHistory()}</ol>
				</div>
			</div>
		);
	}
}

// helper function, returns the winner of the game
// using helper function to keeps the code within the class minimal
function calcWinner(squares){

	const WINCASES = [
		[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
	];

	for(let winCase of WINCASES) {
		// each winCase is an array of three position that lines up in a line
		const [pos1, pos2, pos3] = winCase;

		if(
			squares[pos1] // checking if square at position 1 has been occupied(i.e. not null)
			&& (squares[pos1]===squares[pos2]) // checking if all 3 positions in a line have equal values
			&& (squares[pos1]===squares[pos3])
		)
		{
			// get and return the winner 
			return squares[pos1];
		}
	}

	// no winner yet
	return null;
}

export default Game;