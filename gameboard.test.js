const gameBoard=require("./gameboard.js");
const ship=require("./ship.js");
test("Ship placed succefully",()=>{
    const gb=gameBoard.gbFactory();
    const ship1=ship.shipFactory(5);
    gb.placeShip(ship1,1,5,5,5);
    expect(gb.board[1][5]).toStrictEqual(ship1);
    expect(gb.board[2][5]).toStrictEqual(ship1);
    expect(gb.board[3][5]).toStrictEqual(ship1);
    expect(gb.board[4][5]).toStrictEqual(ship1);
    expect(gb.board[5][5]).toStrictEqual(ship1);
})
test("Attack a coordinates",()=>{
    const gb=gameBoard.gbFactory();
    const ship1=ship.shipFactory(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(2,5);
    expect(attack).toBe(true);
    expect(ship1.hits).toBe(1);
    expect(gb.hitCords[0]).toStrictEqual([2,5]);
})
test("Attack the same coords again",()=>{
    const gb=gameBoard.gbFactory();
    const ship1=ship.shipFactory(5);
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
    const gb=gameBoard.gbFactory();
    const ship1=ship.shipFactory(5);
    gb.placeShip(ship1,1,5,5,5);
    let attack=gb.receiveAttack(1,3);
    expect(attack).toBe(true);
    expect(gb.hitCords[0]).toStrictEqual([1,3]);
})