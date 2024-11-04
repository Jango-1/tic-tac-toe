let board = Array(9).fill(null);
const player1 = { marker: "X" };
const player2 = { marker: "O" };
let currentPlayer = player1;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

function placeMarker(spot) {
    if (board[spot] === null) {
        board[spot] = currentPlayer.marker;
        const winner = checkWin();
        if (winner) {
            console.log(`${winner} wins!`);
            resetBoard();
            return;
        }
        if (!board.includes(null)) {
            console.log("It's a draw!");
            resetBoard();
            return;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else {
        console.log("Spot is already taken! Choose another.");
    }
}

function checkWin() {
    for (let i = 0; i < winPatterns.length; i++) {
        const pattern = winPatterns[i];
        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];  // Return the winning marker
        }
    }
    return null; // No winner
}

function resetBoard() {
    board = Array(9).fill(null);
    console.log("Board reset! Start a new game.");
}