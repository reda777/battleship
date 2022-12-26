import {Gameboard} from "../src/scripts/gameboard";
import {Player} from "../src/scripts/player";
test("Switching turns",()=>{
    const gb1=Gameboard();
    let player1=Player(gb1,true);
    let player2=Player(gb1,false);
    player1.switchTurn(player2);
    expect(player1.turn).toBe(false);
    expect(player2.turn).toBe(true);
})
test("AI player sending attack",()=>{
    const gb1=Gameboard();
    let player1=Player(gb1,true,true);
    let player2=Player(gb1,false,true);
    player2.randomPlay(player1);
    expect(player1.gb.hitCords.length).toBe(1);
})