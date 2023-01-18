export const boardSize = 3;


let gameState = {
    board: makeGrid(boardSize, 0),
    nextTurn: 1,
    status: 1
};


function makeGrid(n, fill) {
    let board = [];
    for (let i = 0; i < n; i++) {
        board.push(new Array(n).fill(fill));
    }

    return board;
}


function checkWin(i, j, token) {
    // Verify column
    for (let h = 0; h < boardSize; h++) {
        if (gameState.board[h][j] !== token) {
            break;
        } else if (h === boardSize - 1) {
            return -1;
        }
    }

    // Verify row
    for (let h = 0; h < boardSize; h++) {
        if (gameState.board[i][h] !== token) {
            break;
        } else if (h === boardSize - 1) {
            return -1;
        }
    }

    // Verify diagonal
    if (i === j) {
        for (let h = 0; h < boardSize; h++) {
            if (gameState.board[h][h] !== token) {
                break;
            } else if (h === boardSize - 1) {
                return -1;
            }
        }
    }

    // Verify anti-diagonal
    if (i === boardSize - 1 - j) {
        for (let h = 0; h < boardSize; h++) {
            if (gameState.board[h][boardSize - 1 - h] !== token) {
                break;
            } else if (h === boardSize - 1) {
                return -1;
            }
        }
    }

    // Check if full
    for (let row of gameState.board) {
        for (let val of row) {
            if (val === 0) {
                return 1;
            }
        }
    }

    return 0;
}


export function newGame() {
    gameState.board = makeGrid(boardSize, 0);
    gameState.status = 1;
    gameState.nextTurn = 1;
    return gameState;
}


export function makeMove(i, j) {
    console.log(gameState.board);
    if (gameState.status === 1 && gameState.board[i][j] === 0) {
        gameState.board[i][j] = gameState.nextTurn;
        gameState.status = checkWin(i, j, gameState.nextTurn);
        if (gameState.status === 1 ) {
            gameState.nextTurn *= -1;
        }
    }
    return gameState;
}


export function getGameState() {
    return gameState;
}