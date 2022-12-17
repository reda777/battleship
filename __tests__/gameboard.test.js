import {Gameboard} from "../src/scripts/gameboard";
import {Ship} from "../src/scripts/ship";
test("Ship placed succefully",()=>{
    const gb=Gameboard();
    const ship1=Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    expect(gb.board[1][5]).toStrictEqual(ship1);
    expect(gb.board[2][5]).toStrictEqual(ship1);
    expect(gb.board[3][5]).toStrictEqual(ship1);
    expect(gb.board[4][5]).toStrictEqual(ship1);
    expect(gb.board[5][5]).toStrictEqual(ship1);
})
test("Placing a ship on a used square",()=>{
    const gb=Gameboard();
    const ship1=Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    const ship2=Ship(3);
    expect(gb.placeShip(ship2,3,3,3,6)).toBe(false);
})
test("Attack a coordinates",()=>{
    const gb=Gameboard();
    const ship1=Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(2,5);
    expect(attack).toBe(true);
    expect(ship1.hits).toBe(1);
    expect(gb.hitCords[0]).toStrictEqual([2,5]);
})
test("Attack the same coords again",()=>{
    const gb=Gameboard();
    const ship1=Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(2,5);
    expect(attack).toBe(true);
    expect(ship1.hits).toBe(1);
    expect(gb.hitCords[0]).toStrictEqual([2,5]);
    let attack2=gb.receiveAttack(2,5);
    expect(attack2).toBe(false);
    expect(ship1.hits).toBe(1);
    expect(gb.hitCords.length).toBe(1);
})
test("Record missed attacks",()=>{
    const gb=Gameboard();
    const ship1=Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(1,3);
    expect(attack).toBe(true);
    expect(gb.hitCords[0]).toStrictEqual([1,3]);
})
test("Check All Ships Sunk", () => {
    const gb = Gameboard();
    const ship1 = Ship(2);
    gb.placeShip(ship1, 1, 5, 1, 6);
    gb.receiveAttack(1, 5);
    gb.receiveAttack(1, 6);
    expect(gb.checkAllShipsSunk()).toBe(true);
});

test("Check All Ships Sunk with remaining ships", () => {
    const gb = Gameboard();
    const ship1 = Ship(2);
    const ship2 = Ship(3);
    gb.placeShip(ship1, 1, 5, 1, 6);
    gb.placeShip(ship2, 3, 3, 3, 5);
    gb.receiveAttack(1, 5);
    gb.receiveAttack(1, 6);
    expect(gb.checkAllShipsSunk()).toBe(false);
});