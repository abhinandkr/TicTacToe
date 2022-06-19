import React from 'react';
import '../css/game.css';
type Props = {
    value: string | null;
    onClick: () => void,
};

export default function Square(props: Props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
