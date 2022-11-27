const ship=require("./ship.js");
test("Ship hits",()=>{
    let ship1=ship.shipFactory(2);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.hits).toBe(2);
    expect(ship1.isSunk()).toBe(true);
});