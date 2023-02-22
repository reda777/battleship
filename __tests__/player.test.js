import { Gameboard } from "../src/scripts/gameboard";
import { Player } from "../src/scripts/player";
import { Ship } from "../src/scripts/ship";
test("Switching turns", () => {
  const gb1 = Gameboard();
  let player1 = Player(gb1, true);
  let player2 = Player(gb1, false);
  player1.switchTurn(player2);
  expect(player1.turn).toBe(false);
  expect(player2.turn).toBe(true);
});
test("AI player sending attack", () => {
  const gb1 = Gameboard();
  let player1 = Player(gb1, true, true);
  let player2 = Player(gb1, false, true);
  player2.randomPlay(player1);
  expect(player1.gb.hitCords.length).toBe(1);
});
test("AI player placing ships", () => {
  const gb1 = Gameboard();
  const ship = Ship(2);
  let player2 = Player(gb1, false, true);
  let cords = player2.randomPlace(ship);
  expect(
    player2.gb.checkEmptyCoords(
      cords.cordA,
      cords.cordB,
      cords.cordC,
      cords.cordD
    )
  ).toBe(false);
});
