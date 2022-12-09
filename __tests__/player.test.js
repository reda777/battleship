const gameBoard= require("../gameboard.js");
const player=require("../player.js");
const ship=require("../ship.js");
test("Switching turns",()=>{
    let player1=player.Player(true);
    let player2=player.Player(false);
    player1.switchTurn(player2);
    expect(player1.turn).toBe(false);
    expect(player2.turn).toBe(true);
})
test("Sending attack",()=>{
    const gb=gameBoard.Gameboard();
    const ship1=ship.Ship(5);
    gb.placeShip(ship1,1,5,5,5);
    let player1=player.Player(true);
    player1.sendAttack(gb,1,5);
    expect(gb.hitCords).toStrictEqual([[1,5]]);
})