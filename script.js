let board = Array(9).fill(null);
const player1 = { marker: "X" };
const player2 = { marker: "O" };
let currentPlayer = player1;

const boardSpot = document.querySelectorAll("div.spot");
const markIndicator = document.querySelector("img.mark-indicator");
const resetButton = document.querySelector("button");
const statusMessage = document.querySelector("p.status-message");

boardSpot.forEach(spot => {
    spot.addEventListener("click", () => {
        placeMarker(spot.getAttribute("id"));
        spot.classList.add(currentPlayer.marker);
        markIndicator.src = currentPlayer.marker === "X" ? "./images/prop-x.png" : "./images/prop-o.png";
    });
});

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

function placeMarker(spot) {
    const index = parseInt(spot) - 1;
    if (board[index] === null) {
        board[index] = currentPlayer.marker;
        const spotElement = document.getElementById(spot);
        const markerImage = document.createElement("img");
        markerImage.src = currentPlayer.marker === "X" ? "./images/prop-x.png" : "./images/prop-o.png";
        markerImage.alt = currentPlayer.marker + " mark";
        markerImage.style.height = "64px";
        
        spotElement.appendChild(markerImage);
        
        const winningPattern = checkWin();
        if (winningPattern) {
            highlightWinningPattern(winningPattern);
            setTimeout(resetBoard, 1500);
            statusMessage.innerHTML = "Wins!"
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
        const [a, b, c] = winPatterns[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return winPatterns[i];  // Return the winning pattern indices
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
        spot.style.backgroundColor = "var(--gray-one)";
    });
    currentPlayer = player1;
    markIndicator.src = "./images/prop-x.png";
    statusMessage.innerHTML = "Chose your spot..."
    console.log("Board reset! Start a new game.");
}

function highlightWinningPattern(pattern) {
    pattern.forEach(index => {
        const spot = boardSpot[index];
        spot.style.backgroundColor = currentPlayer.marker === "X" ? "var(--blue-color)" : "var(--green-color)";
    });
}