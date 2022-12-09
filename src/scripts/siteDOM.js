function fillGameBoard(gb){
    const gameBoard=document.querySelector(".gameBoard");
    let square;
    for(let i=0;i<gb.board.length;i++){
        for(let j=0;j<gb.board[i].length;j++){
            square=document.createElement("div");
            square.className="square";
            square.style.gridRow=i+1;
            square.style.gridColumn=j+1;
            square.dataset.id=`${i},${j}`;
            if(gb.board[i][j]!=undefined){
                square.style.backgroundColor="red";
            }
            gameBoard.appendChild(square);
        }
    }
}
export {fillGameBoard};