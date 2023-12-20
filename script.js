// Track the current player (X starts)
let currentPlayer = 'X';
// Flag to track if the game is still active
let gameActive = true;
 // Counter for total moves made
let moves = 0;
// Reference to the game board element and status element
const board = document.getElementById('board');
const status = document.getElementById('status');
// Player X's score
let playerXScore = 0;
// Player O's score
let playerOScore = 0;
// Reference to Player X's score display and Player Y'sscore display
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');

// Function to handle a click on a cell
function handleCellClick(cell) {
  const selectedCell = cell.target;

  // Check if the game is not active or cell is already marked
  if (!gameActive || selectedCell.textContent !== '') return;

  selectedCell.textContent = currentPlayer;
  moves++;
 // Check if the current player has won
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    updateScore();
    gameActive = false;
    return;
  }
// Check for a draw
  if (moves === 9) {
    status.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }
 // Switch to the next player's turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}
// Function to check for a win based on win patterns
function checkWin() {
  const cells = document.querySelectorAll('.board div');
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


  // Check if any win pattern is satisfied by the current cell contents
  const winningPattern = winPatterns.find(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent !== '' &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent;
  });

  if (winningPattern) {
    // Remove the background color from all cells
    cells.forEach(cell => {
      cell.classList.remove('cell-background');
    });

    // Highlight the winning cells
    const [a, b, c] = winningPattern;
    cells[a].classList.add('winning-cell');
    cells[b].classList.add('winning-cell');
    cells[c].classList.add('winning-cell');
    
    return true;
  }

  return false;
}
// Function to update scores based on the winner
function updateScore() {
  if (currentPlayer === 'X') {
    playerXScore++;
    playerXScoreElement.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreElement.textContent = playerOScore;
  }
}
// Function to reset the game
function resetGame() {
  const cells = document.querySelectorAll('.board div');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.add('cell-background');
    cell.classList.remove('winning-cell');
  });

  status.textContent = '';// Clear status display
  currentPlayer = 'X';// Reset to Player X's turn
  gameActive = true;// Set game to active state
  moves = 0;// Reset move count
}

// Create the game board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell-background');
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}
