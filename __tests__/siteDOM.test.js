import {createGameBoard,createPlayerBoard,showMessage,announceWinner} from "../src/scripts/siteDOM";
import {Gameboard} from "../src/scripts/gameboard";
import {Player} from "../src/scripts/player";
import {Ship} from "../src/scripts/ship";
import '@testing-library/jest-dom';
test("createGameBoard create correct number of squares",()=>{
    let gb1=Gameboard();
    let p=Player(gb1,true);
    
    document.body.innerHTML = `
    <div class="boards">

    </div>`;

    createGameBoard(p);
    const squares = document.querySelectorAll('.square');

    expect(squares.length).toBe(gb1.dim * gb1.dim);
});
test("createPlayerBoard create correct number of squares",()=>{
    let gb1=Gameboard();
    let p=Player(gb1,true);
    document.body.innerHTML = `
    <div class="boards">

    </div>`;

    createPlayerBoard(p);
    const squares = document.querySelectorAll('.playerSquare');

    expect(squares.length).toBe(gb1.dim * gb1.dim);
});
test("createPlayerBoard shows ship squares in red",()=>{
    let gb1=Gameboard();
    let p=Player(gb1,true);
    let ship1=Ship(3);
    p.gb.placeShip(ship1,2,3,2,5);
    document.body.innerHTML = `
    <div class="boards">

    </div>`;

    createPlayerBoard(p);
    
    const square = document.querySelector('[data-id="2,3"]')
    expect(square).toHaveStyle({backgroundColor: 'red',});
})

test("createGameBoard adds correct classes to squares", () => {
    document.body.innerHTML = `
    <div class="boards">

    </div>`;
    let gb1=Gameboard();
    let p=Player(gb1,true);
    let ship1 = Ship(3);
    p.gb.placeShip(ship1,2,3,2,5);
    p.gb.receiveAttack(2,4);

    createGameBoard(p);
    
    const square = document.querySelector('[data-id="2,4"]');

    expect(square).toHaveClass('square hitSquare',{exact: true});
});

test("createGameBoard styles sunk squares correctly", () => {
    let gb1=Gameboard();
    let p=Player(gb1,true);
    let ship1 = Ship(3);
    p.gb.placeShip(ship1, 2, 3, 2, 5);
    p.gb.receiveAttack(2, 3);
    p.gb.receiveAttack(2, 4);
    p.gb.receiveAttack(2, 5);
    document.body.innerHTML = `
    <div class="boards">

    </div>`;

    createGameBoard(p);

    const square = document.querySelector('[data-id="2,5"]');
    expect(square).toHaveStyle({backgroundColor: 'grey',});
});

test("createPlayerBoard adds correct classes to squares", () => {
    let gb1=Gameboard();
    let p=Player(gb1,true);
    let ship1 = Ship(3);
    p.gb.placeShip(ship1, 2, 3, 2, 5);
    p.gb.receiveAttack(2, 3);
    document.body.innerHTML = `
    <div class="boards">

    </div>`;

    createPlayerBoard(p);

    const square = document.querySelector('[data-id="2,3"]');
    expect(square).toHaveClass("hitPlayerSquare");
});
test("Show pick a ship message",()=>{
    const str="place a ship";
    document.body.innerHTML = `
    <div class="message">

    </div>`;
    showMessage(str);
    const content = document.querySelector('.messageContent');
    expect(content.textContent).toEqual(str);
})
test("announce winner show which player won",()=>{
    
});