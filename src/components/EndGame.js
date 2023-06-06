import React, { Component } from "react";

class EndGame extends Component {
  render() {
    const { newGame, player, draw, X_PLAYER, O_PLAYER } = this.props;

    return (
      <div className="end-game-screen">
        {!draw && (
          <span className="win-text">
            Player {player ? O_PLAYER : X_PLAYER} Win!
          </span>
        )}
        {draw && <span className="win-text">Draw</span>}
        <button className="btn" onClick={newGame}>
          New Game
        </button>
      </div>
    );
  }
}

export default EndGame;
