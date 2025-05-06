const board = document.getElementById("board");
const p1posSpan = document.getElementById("p1pos");
const p2posSpan = document.getElementById("p2pos");
const rollBtn = document.getElementById("rollBtn");
const diceValue = document.getElementById("diceValue");
const currentPlayerText = document.getElementById("currentPlayer");

let cells = [];
let player1Pos = 1;
let player2Pos = 1;
let currentPlayer = 1;

// Snakes and Ladders
const snakesAndLadders = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,
  27: 1,
  21: 9,
  17: 4,
  19: 7
};

// Create 100 board cells
function createBoard() {
  for (let i = 100; i >= 1; i--) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", `cell-${i}`);
    cell.innerText = i;
    cells[i] = cell;
    board.appendChild(cell);
  }
}

// Clear all player positions from board
function clearPlayers() {
  cells.forEach(cell => {
    if (cell) {
      const p1 = cell.querySelector('.player1');
      const p2 = cell.querySelector('.player2');
      if (p1) p1.remove();
      if (p2) p2.remove();
    }
  });
}

// Update player positions on board
function updateBoard() {
  clearPlayers();

  const p1Circle = document.createElement("div");
  p1Circle.classList.add("player1");
  cells[player1Pos].appendChild(p1Circle);

  const p2Circle = document.createElement("div");
  p2Circle.classList.add("player2");
  cells[player2Pos].appendChild(p2Circle);

  p1posSpan.innerText = player1Pos;
  p2posSpan.innerText = player2Pos;
}

// Handle dice roll
function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceValue.innerText = `Roll: ${roll}`;

  if (currentPlayer === 1) {
    player1Pos += roll;
    if (snakesAndLadders[player1Pos]) player1Pos = snakesAndLadders[player1Pos];
    if (player1Pos > 100) player1Pos = 100;
    if (player1Pos === 100) {
      alert("🎉 Player 1 Wins!");
      resetGame();
      return;
    }
    currentPlayer = 2;
  } else {
    player2Pos += roll;
    if (snakesAndLadders[player2Pos]) player2Pos = snakesAndLadders[player2Pos];
    if (player2Pos > 100) player2Pos = 100;
    if (player2Pos === 100) {
      alert("🎉 Player 2 Wins!");
      resetGame();
      return;
    }
    currentPlayer = 1;
  }

  currentPlayerText.innerText = `Current Player: Player ${currentPlayer}`;
  updateBoard();
}

// Reset game
function resetGame() {
  player1Pos = 1;
  player2Pos = 1;
  currentPlayer = 1;
  diceValue.innerText = "Roll: -";
  updateBoard();
}

// Initialize
createBoard();
updateBoard();

// Event
rollBtn.addEventListener("click", rollDice);
