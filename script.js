// Get elements
const cells = document.querySelectorAll('.cell');
const startBtn = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const playerNamesSection = document.getElementById('player-names-section');
const winnerSection = document.getElementById('winner-section');
const winnerMessage = document.getElementById('winner-message');
const resetBtn = document.getElementById('reset-btn');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');

let currentPlayer = 'X'; // X starts the game
let player1Name = '';
let player2Name = '';
let board = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true;

// Function to start the game
startBtn.addEventListener('click', () => {
    player1Name = player1NameInput.value.trim();
    player2Name = player2NameInput.value.trim();

    if (player1Name && player2Name) {
        // Hide player name section
        playerNamesSection.style.display = 'none';
        gameBoard.style.display = 'grid';
        resetGame();
    } else {
        alert('Please enter both player names!');
    }
});

// Function to handle cell click
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameActive && !board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner()) {
                winnerMessage.textContent = currentPlayer === 'X' ? `${player1Name} Wins!` : `${player2Name} Wins!`;
                winnerSection.style.display = 'block';
                gameActive = false;
            } else if (board.every(cell => cell !== '')) {
                winnerMessage.textContent = 'It\'s a Draw!';
                winnerSection.style.display = 'block';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
            }
        }
    });
});

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    winnerSection.style.display = 'none';
    gameActive = true;
    currentPlayer = 'X';
}

// Reset button functionality
resetBtn.addEventListener('click', () => {
    resetGame();
    playerNamesSection.style.display = 'block';
    gameBoard.style.display = 'none';
    player1NameInput.value = '';
    player2NameInput.value = '';
});
