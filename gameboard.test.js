const gameBoard=require("./gameboard.js");
const ship=require("./ship.js");
test("Ship placed succefully",()=>{
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    expect(gb.board[1][5]).toStrictEqual(ship1);
    expect(gb.board[2][5]).toStrictEqual(ship1);
    expect(gb.board[3][5]).toStrictEqual(ship1);
    expect(gb.board[4][5]).toStrictEqual(ship1);
    expect(gb.board[5][5]).toStrictEqual(ship1);
})
test("Placing a ship on a used square",()=>{
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    const ship2=ship.Ship(3);
    expect(gb.placeShip(ship2,3,3,3,6)).toBe(false);
})
test("Attack a coordinates",()=>{
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(2,5);
    expect(attack).toBe(true);
    expect(ship1.hits).toBe(1);
    expect(gb.hitCords[0]).toStrictEqual([2,5]);
})
test("Attack the same coords again",()=>{
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(5);
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
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(1,3);
    expect(attack).toBe(true);
    expect(gb.hitCords[0]).toStrictEqual([1,3]);
})
test("Are ships sunk?",()=>{
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(2);
    const ship2=ship.Ship(2);
    gb.placeShip(ship1,1,5,2,5);
    gb.placeShip(ship2,2,2,3,2);
    gb.receiveAttack(1,5);
    gb.receiveAttack(2,5);
    gb.receiveAttack(2,2);
    expect(gb.checkAllShipsSunk()).toBe(false);
    gb.receiveAttack(3,2);
    expect(gb.checkAllShipsSunk()).toBe(true);
})