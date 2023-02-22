import { changeSunkShipColor } from "../src/scripts/events.js";
import { Gameboard } from "../src/scripts/gameboard.js";
import { Ship } from "../src/scripts/ship.js";
import { Player } from "../src/scripts/player";
import { createGameBoard } from "../src/scripts/siteDOM.js";
import "@testing-library/jest-dom";
test("changeSunkShipColor changes ship color in the board", () => {
  const gb1 = Gameboard();
  let p = Player(gb1, true);
  const ship = Ship(2);
  document.body.innerHTML = `
        <div class="boards"></div>
    `;
  p.gb.placeShip(ship, 1, 2, 1, 3);
  createGameBoard(p);
  changeSunkShipColor(p, ship);
  const square1 = document.querySelector('[data-id="1,2"]');
  const square2 = document.querySelector('[data-id="1,3"]');
  expect(square1).toHaveStyle({ backgroundColor: "grey" });
  expect(square2).toHaveStyle({ backgroundColor: "grey" });
});
