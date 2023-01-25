import { createFinishRestartBtn,createStartGameBtn,createGameBoard,createPlayerBoard,announceWinner,showMessage,createShipsToPick,showMainMessage} from "./siteDOM.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
//start game pvp -> create players ->{show board,show ships} -> show message place ship->make ship clickable
function createPlayers(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    let p1=Player(gb1,true);
    let p2=Player(gb2,false);
    return {p1,p2};
}
function createPvpPlayers(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    let p1=Player(gb1,true);
    let p2=Player(gb2,false);
    return {p1,p2};
}
function createPvePlayers(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    let p1=Player(gb1,true);
    let p2=Player(gb2,false,true);
    return {p1,p2};
}
//functions for start game pvp
function startGameBtnEvent(){
    //show main message
    showMainMessage("Pick Game Mode");
    //create start game buttons
    createStartGameBtn();
    //initialize players and boards
    const players=createPlayers();

    const boards=document.querySelector(".boards");
    const pvpBtn=document.querySelector(".pvpBtn");
    const pveBtn=document.querySelector(".pveBtn");
    const finishBtn=document.querySelector(".finishBtn");
    const restartBtn=document.querySelector(".restartBtn");
    const nextBtn=document.querySelector(".nextBtn");
    const pickMode=document.querySelector(".pickMode");
    
    pvpBtn.addEventListener("click",startPvpGame);
    pveBtn.addEventListener("click",startPveGame);
    //restartBtn.addEventListener("click",restartGame);
    
    function restartGame(){
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
        pickMode.classList.remove("displayNon");
        boards.innerHTML='';
        startGameBtnEvent();
        restartBtn.removeEventListener("click",restartGame);
    }
    function startPveGame(){
        const players=createPvePlayers();
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
        pveLoop(players.p1,players.p2);
        restartBtn.addEventListener("click",restartGame);
        pvpBtn.removeEventListener("click",startPvpGame);
        pveBtn.removeEventListener("click",startPveGame);
    }
}
function startPvpGame(){
    //create players
    const players=createPvpPlayers();
    //show finish&restart placing ships button
    createFinishRestartBtn();
    //start placing ships phase
    placeShipLoop(players,"Player 1");
}
function placeShipLoop(players,playerName){
    //remove current page
    removeCurrentPage();
    //add "place a ship" message
    showMessage("Place Ships "+playerName);
    //create ships interface
    createShipsToPick();
    //create and show player1 board
    createPlayerBoard(players.p1);
    //create pick ship event
    pickShipEvents(players);
}
function pickShipEvents(p){
    let currentPlayer=p.p1;
    let finishBtnFunction=nextPlayerPickShips;
    const ships = [
        { name: "twoWide"},
        { name: "threeWide"},
        { name: "fourWide"},
        { name: "fiveWide"}
    ];
    let event;
    for (let i = 0; i < ships.length; i++) {
        const ship=document.querySelector(`.${ships[i].name}`);
        ship.addEventListener("click",changeSize);
    }
    function changeSize(e){
        event=e;
        const gameBoardDiv=document.querySelector(".playerBoard");
        currentPlayer.shipName=e.target.parentNode.getAttribute('class');
        currentPlayer.size=Number(e.target.dataset.size);
        currentPlayer.dir=e.target.getAttribute('class');

        gameBoardDiv.addEventListener('mouseover', mouseoverShip);
        gameBoardDiv.addEventListener('mouseout', mouseoverShip);

        gameBoardDiv.addEventListener('click', placeShipClickEvent);
    }
    function placeShipClickEvent(e){
        const count={twoWide:3,threeWide:2,fourWide:2,fiveWide:1};
        let x=Number(e.target.dataset.id[0]);
        let y=Number(e.target.dataset.id[2]);
        let size=currentPlayer.size;
        let dir=currentPlayer.dir;
        if(currentPlayer.shipsCount[currentPlayer.shipName]<count[currentPlayer.shipName]){
            let ship=Ship(size);
            if(dir=="vertical" && (Number(e.target.dataset.id[2]) + size)<=10){
                if(currentPlayer.gb.placeShip(ship,x,y,x,y+size-1))
                    currentPlayer.shipsCount[currentPlayer.shipName]+=1;
            }else if(dir=="horizontal" && (Number(e.target.dataset.id[0]) + size)<=10){
                if(currentPlayer.gb.placeShip(ship,x,y,x+size-1,y))
                    currentPlayer.shipsCount[currentPlayer.shipName]+=1;
            }
            if(JSON.stringify(currentPlayer.shipsCount)==JSON.stringify(count)){
                const finishBtn=document.querySelector(".finishBtn");
                showMessage("Press Finish");
                finishBtn.addEventListener('click',finishBtnFunction);
            }
            //remove current page and show new gameboard
            removeCurrentPage();
            createPlayerBoard(currentPlayer);
            //keep the selected ship dim
            changeSize(event);
        }else{
            console.log(currentPlayer.shipsCount);
        }   
    }
    function nextPlayerPickShips(){
        currentPlayer=p.p2;
        finishBtnFunction=finishBtnStartPvpLoop.bind(p);
        //remove current page
        removeCurrentPage();
        //add "place a ship" message
        showMessage("Place Ships Player 2");
        //create and show player2 board
        createPlayerBoard(currentPlayer);
        //show finish&restart placing ships button
        createFinishRestartBtn();
    }
    function mouseoverShip(e){
        const size=currentPlayer.size;
        const dir=currentPlayer.dir;
        if(dir=="horizontal"){
            if((Number(e.target.dataset.id[0]) + size)<=10){
                for(let i=0; i<size;i++){
                    const nextTarget=document.
                    querySelector(`.playerBoard [data-id="${Number(e.target.dataset.id[0]) + i},${e.target.dataset.id[2]}"]`);
                    nextTarget.classList.toggle("squareStyled");
                }
            }
        }else if(dir=="vertical"){
            if((Number(e.target.dataset.id[2]) + size)<=10){
                for(let i=0; i<size;i++){
                    const nextTarget=document.
                    querySelector(`.playerBoard [data-id="${e.target.dataset.id[0]},${Number(e.target.dataset.id[2]) + i}"]`);
                    nextTarget.classList.toggle("squareStyled");
                }
            }   
        }  
    }
}
function finishBtnStartPvpLoop(){
    console.log("start pvp loop");
    //remove current page 
    removeCurrentPage();
    //create enemy board and player board
    createPlayerBoard(this.p1);
    createGameBoard(this.p2);
    
}
function removeCurrentPage(){
    const boards=document.querySelector(".boards");
    boards.innerHTML='';
}
function mouseoverSquare(e){
    if(e.target.classList.contains("hitSquare")) return;
    e.target.classList.toggle("squareStyled");
}
function pvpLoop(p1,p2){
    //palyer 1 turn
    if(p1.turn){
        playerPlay(p1,p2,pvpEndTurn);
    }else if(p2.turn){//player 2 turn
        playerPlay(p2,p1,pvpEndTurn);
    }
    function pvpEndTurn(p1,p2){
        const nextBtn=document.querySelector(".nextBtn");
        nextBtn.addEventListener("click",nextTurn);
        function nextTurn(){
            pvpLoop(p1,p2);
            nextBtn.removeEventListener("click",nextTurn);
        }
    }
}
function pveLoop(p1,p2){
    //if real player turn or not
    if(p1.turn){
        playerPlay(p1,p2,pveEndTurn);
    }else if(p2.turn){//computer turn
        pveComputerPlay(p1,p2,pveEndTurn);
    }
    function pveEndTurn(p1,p2){
        const nextBtn=document.querySelector(".nextBtn");
        nextBtn.addEventListener("click",nextTurn);
        function nextTurn(){
            pveLoop(p1,p2);
            nextBtn.removeEventListener("click",nextTurn);
        }
    }
}
function playerPlay(p1,p2,endTurn){
    const boards=document.querySelector(".boards");
    const pickMode=document.querySelector(".pickMode");
    //remove old board 
    pickMode.classList.add("displayNon");
    boards.innerHTML='';
    //show player and enemy board
    createPlayerBoard(p1);
    createGameBoard(p2);
    //select gameboard div
    const gameBoardDiv=document.querySelector(".gameBoard");
    //add mouseover and mouseout events
    gameBoardDiv.addEventListener('mouseover', mouseoverSquare);
    gameBoardDiv.addEventListener('mouseout', mouseoverSquare);
    //add click event to the game board
    gameBoardDiv.addEventListener("click",attackSquare,{once:true});
    //click event function
    function attackSquare(e){
        //get clicked cords from the element's data-id
        const cords=e.target.dataset.id;
        //check if cords already clicked
        if(p2.gb.hitCords.some(arr => arr[0] == cords[0] && arr[1] == cords[2])){
            gameBoardDiv.addEventListener("click",attackSquare,{once:true});
            return;
        }
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
                    boards.innerHTML='';
                    announceWinner();
                    return;
                }
            }else{
                e.target.style.backgroundColor="red";
            }
            gameBoardDiv.removeEventListener('mouseover', mouseoverSquare);
            gameBoardDiv.removeEventListener('mouseout', mouseoverSquare);
            e.target.classList.toggle("squareStyled");
            playerPlay(p1,p2,endTurn);
        }else{
            gameBoardDiv.removeEventListener('mouseover', mouseoverSquare);
            gameBoardDiv.removeEventListener('mouseout', mouseoverSquare);
            e.target.classList.toggle("squareStyled");
            p1.switchTurn(p2);
            endTurn(p1,p2);
        }
    }
}
function pveComputerPlay(p1,p2,endTurn){
    const boards=document.querySelector(".boards");
    //remove old board 
    boards.innerHTML='';
    //show real player and enemy board to attack
    createPlayerBoard(p1);
    createGameBoard(p1);
    const gameBoardDiv=document.querySelector(".gameBoard");
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
                boards.innerHTML='';
                announceWinner();
            }
        }else{
            cpuSquare.style.backgroundColor="red";
        }
        pveComputerPlay(p1,p2,endTurn);
    }else{
        p2.switchTurn(p1);
        endTurn(p1,p2);
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