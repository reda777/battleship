import {createGameBoard,createPlayerBoard} from "../src/scripts/siteDOM";
import {Gameboard} from "../src/scripts/gameboard";
import {Ship} from "../src/scripts/ship";
import '@testing-library/jest-dom';
test("createGameBoard create correct number of squares",()=>{
    let gb1=Gameboard();
    document.body.innerHTML = `
    <div class="gameBoard">

    </div>`;

    createGameBoard(gb1);
    const squares = document.querySelectorAll('.square');

    expect(squares.length).toBe(gb1.dim * gb1.dim);
});
test("createPlayerBoard create correct number of squares",()=>{
    let gb1=Gameboard();
    document.body.innerHTML = `
    <div class="playerBoard">

    </div>`;

    createPlayerBoard(gb1);
    const squares = document.querySelectorAll('.playerSquare');

    expect(squares.length).toBe(gb1.dim * gb1.dim);
});
test("createPlayerBoard shows ship squares in red",()=>{
    let gb1=Gameboard();
    let ship1=Ship(3);
    gb1.placeShip(ship1,2,3,2,5);
    document.body.innerHTML = `
    <div class="playerBoard">

    </div>`;

    createPlayerBoard(gb1);
    
    const square = document.querySelector('[data-id="2,3"]')
    expect(square).toHaveStyle({backgroundColor: 'red',});
})

test("createGameBoard adds correct classes to squares", () => {
    document.body.innerHTML = `
    <div class="gameBoard">

    </div>`;
    let gb1 = Gameboard();
    let ship1 = Ship(3);
    gb1.placeShip(ship1,2,3,2,5);
    gb1.receiveAttack(2,4);

    createGameBoard(gb1);
    
    const square = document.querySelector('[data-id="2,4"]');

    expect(square).toHaveClass('square hitSquare',{exact: true});
});

test("createGameBoard styles sunk squares correctly", () => {
    let gb1 = Gameboard();
    let ship1 = Ship(3);
    gb1.placeShip(ship1, 2, 3, 2, 5);
    gb1.receiveAttack(2, 3);
    gb1.receiveAttack(2, 4);
    gb1.receiveAttack(2, 5);
    document.body.innerHTML = `
    <div class="gameBoard">

    </div>`;

    createGameBoard(gb1);

    const square = document.querySelector('[data-id="2,5"]');
    expect(square).toHaveStyle({backgroundColor: 'grey',});
});

test("createPlayerBoard adds correct classes to squares", () => {
    let gb1 = Gameboard();
    let ship1 = Ship(3);
    gb1.placeShip(ship1, 2, 3, 2, 5);
    gb1.receiveAttack(2, 3);
    document.body.innerHTML = `
    <div class="playerBoard">

    </div>`;

    createPlayerBoard(gb1);

    const square = document.querySelector('[data-id="2,3"]');
    expect(square).toHaveClass("hitPlayerSquare");
});