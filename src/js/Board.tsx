import React from "react";
import Square from "./Square";
import '../css/game.css';

type Props = {};
type State = {
    squares: (string | null)[],
    xIsNext: boolean,
};

export default class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    renderSquare(i: number) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleSquareClick(i)}
        />;
    }

    render() {
        let status = '';
        const winner = this.calculateWinner();
        if (winner) {
            status = `Winner is ${winner}`;
        } else if (this.state.squares.indexOf(null) === -1) {
            status = 'Game over!';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

    private calculateWinner(): string | null {
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
        const {squares} = this.state;
        for (let i = 0; i < rows.length; i++) {
            const [square1, square2, square3] = rows[i];
            if (squares[square1] &&
                squares[square1] === squares[square2] &&
                squares[square2] === squares[square3]) {
                return squares[square1];
            }
        }
        return null;
    }

    private handleSquareClick(i: number) {
        const squares = this.state.squares.slice();
        if (this.calculateWinner() || squares[i]) {
            return;
        }
        const {xIsNext} = this.state;
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({squares, xIsNext: !xIsNext});
    }
}
