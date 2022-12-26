import { createGameBoard,createPlayerBoard,announceWinner } from "./siteDOM.js";

function startGameBtnEvent(p1,p2){
    const pvpBtn=document.querySelector(".pvpBtn");
    const pveBtn=document.querySelector(".pveBtn");
    const restartBtn=document.querySelector(".restartBtn");
    const nextBtn=document.querySelector(".nextBtn");
    
    pvpBtn.addEventListener("click",startPvpGame);
    pveBtn.addEventListener("click",startPveGame);
    
    function startPveGame(){
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
        pveLoop(p1,p2);
        pvpBtn.removeEventListener("click",startPvpGame);
        pveBtn.removeEventListener("click",startPveGame);
    }
    function startPvpGame(){
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
        pvpLoop(p1,p2);
        pvpBtn.removeEventListener("click",startPvpGame);
        pveBtn.removeEventListener("click",startPveGame);
    }
}
function mouseoverSquare(e){
    if(e.target.classList.contains("hitSquare")) return;
    e.target.classList.toggle("squareStyled");
}
function mouseoutSquare(e){
    if(e.target.classList.contains("hitSquare")) return;
    e.target.classList.toggle("squareStyled");
}
function pvpLoop(p1,p2){
    //palyer 1 turn
    if(p1.turn){
        playerPlay(p1,p2);
        pvpEndTurn(p1,p2);
    }else if(p2.turn){//player 2 turn
        playerPlay(p2,p1);
        pvpEndTurn(p1,p2);
    }
}
function pveLoop(p1,p2){
    //if real player turn or not
    if(p1.turn){
        playerPlay(p1,p2);
        pveEndTurn(p1,p2);
    }else if(p2.turn){//computer turn
        pveComputerPlay(p1,p2);
        pveEndTurn(p1,p2);
    }
}
function pvpEndTurn(p1,p2){
    const nextBtn=document.querySelector(".nextBtn");
    nextBtn.addEventListener("click",nextTurn);
    function nextTurn(){
        pvpLoop(p1,p2);
        nextBtn.removeEventListener("click",nextTurn);
    }
}
function pveEndTurn(p1,p2){
    const nextBtn=document.querySelector(".nextBtn");
    nextBtn.addEventListener("click",nextTurn);
    function nextTurn(){
        pveLoop(p1,p2);
        nextBtn.removeEventListener("click",nextTurn);
    }
}
function playerPlay(p1,p2){
    const gameBoardDiv=document.querySelector(".gameBoard");
    const playerBoardDiv=document.querySelector(".playerBoard");
    //remove old board 
    gameBoardDiv.innerHTML='';
    playerBoardDiv.innerHTML='';
    //show player and enemy board
    createPlayerBoard(p1);
    createGameBoard(p2);
    //select gameboard div
    //add mouseover and mouseout events
    gameBoardDiv.addEventListener('mouseover', mouseoverSquare);
    gameBoardDiv.addEventListener('mouseout', mouseoutSquare);
    //add click event to the game board
    gameBoardDiv.addEventListener("click",attackSquare);
    //click event function
    function attackSquare(e){
        //get clicked cords from the element's data-id
        const cords=e.target.dataset.id;
        //check if cords already clicked
        if(p2.gb.hitCords.some(arr => arr[0] == cords[0] && arr[1] == cords[2])) return;
        //send attack to the enemy
        p2.gb.receiveAttack(cords[0],cords[2]);
        //add X to the attacked square
        e.target.classList.add("hitSquare");
        //if square is a ship
        if(p2.gb.board[cords[0]][cords[2]]!=undefined){
            //if all ship squares are attacked
            if(p2.gb.board[cords[0]][cords[2]].isSunk()){
                changeSunkShipColor(p2,p2.gb.board[cords[0]][cords[2]]);
                if(p2.gb.checkAllShipsSunk()){
                    gameBoardDiv.innerHTML='';
                    announceWinner();
                }
            }else{
                e.target.style.backgroundColor="red";
            }
            gameBoardDiv.removeEventListener('mouseover', mouseoverSquare);
            gameBoardDiv.removeEventListener('mouseout', mouseoutSquare);
            gameBoardDiv.removeEventListener("click",attackSquare);
            e.target.classList.toggle("squareStyled");
            playerPlay(p1,p2);
        }else{
            gameBoardDiv.removeEventListener('mouseover', mouseoverSquare);
            gameBoardDiv.removeEventListener('mouseout', mouseoutSquare);
            gameBoardDiv.removeEventListener("click",attackSquare);
            e.target.classList.toggle("squareStyled");
            p1.switchTurn(p2);
        }
    }
}
function pveComputerPlay(p1,p2){
    const gameBoardDiv=document.querySelector(".gameBoard");
    const playerBoardDiv=document.querySelector(".playerBoard");
    //remove old boards
    gameBoardDiv.innerHTML='';
    playerBoardDiv.innerHTML='';
    //show real player and enemy board to attack
    createPlayerBoard(p1);
    createGameBoard(p1);
    //random attack, save cords
    let cords;
    cords=p2.randomPlay(p1);
    //select the attack square
    const cpuSquare=document.querySelector(`.gameBoard [data-id='${cords.cordX},${cords.cordY}']`);
    //add X to the attacked square
    cpuSquare.classList.add("hitSquare");
    //if square is a ship
    if(p1.gb.board[cords.cordX][cords.cordY]!=undefined){
        //if all ship squares are attacked
        if(p1.gb.board[cords.cordX][cords.cordY].isSunk()){
            changeSunkShipColor(p1,p1.gb.board[cords.cordX][cords.cordY]);
            if(p1.gb.checkAllShipsSunk()){
                gameBoardDiv.innerHTML='';
                announceWinner();
            }
        }else{
            cpuSquare.style.backgroundColor="red";
        }
        pveComputerPlay(p1,p2);
    }else{
        p2.switchTurn(p1);
    }
}
function changeSunkShipColor(p,ship){
    const gameBoardDiv=document.querySelector(".gameBoard");
    let shipArr=[];
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            if(p.gb.board[i][j]===ship){
                shipArr.push([i,j]);
            }
        }
    }
    for(let i=0;i<shipArr.length;i++){
        gameBoardDiv.querySelector(`[data-id="${shipArr[i][0]},${shipArr[i][1]}"]`).style.backgroundColor="grey";
    }
}


export {startGameBtnEvent,pvpLoop,changeSunkShipColor};