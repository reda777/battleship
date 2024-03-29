function showMessage(str) {
  const message = document.querySelector(".message");
  message.innerHTML = "";
  const content = document.createElement("div");
  content.className = "messageContent";
  content.textContent = str;
  message.appendChild(content);
}
function showMainMessage(str) {
  const message = document.querySelector(".boards");
  const content = document.createElement("h3");
  content.className = "mainMessage";
  content.textContent = str;
  message.appendChild(content);
}
function createEndturnRestartBtn() {
  const gameMode = document.querySelector(".gameMode");
  //clear element
  gameMode.innerHTML = "";

  const restartBtn = document.createElement("div");
  restartBtn.classList.add("restartBtn");
  restartBtn.textContent = "Restart Game";
  gameMode.appendChild(restartBtn);

  const nextBtn = document.createElement("div");
  nextBtn.classList.add("nextBtn");
  nextBtn.textContent = "End Turn";
  gameMode.appendChild(nextBtn);
}
function createFinishRestartBtn() {
  const gameMode = document.querySelector(".gameMode");
  //clear element
  gameMode.innerHTML = "";

  const restartBtn = document.createElement("div");
  restartBtn.classList.add("restartBtn");
  restartBtn.textContent = "Restart Game";
  gameMode.appendChild(restartBtn);

  const finishBtn = document.createElement("div");
  finishBtn.classList.add("finishBtn");
  finishBtn.textContent = "Finish";
  gameMode.appendChild(finishBtn);
}
function createStartGameBtn() {
  const gameMode = document.querySelector(".gameMode");
  //clear element
  gameMode.innerHTML = "";

  const pvpBtn = document.createElement("div");
  pvpBtn.classList.add("pvpBtn");
  pvpBtn.textContent = "Play PvP";
  gameMode.appendChild(pvpBtn);

  const pveBtn = document.createElement("div");
  pveBtn.classList.add("pveBtn");
  pveBtn.textContent = "Play PvE";
  gameMode.appendChild(pveBtn);
}
function createShipsToPick(selectedHead = "horizontal") {
  // Create the main pickShip div
  const container = document.querySelector(".pickShip");
  //clear element
  container.innerHTML = "";

  const head = document.createElement("div");
  head.classList.add("head");

  const headChildHor = document.createElement("div");
  headChildHor.classList.add("headChild");
  headChildHor.dataset.dir = "horizontal";
  if (selectedHead == "horizontal") {
    headChildHor.classList.add("selectedHead");
  }
  headChildHor.innerText = "Horizontal";
  head.appendChild(headChildHor);

  const headChildVer = document.createElement("div");
  headChildVer.classList.add("headChild");
  headChildVer.dataset.dir = "vertical";
  if (selectedHead == "vertical") {
    headChildVer.classList.add("selectedHead");
  }
  headChildVer.innerText = "Vertical";
  head.appendChild(headChildVer);

  container.appendChild(head);

  const content = document.createElement("div");
  content.classList.add("content");

  const shipSizes = [2, 3, 4, 5];
  const shipNames = ["twoWide", "threeWide", "fourWide", "fiveWide"];
  for (let i = 0; i < shipSizes.length; i++) {
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("shipContainer");
    shipContainer.dataset.size = `${shipSizes[i]}`;
    shipContainer.dataset.shipName = `${shipNames[i]}`;

    const num = document.createElement("div");
    num.classList.add("num");
    num.innerText = shipSizes[i];
    shipContainer.appendChild(num);

    const art = svgLine(selectedHead);
    shipContainer.appendChild(art);

    content.appendChild(shipContainer);
  }

  container.appendChild(content);

  return container;
}
function svgLine(dir) {
  const art = document.createElement("div");
  art.classList.add("art");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (dir == "horizontal") {
    svg.setAttribute("width", "100px");
    svg.setAttribute("height", "20px");
  } else if (dir == "vertical") {
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "100px");
  }

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "0");
  rect.setAttribute("y", "0");
  rect.setAttribute("width", "100%");
  rect.setAttribute("height", "100%");
  rect.setAttribute("fill", "#240d31");

  svg.appendChild(rect);
  art.appendChild(svg);
  return art;
}
function createGameBoard(p) {
  const boards = document.querySelector(".boards");
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("gameBoard");
  boards.appendChild(gameBoard);
  let square;
  let dim = p.gb.dim;

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      square = document.createElement("div");
      square.className = "square";
      square.style.gridColumn = i + 1;
      square.style.gridRow = j + 1;

      square.dataset.id = `${i},${j}`;

      if (p.gb.hitCords.some((cords) => cords[0] == i && cords[1] == j)) {
        square.classList.add("hitSquare");
        if (p.gb.board[i][j] != undefined) {
          square.classList.add("shipColor");
          if (p.gb.board[i][j].isSunk()) {
            square.classList.add("sunkShipColor");
          }
        }
      }

      gameBoard.appendChild(square);
    }
  }
}
function emptyBoardsClass() {
  const boards = document.querySelector(".boards");
  boards.innerHTML = "";
}
function emptyPickshipClass() {
  const pickShip = document.querySelector(".pickShip");
  pickShip.innerHTML = "";
}
function emptyMessageClass() {
  const message = document.querySelector(".message");
  message.innerHTML = "";
}
function announceWinner(cpuWon = false) {
  if (cpuWon) {
    showMainMessage("You Lose");
    return;
  }
  showMainMessage("You Win");
}
function createPlayerBoardSmall(p) {
  const boards = document.querySelector(".boards");
  const playerBoard = document.createElement("div");
  playerBoard.classList.add(`playerBoardSmall`);
  boards.appendChild(playerBoard);
  let playerSquare;
  let dim = p.gb.dim;

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      playerSquare = document.createElement("div");
      playerSquare.className = "playerSquare";
      playerSquare.style.gridColumn = i + 1;
      playerSquare.style.gridRow = j + 1;
      playerSquare.dataset.id = `${i},${j}`;

      if (p.gb.board[i][j] != undefined) {
        playerSquare.classList.add("shipColor");
        if (p.gb.board[i][j].isSunk()) {
          playerSquare.classList.add("sunkShipColor");
        }
      }

      if (p.gb.hitCords.some((cords) => cords[0] == i && cords[1] == j)) {
        playerSquare.classList.add("hitPlayerSquareSmall");
      }

      playerBoard.appendChild(playerSquare);
    }
  }
}
function createPlayerBoard(p) {
  const boards = document.querySelector(".boards");
  const playerBoard = document.createElement("div");
  playerBoard.classList.add(`playerBoard`);
  boards.appendChild(playerBoard);
  let playerSquare;
  let dim = p.gb.dim;

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      playerSquare = document.createElement("div");
      playerSquare.className = "playerSquare";
      playerSquare.style.gridColumn = i + 1;
      playerSquare.style.gridRow = j + 1;
      playerSquare.dataset.id = `${i},${j}`;

      if (p.gb.board[i][j] != undefined) {
        playerSquare.classList.add("shipColor");
      }

      playerBoard.appendChild(playerSquare);
    }
  }
}
function createPassDevice() {
  const boards = document.querySelector(".boards");
  const passDevice = document.createElement("h3");
  passDevice.classList.add("passDevice");
  passDevice.textContent = "Pass Device";
  boards.appendChild(passDevice);
}
export {
  createPlayerBoardSmall,
  createPassDevice,
  createEndturnRestartBtn,
  createFinishRestartBtn,
  createStartGameBtn,
  createGameBoard,
  createPlayerBoard,
  announceWinner,
  showMessage,
  createShipsToPick,
  showMainMessage,
  emptyBoardsClass,
  emptyPickshipClass,
  emptyMessageClass,
};
