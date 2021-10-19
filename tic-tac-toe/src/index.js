import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO
// allowing to play again by clearing the board 

// implemented features
// record which player clicking ok
// display o/x based on player ok
// detect if any player has won ok
    // track & check board status at each click ok
        // 8 possible ways to win ok
// prevent player from clicking a clicked square ok

class Square extends React.Component {
	constructor(props) {
		// a subclass's constructor should always has a call to super 
		// all react components constructor should call super(props)
		super(props);
		this.state = {value: null};
	}

  handleClick = () => {
    // each click: 1.update boardStatus, 2. display right symbol, 3.check winning cond. 4. if win do something
    // 1.5: needs players info to be past here from board
    // 1, 1.5 done on Board by updateBoard
    // 3, 4 done on Board by checkWinning 

    // check if this square has already been clicked or if game ended
    // if it does, do nothing
    if(this.state.value || this.props.ifGameEnd){
      return;
    }
    
    const {position, boardHandleClick} = this.props;
    
    var currentPlayer = boardHandleClick(position);

    this.setState({value: currentPlayer});

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
        },
        status: null,
    };

		state = this.initialState;

    //called by handleClick in Square, perform all actions required on board
    // also returns the current player
    boardHandleClick = (position) => {
      var currentPlayer = this.boardUpdater(position);

      this.checkWinning(currentPlayer);

      return currentPlayer;
    }

    // update boardStatus
    // returns the current player
    boardUpdater = (i)=>{
      const playerNow = this.state.player;
      switch (playerNow){
        case 'X':
          this.setState({player: 'O'});
          break;
        case 'O':
          this.setState({player: 'X'});
          break;
      }
      // the arg to setState can also be a func thats in this form: (state, props) => stateChange
      this.setState((state)=>{
        // the state should not be directly mutated
        return {[`boardStatus.${playerNow}`]: state.boardStatus[playerNow].add(i)};
      }, this.checkWinning.bind(this, playerNow));
      
      return playerNow;
    }

    // check if the current player has won, if won, call on Game's won function 
    // - if called independently in boardHandleClick, the function won't work in time
    // because the state is not updated immediately
    // there are two ways to solve: 1. place it in componentDidMount(preferred), 
    // 2.pass as the callback arg to setState(what I did)
    checkWinning = (currentPlayer) => {
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
      
      // check if boardStatus.O/X contain any of the winningcase

      //private helper function
      const isSuperset = (set, subset) => {
        for (let elem of subset) {
            if (!set.has(elem)) {
                return false;
            }
        }
        return true;
      };

      var status = this.state.boardStatus[currentPlayer];
      console.log(status);
      
      var flag = false;
      for (let winCase of WINNINGCASES) {
        if(isSuperset(status, winCase)){
          console.log('winnn');
          flag = true;
          break;
        }
      }

      if(flag){
        this.won(currentPlayer);
      }
    };

    won = (wonPlayer) => {
      this.setState({status: `Winner: ${wonPlayer}`})
    }

    renderSquare(i) {
      // if game ended, freeze the board so its status cant be changed

      return <Square position={i} 
      boardHandleClick={this.boardHandleClick} 
      ifGameEnd={Boolean(this.state.status)}/>;
    }

    render() {
			const {player} = this.state;
    	const status = this.state.status||('Next player: ' + player);
			
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
  