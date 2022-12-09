/**
 * @jest-environment jsdom
 */
const { fillGameBoard } = require("../siteDOM").default;
const { Gameboard } = require("../gameboard.js").default;
const {Ship} = require("../ship").default;

test("Fill gameboard with div elements",()=>{

    let gb1=Gameboard();

    /*const gameBoard = document.createElement('div');
    gameBoard.className = 'gameBoard';
    document.body.appendChild(gameBoard);*/

    fillGameBoard(gb1);
    const squares = document.querySelectorAll('.square');
    expect(squares.length).toBe(gb1.board.length * gb1.board[0].length);
});
test("fillGameBoard shows ship squares in red",()=>{
    let gb1=Gameboard();
    let ship1=Ship(3);
    gb1.placeShip(ship1,2,3,2,5);
    const gameBoard = document.createElement('div');
    gameBoard.className = 'gameBoard';
    document.body.appendChild(gameBoard);

    fillGameBoard(gb1);
    
    const square = document.querySelector('[data-id="2,3"]')
    const computedStyles = window.getComputedStyle(square);
    expect(computedStyles.backgroundColor).toBe('red');
})