import React, { Component } from "react";
import Square from "./Square";
import EndGame from "./EndGame";

const INITIAL = "";
const X_PLAYER = "X";
const O_PLAYER = "O";
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array(9).fill(INITIAL),
      player: false,
      gameFinished: false,
      draw: false,
    };
  }

  newGame = () => {
    this.setState({
      grid: Array(9).fill(INITIAL),
      gameFinished: false,
      draw: false,
    });
  };

  handleClick = (index) => {
    const { grid, player, gameFinished } = this.state;
    if (grid[index] !== INITIAL || gameFinished) {
      return;
    }

    const updatedGrid = [...grid];
    updatedGrid[index] = player ? X_PLAYER : O_PLAYER;

    this.setState(
      {
        grid: updatedGrid,
        player: !player,
      },
      () => {
        this.checkWinner();
        this.checkDraw();
      }
    );
  };

  checkWinner = () => {
    const { grid } = this.state;

    for (let i = 0; i < winCombination.length; i++) {
      const [a, b, c] = winCombination[i];
      if (grid[a] !== INITIAL && grid[a] === grid[b] && grid[a] === grid[c]) {
        this.setState({ gameFinished: true });
        return;
      }
    }
  };

  checkDraw = () => {
    const { grid } = this.state;
    if (grid.every((square) => square !== INITIAL)) {
      this.setState({ gameFinished: true, draw: true });
    }
  };

  render() {
    const { grid, player, gameFinished, draw } = this.state;

    return (
      <div>
        <div className="player-turn">
          Turn player: {player ? X_PLAYER : O_PLAYER}
        </div>
        {gameFinished && (
          <EndGame
            newGame={this.newGame}
            player={player}
            draw={draw}
            X_PLAYER={X_PLAYER}
            O_PLAYER={O_PLAYER}
          />
        )}
        <Square clickedArray={grid} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default TicTacToe;
