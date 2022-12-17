import {Ship} from "../src/scripts/ship";
test("Hitting a ship",()=>{
    let ship1=Ship(2);
    ship1.hit();
    expect(ship1.hits).toBe(1);
});
test("hit should not increase hits beyond length",()=>{
    let ship1=Ship(2);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.hits).toBe(2);
});
test("isSunk should return true when ship is sunk",()=>{
    let ship1=Ship(2);
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
});
test("New ship should have 0 hits", ()=>{
    let ship1=Ship(2);
    expect(ship1.hits).toBe(0);
});
test("isSunk should return false when ship is not sunk", ()=>{
    let ship1=Ship(2);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
});