import React from 'react';
import '../css/game.css';
const classLists = require('class-lists');

export type SquareValueType = string | null;
type Props = {
    value: SquareValueType;
    onClick: () => void,
    isWinningSquare: boolean;
};

export default function Square(props: Props) {
    const classList = classLists('square', [props.isWinningSquare, 'win']);
    return (
        <button className={classList} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
