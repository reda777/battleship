function createGameBoard(gb) {
    const gameBoard = document.querySelector(".gameBoard");
    let square;
    let dim=gb.dim;

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            square = document.createElement("div");
            square.className = "square";
            square.style.gridColumn = i + 1;
            square.style.gridRow = j + 1;
            
            square.dataset.id = `${i},${j}`;

            if (gb.hitCords.some(cords => cords[0] == i && cords[1] == j)) {
                square.classList.add("hitSquare");
                if (gb.board[i][j] != undefined) {
                    square.style.backgroundColor = "red";
                    if (gb.board[i][j].isSunk()) {
                        square.style.backgroundColor = "grey";
                    }
                }
            }

            gameBoard.appendChild(square);
        }
    }
}

function createPlayerBoard(gb) {
    const playerBoard = document.querySelector(".playerBoard");
    let playerSquare;
    let dim=gb.dim;

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            playerSquare = document.createElement("div");
            playerSquare.className = "playerSquare";
            playerSquare.style.gridColumn = i + 1;
            playerSquare.style.gridRow = j + 1;
            playerSquare.dataset.id = `${i},${j}`;

            if (gb.board[i][j] != undefined) {
                playerSquare.style.backgroundColor = "red";
                if (gb.board[i][j].isSunk()) {
                    playerSquare.style.backgroundColor = "grey";
                }
            }

            if (gb.hitCords.some(cords => cords[0] == i && cords[1] == j)) {
                playerSquare.classList.add("hitPlayerSquare");
            }

            playerBoard.appendChild(playerSquare);
        }
    }
}

export {createGameBoard,createPlayerBoard};