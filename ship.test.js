const ship=require("./ship.js");
test("Hitting a ship",()=>{
    let ship1=ship.Ship(2);
    ship1.hit();
    expect(ship1.hits).toBe(1);
});
test("Hitting a sunk ship",()=>{
    let ship1=ship.Ship(2);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.hits).toBe(2);
    expect(ship1.isSunk()).toBe(true);
});
test("is ship sunk?",()=>{
    let ship1=ship.Ship(2);
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
});