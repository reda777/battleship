import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { createGameBoard,createPlayerBoard } from "./siteDOM.js";
function addEndTurnBtnEvent(playerBoard,enemyBoard){
    const gameBoardDiv=document.querySelector(".gameBoard");
    const playerBoardDiv=document.querySelector(".playerBoard");
    const nextBtn=document.querySelector(".nextBtn");
    nextBtn.addEventListener("click",()=>{
        gameBoardDiv.innerHTML='';
        playerBoardDiv.innerHTML='';
        createGameBoard(playerBoard);
        createPlayerBoard(enemyBoard);
        addSquaresEvents(enemyBoard,playerBoard);
    },{ once: true });
}
function addSquaresEvents(playerBoard,enemyBoard){
    const gameBoardDiv=document.querySelector(".gameBoard");
    gameBoardDiv.addEventListener("click",(e)=>{
        const cords=e.target.dataset.id;
        enemyBoard.receiveAttack(cords[0],cords[2]);
        e.target.classList.add("hitSquare");
        if(enemyBoard.board[cords[0]][cords[2]]!=undefined){
            addSquaresEvents(playerBoard,enemyBoard);
        }else{
            addEndTurnBtnEvent(playerBoard,enemyBoard);
        }
    },{ once: true });
}
function startGameBtnEvent(playerBoard,enemyBoard){
    const pvpBtn=document.querySelector(".pvpBtn");
    const pveBtn=document.querySelector(".pveBtn");
    const restartBtn=document.querySelector(".restartBtn");
    const nextBtn=document.querySelector(".nextBtn");
    pvpBtn.addEventListener("click",()=>{
        createGameBoard(enemyBoard);
        createPlayerBoard(playerBoard);
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
        addSquaresEvents(playerBoard,enemyBoard);
    },{once:true});
}
(function gameLoop(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    //create ships (manually for now)
    let carrier=Ship(5);
    let battleship=Ship(4);
    let cruiser=Ship(3);
    let destroyer=Ship(2);
    //player 1
    gb1.placeShip(carrier,4,9,9,9);

    gb1.placeShip(battleship,0,2,0,5);

    gb1.placeShip(cruiser,3,0,3,1);
    gb1.placeShip(cruiser,5,2,7,2);

    gb1.placeShip(destroyer,5,5,5,6);
    gb1.placeShip(destroyer,0,0,1,0);
    gb1.placeShip(destroyer,0,7,1,7);
    //player 2
    gb2.placeShip(carrier,9,4,9,9);

    gb2.placeShip(battleship,2,0,5,0);

    gb2.placeShip(cruiser,1,3,2,3);
    gb2.placeShip(cruiser,2,5,2,7);

    gb2.placeShip(destroyer,5,5,6,5);
    gb2.placeShip(destroyer,0,0,0,1);
    gb2.placeShip(destroyer,7,0,7,1);

    startGameBtnEvent(gb1,gb2);
    

})();
//click start
//make gameboard clickable (once)
//click the board
//if square is ship -> make gameboard clickable again(once) check if all ships are sunk
//else make end turn clickable 
//click end turn
//make gameboard clickable 
//repeat