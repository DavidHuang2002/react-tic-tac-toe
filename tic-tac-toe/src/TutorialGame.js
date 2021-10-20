import React from "react";


// plan:
// Square: display the right player
// Board:
// track of state of each square
// 	pass on the state info to each square
// determine player
// check winner


function Square(props){
	return (<button className="square" 
					onClick={props.onClick}>
						{props.value}
					</button>);
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// use an array to track of squares, initialize with null
			squares: new Array(9).fill(null),
			// use a bool to det player
			isXNext: true,
		}
	}

	renderSquare(position) {
		return (<Square 
							value={this.state.squares[position]} 
							onClick={()=>{this.handleClick(position)}}/>);
	}

	handleClick(position) {
		const {squares, isXNext} = this.state;

		// if square has already been occupied/game won, return
		if 
		(squares[position]
			|| calcWinner(squares)
		) return;

		// get the player
		const player = isXNext? 'X': 'O';
		this.setState({isXNext: !isXNext})

		// change the squares array
		// notice： with const its still possible to change properties of 
		// an obj. but cannot reassign the var to a new obj.
		squares[position] = player;
		this.setState({squares: squares})
	}

	render() {
		const {squares, isXNext} = this.state;

		// check for winner each time its re-rendered
		const winner = calcWinner(squares);
		let status;
		if(winner)
		{
			status = `Winner: ${winner}`;
		}
		else
		{
			const player = isXNext? 'X': 'O';
			status = `Next player: ${player}`;
		}

		return (
			<div>
				<div className="status">{status}</div>
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
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
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