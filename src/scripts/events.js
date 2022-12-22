import { createGameBoard,createPlayerBoard } from "./siteDOM.js";
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
function mouseoverSquare(e){
    e.target.classList.toggle("squareStyled");
}
function mouseoutSquare(e){
    e.target.classList.toggle("squareStyled");
}
function addSquaresEvents(playerBoard,enemyBoard){
    const gameBoardDiv=document.querySelector(".gameBoard");
    gameBoardDiv.addEventListener('mouseover', mouseoverSquare);
    gameBoardDiv.addEventListener('mouseout', mouseoutSquare);
    gameBoardDiv.addEventListener("click",(e)=>{
        const cords=e.target.dataset.id;
        enemyBoard.receiveAttack(cords[0],cords[2]);
        e.target.classList.add("hitSquare");
        if(enemyBoard.board[cords[0]][cords[2]]!=undefined){
            if(enemyBoard.board[cords[0]][cords[2]].isSunk()){
                changeSunkShipColor(enemyBoard,enemyBoard.board[cords[0]][cords[2]]);
            }else{
                e.target.style.backgroundColor="red";
            }
            addSquaresEvents(playerBoard,enemyBoard);
        }else{
            gameBoardDiv.removeEventListener('mouseover', mouseoverSquare);
            gameBoardDiv.removeEventListener('mouseout', mouseoutSquare);
            e.target.classList.toggle("squareStyled")
            addEndTurnBtnEvent(playerBoard,enemyBoard);
        }
    },{ once: true });
}
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
function changeSunkShipColor(gb,ship){
    const gameBoardDiv=document.querySelector(".gameBoard");
    let shipArr=[];
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            if(gb.board[i][j]===ship){
                shipArr.push([i,j]);
            }
        }
    }
    for(let i=0;i<shipArr.length;i++){
        gameBoardDiv.querySelector(`[data-id="${shipArr[i][0]},${shipArr[i][1]}"]`).style.backgroundColor="grey";
    }
}


export {startGameBtnEvent,addEndTurnBtnEvent,addSquaresEvents,changeSunkShipColor};