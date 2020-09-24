const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMsgElem = document.querySelector('.winning-message');
const winningTextElem = document.querySelector('[data-winning-message-text]');
const restartBtn = document.getElementById('restart-btn');
let circleTurn;
const xClass = 'x';
const circleClass = 'circle';

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function placeMark(cell, currClass) {
  cell.classList.add(currClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  boardElement.classList.remove(xClass);
  boardElement.classList.remove(circleClass);
  if (circleTurn) {
    boardElement.classList.add(circleClass);
  } else {
    boardElement.classList.add(xClass);
  }
}

function checkWin(currClass) {
  return winCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currClass);
    });
  });
}

function endGame(draw) {
  if (!draw) {
    winningTextElem.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  } else {
    winningTextElem.innerText = `Draw!`;
  }
  winningMsgElem.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function startGame() {
  circleTurn = false;
  winningMsgElem.classList.remove('show');
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  restartBtn.addEventListener('click', startGame);
  setBoardHoverClass();
}

startGame();
