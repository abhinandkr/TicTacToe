import React from "react";
import Square, {SquareValueType} from "./Square";
import '../css/game.css';

type Props = {
    squares: SquareValueType[],
    onClick: (i: number) => void,
    winningSquares: (number | null)[] | undefined,
};

export default class Board extends React.Component<Props> {
    renderSquare(i: number) {
        const {winningSquares} = this.props;
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            isWinningSquare={winningSquares !== undefined && winningSquares.indexOf(i) !== -1}/>;
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
