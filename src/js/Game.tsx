import React from "react";
import Board from "./Board";
import {SquareValueType} from "./Square";
import '../css/game.css';

type Props = {};
type State = {
    history: Array<{
        squares: SquareValueType[],
    }>,
    xIsNext: boolean,
};

interface IWinner {
    value: SquareValueType,
    winnerSquares: (number | null)[],
}

export default class Game extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    render() {
        const {history} = this.state;
        const current = history[history.length - 1];
        let undoButtonDisabled: boolean = history.length < 2;

        let status: string;
        const winner = this.calculateWinner();
        if (winner) {
            status = `Winner is ${winner.value}`;
            // this.storeWinner(winner.value);
            undoButtonDisabled = true;
        } else if (current.squares.indexOf(null) === -1) {
            status = 'Game over!';
            undoButtonDisabled = true;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleSquareClick(i)}
                        winningSquares={winner?.winnerSquares}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                    <button onClick={this.onUndo} disabled={undoButtonDisabled}>
                        {'Undo'}
                    </button>
                    <button onClick={this.onReset}>
                        {'Reset'}
                    </button>
                </div>
            </div>
        );
    }

    // private storeWinner(value: SquareValueType) {
    //     if (!value) {
    //         return;
    //     }
    //     let wins = localStorage.getItem(value);
    //     if (wins === null) {
    //         localStorage.setItem(value, JSON.stringify(1));
    //     } else {
    //         localStorage.setItem(value, JSON.stringify(parseInt(wins) + 1));
    //     }
    // }

    private calculateWinner(): IWinner | null {
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
        const {history} = this.state;
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

    private handleSquareClick(i: number) {
        const {history, xIsNext} = this.state;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner() || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            history: [...history, {squares}],
            xIsNext: !xIsNext,
        });
    }

    private onUndo = () => {
        const {history, xIsNext} = this.state;
        if (history.length < 1) {
            return;
        }
        this.setState({
            history: [...history.slice(0, history.length - 1)],
            xIsNext: !xIsNext,
        });
    };

    private onReset = () => {
        const {history} = this.state;
        if (history.length === 1) {
            return;
        }
        this.setState({
            // @ts-ignore
            history: [...history.slice(0, 1)],
            xIsNext: true,
        });
    };
}
