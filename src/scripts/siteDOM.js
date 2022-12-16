function createGameBoard(gb){
    const gameBoard=document.querySelector(".gameBoard");
    let square;
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            square=document.createElement("div");
            square.className="square";
            square.style.gridRow=i+1;
            square.style.gridColumn=j+1;
            square.dataset.id=`${i},${j}`;
            if(includes(gb.hitCords,[i,j])){
                square.classList.add("hitSquare");
            }
            gameBoard.appendChild(square);
        }
    }
}
function includes(arr, element) {
  return arr.some(innerArray => innerArray[0] == element[0] && innerArray[1] == element[1]);
}
function createPlayerBoard(gb){
    const playerBoard=document.querySelector(".playerBoard");
    let playerSquare;
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            playerSquare=document.createElement("div");
            playerSquare.className="playerSquare";
            playerSquare.style.gridRow=i+1;
            playerSquare.style.gridColumn=j+1;
            playerSquare.dataset.id=`${i},${j}`;
            if(gb.board[i][j]!=undefined){
                playerSquare.style.backgroundColor="red";
            }
            if(includes(gb.hitCords,[i,j])){
                playerSquare.classList.add("hitPlayerSquare");
            }
            playerBoard.appendChild(playerSquare);
        }
    }
}
export {createGameBoard,createPlayerBoard};