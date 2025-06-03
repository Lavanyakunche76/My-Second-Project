const board = document.getElementById('board');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const restartBtn = document.getElementById('restartBtn');
const currentPlayerText = document.getElementById('currentPlayer');

let currentPlayer = 'X';
let cells = Array(9).fill(null);

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  currentPlayerText.textContent = currentPlayer;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!cells[index]) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      showPopup(`${currentPlayer} Wins!`);
    } else if (cells.every(cell => cell)) {
      showPopup("It's a Draw!");
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      currentPlayerText.textContent = currentPlayer;
    }
  }
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function showPopup(msg) {
  popupMessage.textContent = msg;
  popup.style.display = 'flex';
}

function restartGame() {
  popup.style.display = 'none';
  createBoard();
}

restartBtn.addEventListener('click', createBoard);
createBoard();