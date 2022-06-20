import React, {useState} from 'react';
import Board from './Board';
import {SquareValueType} from './Square';
import '../css/game.css';

interface IWinner {
    value: SquareValueType,
    winnerSquares: (number | null)[],
}

/**
 * Game component
 * @constructor
 */
export default function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[history.length - 1];
  let undoButtonDisabled: boolean = history.length < 2;

  let status: string;
  const winner = calculateWinner();
  if (winner) {
    status = `Winner is ${winner.value}`;
    undoButtonDisabled = true;
  } else if (current.squares.indexOf(null) === -1) {
    status = 'Game over!';
    undoButtonDisabled = true;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          onClick={handleSquareClick}
          winnerSquares={winner?.winnerSquares}/>
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <button onClick={onUndo} disabled={undoButtonDisabled}>
          {'Undo'}
        </button>
        <button onClick={onReset}>
          {'Reset'}
        </button>
      </div>
    </div>
  );

  /**
  * Calculate the winner of the Game
   * @return {IWinner | null}
  */
  function calculateWinner(): IWinner | null {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const current = history[history.length - 1];
    const {squares} = current;
    for (let i = 0; i < rows.length; i++) {
      const [square1, square2, square3] = rows[i];
      if (squares[square1] &&
                squares[square1] === squares[square2] &&
                squares[square2] === squares[square3]) {
        return {
          value: squares[square1],
          winnerSquares: [square1, square2, square3],
        };
      }
    }
    return null;
  }

  /**
  * Handler for clicking on a square
  * @param {number} i
  */
  function handleSquareClick(i: number) {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner() || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...history, {squares}]);
    setXIsNext(!xIsNext);
  }

  /**
  * Undo the last move
  */
  function onUndo() {
    if (history.length < 1) {
      return;
    }
    setHistory([...history.slice(0, history.length - 1)]);
    setXIsNext(!xIsNext);
  }

  /**
  * Reset the whole board
  */
  function onReset() {
    if (history.length === 1) {
      return;
    }
    setHistory([...history.slice(0, 1)]);
    setXIsNext(true);
  }
}
