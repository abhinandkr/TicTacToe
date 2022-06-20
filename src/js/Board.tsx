import React from 'react';
import Square, {SquareValueType} from './Square';
import '../css/game.css';

type Props = {
    squares: SquareValueType[],
    onClick: (i: number) => void,
    winnerSquares: (number | null)[] | undefined,
};

/**
 * Board component
 */
export default class Board extends React.Component<Props> {
  // eslint-disable-next-line require-jsdoc
  renderSquare(i: number) {
    const {winnerSquares} = this.props;
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      isWinningSquare={winnerSquares !== undefined &&
          winnerSquares.indexOf(i) !== -1}/>;
  }

  // eslint-disable-next-line require-jsdoc
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
