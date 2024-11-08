let board = Array(9).fill(null);
const player1 = { marker: "X" };
const player2 = { marker: "O" };
let currentPlayer = player1;

const boardSpot = document.querySelectorAll("div.spot");
const markIndicator = document.querySelector("img.mark-indicator");
const resetButton = document.querySelector("button");

boardSpot.forEach(spot => {
    spot.addEventListener("click", () => {
        placeMarker(spot.getAttribute("id"));
        spot.classList.add(currentPlayer.marker);
    });
});

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

function placeMarker(spot) {
    const index = parseInt(spot) - 1; // Convert to zero-based index
    if (board[index] === null) {
        board[index] = currentPlayer.marker;
        const winner = checkWin();
        
        // Update the visual marker in the HTML
        const spotElement = document.getElementById(spot);
        const markerImage = document.createElement("img");
        markerImage.src = currentPlayer.marker === "X" ? "./images/prop-x.png" : "./images/prop-o.png";
        markerImage.alt = currentPlayer.marker + " mark";
        markerImage.style.height = "64px"; // Set image size
        
        spotElement.appendChild(markerImage); // Add image to the spot element
        
        if (winner) {
            console.log(`${winner} wins!`);
            resetBoard();
            return;
        }
        if (!board.includes(null)) {
            console.log("Draw!");
            resetBoard();
            return;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else {
        console.log("Spot taken.");
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

resetButton.addEventListener("click", () => {
    resetBoard();
});

function resetBoard() {
    board = Array(9).fill(null);
    boardSpot.forEach(spot => {
        spot.innerHTML = '';
        spot.classList.remove("X", "O");
    });
    currentPlayer = player1;
    console.log("Board reset! Start a new game.");
}