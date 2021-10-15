import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO
// record which player clicking ok
// display o/x based on player ok

// plan -
// detect if any player has won
    // track & check board status at each click
        // 8 possible ways to win
// allowing to play again by clearing the board
// prevent player from clicking a clicked square


class Square extends React.Component {
	constructor(props) {
		// a subclass's constructor should always has a call to super 
		// all react components constructor should call super(props)
		super(props);
		this.state = {value: null};
	}

  handleClick = () => {
    // each click: 1.update boardStatus, 2. display right symbol, 3.check winning cond. 4. if win do something
    // 5:2 needs players info to be past here from board
    // 1, 5 done on Board by updateBoard
    // 3, 4 done on Board by checkWinning
    
    const {position, boardUpdater} = this.props;
    
    this.setState({value: boardUpdater(position)});

  };

	render() {
		return (
		// like here in the onClick, for the event handler in react, 
		// its a good practice to use arrow func to avoid problems with closure
			<button className="square" onClick={this.handleClick}>
				{this.state.value}
			</button>
		);
	}
  }
  
  class Board extends React.Component {
    initialState = {
        player: 'X',
        boardStatus: {
          X: new Set(),
          O: new Set()
        }
    };

		state = this.initialState;

    checkWinning = () => {
      
    };
    
    // helper func - return the player that wins or null
    getWinner = ()=>{
      const WINNINGCASES = [
        // columns
        new Set([0, 3, 6, ]),
        new Set([1, 4, 7, ]),
        new Set([2, 5, 8, ]),

        // rows
        new Set([0, 1, 2, ]),
        new Set([3, 4, 5, ]),
        new Set([6, 7, 8, ]),

        // diagonal
        new Set([0, 4, 8, ]),
        new Set([2, 4, 6, ])
      ]

      
    }

    // called by handleClick in Square
    // What it does: 1.update boardStatus 5. return the current player 
    boardUpdater = (i)=>{
      const playerNow = this.state.player;
      switch (playerNow){
        case 'X':
          this.setState({player: 'O'});
          // the arg to setState can also be a func thats in this form: (state, props) => stateChange
          this.setState((state)=>{
            state.boardStatus.X.add(i);
            return state.boardStatus;
          });
          break;
        case 'O':
          this.setState({player: 'X'});
          this.setState((state)=>{
            state.boardStatus.O.add(i);
            return state.boardStatus;
          });
          break;
      }
      
      return playerNow;
    }

    renderSquare(i) {
      return <Square position={i} boardUpdater={this.boardUpdater} />;
    }

    render() {
			const {player} = this.state;
    	const status = 'Next player: ' + player;
			
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  