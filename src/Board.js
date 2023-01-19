import './Board.css';
import { useState } from 'react';
import { getGameState, makeMove, newGame } from './Logic.js';
import TextButton from './TextButton.js';

const tokenMap = {
    1: 'X',
    [-1]: 'O',
}


function Board() {
    const [ gameState, setGameState ] = useState(getGameState());

    const buttons = [];
    gameState.board.forEach((row, i) => {
        row.forEach((val, j) => {
            buttons.push(
                <button 
                    className={
                        'board-slot ' 
                        + (val === 0 ? 'vacant-slot' : 'occupied-slot')
                    } 
                    key={`${i}-${j}`}
                    style={{
                        borderLeftWidth: j === 0 ? 0 : '2px',
                        borderRightWidth: j === 2 ? 0 : '2px',
                        borderTopWidth: i === 0 ? 0 : '2px',
                        borderBottomWidth: i === 2 ? 0 : '2px'
                    }}
                    onClick={() => {
                        let newState = makeMove(i, j);
                        setGameState({...newState});
                    }}
                >
                    {val === 0 ? '' : tokenMap[val]}
                </button>
            );
        })
    });


    return (
        <>
            <div className='board'>
                {buttons}
            </div>
            <h2>
                {
                    gameState.status === 1 ? 
                    (`Player ${tokenMap[gameState.nextTurn]}'s turn`) :
                    gameState.status === 0 ? 
                    'Draw!' :
                    gameState.status === -1 ? 
                    (`Player ${tokenMap[gameState.nextTurn]} won!`) : 
                    ''
                }
            </h2>
            <TextButton onClick={() => setGameState(newGame())}>
                Reset Game
            </TextButton>
        </>
    )
}


export default Board;