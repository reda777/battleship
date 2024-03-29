import {
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
} from "./siteDOM.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
function createPvpPlayers() {
  let gb1 = Gameboard();
  let gb2 = Gameboard();
  let p1 = Player(gb1, true);
  let p2 = Player(gb2, false);
  return { p1, p2 };
}
function createPvePlayers() {
  let gb1 = Gameboard();
  let gb2 = Gameboard();
  let p1 = Player(gb1, true);
  let p2 = Player(gb2, false, true);
  return { p1, p2 };
}
//functions for start game pvp
function main() {
  //show main message
  showMainMessage("Pick Game Mode");
  //create start game buttons
  createStartGameBtn();
  //select created buttons
  const pvpBtn = document.querySelector(".pvpBtn");
  const pveBtn = document.querySelector(".pveBtn");

  pvpBtn.addEventListener("click", startPvpGame);
  pveBtn.addEventListener("click", startPveGame);
}
function startPvpGame() {
  //create players
  const players = createPvpPlayers();
  //show finish&restart placing ships button
  createFinishRestartBtn();
  //start placing ships phase
  placeShipLoopPvp(players, "Player 1");
  //set up restart event
  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", restartGame);
}
function restartGame() {
  emptyBoardsClass();
  emptyMessageClass();
  emptyPickshipClass();
  main();
}
function placeShipLoopPvp(players, playerName) {
  //remove current page
  emptyBoardsClass();
  //add "place a ship" message
  showMessage(playerName + " Place Ships");
  //create ships interface
  createShipsToPick();
  //create and show player1 board
  createPlayerBoard(players.p1);
  //create pick ship event
  pickShipEvents(players);
}
function pickShipEvents(p) {
  let currentPlayer = p.p1;
  let finishBtnFunction = passDeviceToPlaceShips;
  createChangeDirEvents();
  function createChangeDirEvents() {
    const dirs = document.querySelectorAll(".headChild");
    dirs.forEach((dir) => {
      dir.addEventListener("click", changeDir);
    });
    function changeDir(e) {
      if (e.currentTarget.dataset.dir != undefined) {
        createShipsToPick(e.currentTarget.dataset.dir);
        pickShipEvents(p);
      }
    }
  }
  createPickShipEvents();
  function createPickShipEvents() {
    const ships = document.querySelectorAll(".shipContainer");
    ships.forEach((ship) => {
      ship.addEventListener("click", changeSize);
    });
    function changeSize(e) {
      emptyBoardsClass();
      createPlayerBoard(currentPlayer);
      currentPlayer.shipName = e.currentTarget.dataset.shipName;
      currentPlayer.size = Number(e.currentTarget.dataset.size);
      currentPlayer.dir = document.querySelector(".selectedHead").dataset.dir;
      addMouseOverEvent();
    }
  }
  function addMouseOverEvent() {
    const gameBoardDiv = document.querySelector(".playerBoard");

    gameBoardDiv.addEventListener(
      "mouseover",
      mouseoverShip.bind(currentPlayer)
    );
    gameBoardDiv.addEventListener(
      "mouseout",
      mouseoverShip.bind(currentPlayer)
    );

    gameBoardDiv.addEventListener("click", placeShipClickEvent);
  }
  function placeShipClickEvent(e) {
    //number of ships allowed
    const count = currentPlayer.gb.shipsCount;
    let x = Number(e.target.dataset.id[0]);
    let y = Number(e.target.dataset.id[2]);
    let size = currentPlayer.size;
    let dir = currentPlayer.dir;
    if (
      currentPlayer.shipsCount[currentPlayer.shipName] <
      count[currentPlayer.shipName]
    ) {
      let ship = Ship(size);
      if (dir == "vertical" && Number(e.target.dataset.id[2]) + size <= 10) {
        if (currentPlayer.gb.placeShip(ship, x, y, x, y + size - 1))
          currentPlayer.shipsCount[currentPlayer.shipName] += 1;
      } else if (
        dir == "horizontal" &&
        Number(e.target.dataset.id[0]) + size <= 10
      ) {
        if (currentPlayer.gb.placeShip(ship, x, y, x + size - 1, y))
          currentPlayer.shipsCount[currentPlayer.shipName] += 1;
      }
      if (JSON.stringify(currentPlayer.shipsCount) == JSON.stringify(count)) {
        const finishBtn = document.querySelector(".finishBtn");
        showMessage("Press Finish");
        finishBtn.addEventListener("click", finishBtnFunction);
      }
      //remove current page and show new gameboard
      emptyBoardsClass();
      createPlayerBoard(currentPlayer);
      addMouseOverEvent();
    } else {
      emptyBoardsClass();
      createPlayerBoard(currentPlayer);
      addMouseOverEvent();
    }
  }
  function passDeviceToPlaceShips(lastPlayer = false) {
    let finishBtnPassDevice =
      lastPlayer == true
        ? () => {
            finishBtnStartPvpLoop(p);
          }
        : nextPlayerPickShips;
    emptyBoardsClass();
    emptyMessageClass();
    emptyPickshipClass();
    createPassDevice();
    const finishBtn = document.querySelector(".finishBtn");
    finishBtn.addEventListener("click", finishBtnPassDevice);
  }
  function nextPlayerPickShips() {
    currentPlayer = p.p2;
    finishBtnFunction = () => {
      passDeviceToPlaceShips(true);
    };
    //remove current page
    emptyBoardsClass();
    //add "place a ship" message
    showMessage("Player 2 Place Ships");
    //create and show player2 board
    createPlayerBoard(currentPlayer);
    //create pick ships ui
    createShipsToPick();
    createPickShipEvents();
    //show finish&restart placing ships button
    createFinishRestartBtn();
    //set up restart event
    const restartBtn = document.querySelector(".restartBtn");
    restartBtn.addEventListener("click", restartGame);
  }
}
function mouseoverShip(e) {
  const size = this.size;
  const dir = this.dir;
  if (dir == "horizontal") {
    if (Number(e.target.dataset.id[0]) + size <= 10) {
      for (let i = 0; i < size; i++) {
        const nextTarget = document.querySelector(
          `.playerBoard [data-id="${Number(e.target.dataset.id[0]) + i},${
            e.target.dataset.id[2]
          }"]`
        );
        nextTarget.classList.toggle("squareStyled");
      }
    }
  } else if (dir == "vertical") {
    if (Number(e.target.dataset.id[2]) + size <= 10) {
      for (let i = 0; i < size; i++) {
        const nextTarget = document.querySelector(
          `.playerBoard [data-id="${e.target.dataset.id[0]},${
            Number(e.target.dataset.id[2]) + i
          }"]`
        );
        nextTarget.classList.toggle("squareStyled");
      }
    }
  }
}
function finishBtnStartPvpLoop(p) {
  createEndturnRestartBtn();
  //set up restart event
  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", restartGame);

  pvpLoop(p.p1, p.p2);
}
function mouseoverSquare(e) {
  if (e.target.classList.contains("hitSquare")) return;
  e.target.classList.toggle("squareStyled");
}
function pvpLoop(p1, p2) {
  //palyer 1 turn
  if (p1.turn) {
    playerPlay(p1, p2);
  } else if (p2.turn) {
    //player 2 turn
    playerPlay(p2, p1);
  }
}
function playerPlay(p1, p2) {
  //remove current page
  emptyBoardsClass();
  //create enemy board and player board
  createPlayerBoardSmall(p1);
  createGameBoard(p2);
  //select gameboard div
  const gameBoardDiv = document.querySelector(".gameBoard");
  //add mouseover and mouseout events
  gameBoardDiv.addEventListener("mouseover", mouseoverSquare);
  gameBoardDiv.addEventListener("mouseout", mouseoverSquare);
  //add click event to the game board
  gameBoardDiv.addEventListener("click", attackSquare, { once: true });
  //click event function
  function attackSquare(e) {
    //get clicked cords from the element's data-id
    const cords = e.target.dataset.id;
    if (cords != null) {
      const checkCords = p2.gb.checkHitCords(cords[0], cords[2]);
      if (checkCords == false) {
        //send attack to the enemy
        p2.gb.receiveAttack(cords[0], cords[2]);
        //add X to the attacked square
        e.target.classList.add("hitSquare");
        //if square is a ship
        if (p2.gb.board[cords[0]][cords[2]] != undefined) {
          //if all ship squares are attacked
          if (p2.gb.board[cords[0]][cords[2]].isSunk()) {
            changeSunkShipColor(p2, p2.gb.board[cords[0]][cords[2]]);
            if (p2.gb.checkAllShipsSunk()) {
              emptyBoardsClass();
              emptyMessageClass();
              emptyPickshipClass();
              announceWinner();
              return;
            }
          } else {
            e.target.style.backgroundColor = "red";
          }
          gameBoardDiv.removeEventListener("mouseover", mouseoverSquare);
          gameBoardDiv.removeEventListener("mouseout", mouseoverSquare);
          //remove hover class
          e.target.classList.toggle("squareStyled");
          //play again
          playerPlay(p1, p2);
        } else {
          gameBoardDiv.removeEventListener("mouseover", mouseoverSquare);
          gameBoardDiv.removeEventListener("mouseout", mouseoverSquare);
          e.target.classList.toggle("squareStyled");
          p1.switchTurn(p2);
          const nextBtn = document.querySelector(".nextBtn");
          nextBtn.addEventListener("click", nextTurn);
          function nextTurn() {
            passDevice(p1, p2);
            nextBtn.removeEventListener("click", nextTurn);
          }
        }
      } else {
        gameBoardDiv.addEventListener("click", attackSquare, { once: true });
        return;
      }
    }
  }
}
function passDevice(p1, p2) {
  emptyBoardsClass();
  emptyMessageClass();
  createPassDevice();
  const nextBtn = document.querySelector(".nextBtn");
  nextBtn.addEventListener("click", nextTurn);
  function nextTurn() {
    pvpLoop(p1, p2);
    nextBtn.removeEventListener("click", nextTurn);
  }
}
function startPveGame() {
  //create players
  const players = createPvePlayers();
  //show finish&restart placing ships button
  createFinishRestartBtn();
  //start placing ships phase
  placeShipLoopPve(players, "Player 1");
  //set up restart event
  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", restartGame);
}
function placeShipLoopPve(players, playerName) {
  //remove current page
  emptyBoardsClass();
  //add "place a ship" message
  showMessage(playerName + " Place Ships");
  //create ships interface
  createShipsToPick();
  //create and show player1 board
  createPlayerBoard(players.p1);
  //create pick ship event
  pickShipEventsPve(players);
}
function pickShipEventsPve(p) {
  let currentPlayer = p.p1;
  let finishBtnFunction = () => {
    finishBtnStartPveLoop(p);
  };
  createChangeDirEvents();
  function createChangeDirEvents() {
    const dirs = document.querySelectorAll(".headChild");
    dirs.forEach((dir) => {
      dir.addEventListener("click", changeDir);
    });
    function changeDir(e) {
      if (e.currentTarget.dataset.dir != undefined) {
        createShipsToPick(e.currentTarget.dataset.dir);
        pickShipEventsPve(p);
      }
    }
  }
  createPickShipEvents();
  function createPickShipEvents() {
    const ships = document.querySelectorAll(".shipContainer");
    ships.forEach((ship) => {
      ship.addEventListener("click", changeSize);
    });
    function changeSize(e) {
      emptyBoardsClass();
      createPlayerBoard(currentPlayer);
      currentPlayer.shipName = e.currentTarget.dataset.shipName;
      currentPlayer.size = Number(e.currentTarget.dataset.size);
      currentPlayer.dir = document.querySelector(".selectedHead").dataset.dir;
      addMouseOverEvent();
    }
  }
  function addMouseOverEvent() {
    const gameBoardDiv = document.querySelector(".playerBoard");

    gameBoardDiv.addEventListener(
      "mouseover",
      mouseoverShip.bind(currentPlayer)
    );
    gameBoardDiv.addEventListener(
      "mouseout",
      mouseoverShip.bind(currentPlayer)
    );

    gameBoardDiv.addEventListener("click", placeShipClickEvent);
  }
  function placeShipClickEvent(e) {
    //number of ships allowed
    const count = currentPlayer.gb.shipsCount;
    let x = Number(e.target.dataset.id[0]);
    let y = Number(e.target.dataset.id[2]);
    let size = currentPlayer.size;
    let dir = currentPlayer.dir;
    if (
      currentPlayer.shipsCount[currentPlayer.shipName] <
      count[currentPlayer.shipName]
    ) {
      let ship = Ship(size);
      if (dir == "vertical" && Number(e.target.dataset.id[2]) + size <= 10) {
        if (currentPlayer.gb.placeShip(ship, x, y, x, y + size - 1))
          currentPlayer.shipsCount[currentPlayer.shipName] += 1;
      } else if (
        dir == "horizontal" &&
        Number(e.target.dataset.id[0]) + size <= 10
      ) {
        if (currentPlayer.gb.placeShip(ship, x, y, x + size - 1, y))
          currentPlayer.shipsCount[currentPlayer.shipName] += 1;
      }
      if (JSON.stringify(currentPlayer.shipsCount) == JSON.stringify(count)) {
        const finishBtn = document.querySelector(".finishBtn");
        showMessage("Press Finish");
        finishBtn.addEventListener("click", finishBtnFunction);
      }
      //remove current page and show new gameboard
      emptyBoardsClass();
      createPlayerBoard(currentPlayer);
      addMouseOverEvent();
    } else {
      //remove current page and show new gameboard
      emptyBoardsClass();
      createPlayerBoard(currentPlayer);
      addMouseOverEvent();
    }
  }
}
function placeShipsForComputer(p) {
  const translateShipNames = {
    twoWide: 2,
    threeWide: 3,
    fourWide: 4,
    fiveWide: 5,
  };
  let count = p.gb.shipsCount;
  let ship;
  for (let shipName in count) {
    for (let i = 0; i < count[shipName]; i++) {
      ship = Ship(translateShipNames[shipName]);
      p.randomPlace(ship);
    }
  }
}
function finishBtnStartPveLoop(p) {
  emptyMessageClass();
  emptyPickshipClass();
  //place ship randomly for computer player
  placeShipsForComputer(p.p2);
  createEndturnRestartBtn();
  //set up restart event
  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.addEventListener("click", restartGame);

  pveLoop(p.p1, p.p2);
}
function pveLoop(p1, p2) {
  //if real player turn or not
  if (p1.turn) {
    playerPlayPve(p1, p2);
  } else if (p2.turn) {
    //computer turn
    pveComputerPlay(p1, p2);
  }
}
function playerPlayPve(p1, p2) {
  //remove current page
  emptyBoardsClass();
  //create enemy board and player board
  createPlayerBoardSmall(p1);
  createGameBoard(p2);
  //select gameboard div
  const gameBoardDiv = document.querySelector(".gameBoard");
  //add mouseover and mouseout events
  gameBoardDiv.addEventListener("mouseover", mouseoverSquare);
  gameBoardDiv.addEventListener("mouseout", mouseoverSquare);
  //add click event to the game board
  gameBoardDiv.addEventListener("click", attackSquare, { once: true });
  //click event function
  function attackSquare(e) {
    //get clicked cords from the element's data-id
    const cords = e.target.dataset.id;
    //check if player clicked a square in gameboard
    if (cords != null) {
      const checkCords = p2.gb.checkHitCords(cords[0], cords[2]);
      if (checkCords == false) {
        //send attack to the enemy
        p2.gb.receiveAttack(cords[0], cords[2]);
        //add X to the attacked square
        e.target.classList.add("hitSquare");
        //if square is a ship
        if (p2.gb.board[cords[0]][cords[2]] != undefined) {
          //if all ship squares are attacked
          if (p2.gb.board[cords[0]][cords[2]].isSunk()) {
            changeSunkShipColor(p2, p2.gb.board[cords[0]][cords[2]]);
            if (p2.gb.checkAllShipsSunk()) {
              emptyBoardsClass();
              emptyMessageClass();
              emptyPickshipClass();
              announceWinner();
              return;
            }
          } else {
            e.target.style.backgroundColor = "red";
          }
          gameBoardDiv.removeEventListener("mouseover", mouseoverSquare);
          gameBoardDiv.removeEventListener("mouseout", mouseoverSquare);
          //remove hover class
          e.target.classList.toggle("squareStyled");
          //play again
          playerPlayPve(p1, p2);
        } else {
          gameBoardDiv.removeEventListener("mouseover", mouseoverSquare);
          gameBoardDiv.removeEventListener("mouseout", mouseoverSquare);
          e.target.classList.toggle("squareStyled");
          p1.switchTurn(p2);
          const nextBtn = document.querySelector(".nextBtn");
          nextBtn.addEventListener("click", nextTurn);
          function nextTurn() {
            pveLoop(p1, p2);
            nextBtn.removeEventListener("click", nextTurn);
          }
        }
      } else {
        gameBoardDiv.addEventListener("click", attackSquare, { once: true });
        return;
      }
    }
  }
}
function pveComputerPlay(p1, p2, againCoords = null) {
  //remove current page
  emptyBoardsClass();
  //create enemy board and player board
  createPlayerBoardSmall(p1);
  createGameBoard(p1);
  //random attack, save cords
  let cords;
  cords = p2.randomPlay(p1, againCoords);
  if (cords == null) {
    pveComputerPlay(p1, p2, cords);
    return;
  }
  //select the attack square
  console.log(cords);
  const cpuSquare = document.querySelector(
    `.gameBoard [data-id='${cords.cordX},${cords.cordY}']`
  );
  //add X to the attacked square
  cpuSquare.classList.add("hitSquare");
  //if square is a ship
  if (p1.gb.board[cords.cordX][cords.cordY] != undefined) {
    //if all ship squares are attacked
    if (p1.gb.board[cords.cordX][cords.cordY].isSunk()) {
      changeSunkShipColor(p1, p1.gb.board[cords.cordX][cords.cordY]);
      if (p1.gb.checkAllShipsSunk()) {
        emptyBoardsClass();
        emptyMessageClass();
        emptyPickshipClass();
        announceWinner(true);
        return;
      }
    } else {
      cpuSquare.style.backgroundColor = "red";
    }
    //play again
    pveComputerPlay(p1, p2, cords);
  } else {
    p2.switchTurn(p1);
    pveLoop(p1, p2);
  }
}
function changeSunkShipColor(p, ship) {
  const gameBoardDiv = document.querySelector(".gameBoard");
  let shipArr = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (p.gb.board[i][j] === ship) {
        shipArr.push([i, j]);
      }
    }
  }
  for (let i = 0; i < shipArr.length; i++) {
    gameBoardDiv.querySelector(
      `[data-id="${shipArr[i][0]},${shipArr[i][1]}"]`
    ).style.backgroundColor = "grey";
  }
}
export { main };
