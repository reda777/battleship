import {Gameboard} from "../src/scripts/gameboard";
import {Ship} from "../src/scripts/ship";
import {Player} from "../src/scripts/player";
test("Switching turns",()=>{
    let player1=Player(true);
    let player2=Player(false);
    player1.switchTurn(player2);
    expect(player1.turn).toBe(false);
    expect(player2.turn).toBe(true);
})
test("Sending attack",()=>{
    const gb=Gameboard();
    const ship1=Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let player1=Player(true);
    player1.sendAttack(gb,1,5);
    expect(gb.hitCords).toStrictEqual([[1,5]]);
})