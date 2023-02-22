function makeRandomPlay(p) {
  let cords = createRandomNonHitCords();
  while (p.gb.receiveAttack(cords.cordX, cords.cordY) == false) {
    cords = createRandomNonHitCords();
  }
  return cords;
}
function createRandomNonHitCords() {
  let cordX = Math.floor(Math.random() * 10);
  let cordY = Math.floor(Math.random() * 10);
  return { cordX, cordY };
}
function createRandomCordsForShip(ship) {
  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);
  while (a + ship.length - 1 > 9 || b + ship.length - 1 > 9) {
    a = Math.floor(Math.random() * 10);
    b = Math.floor(Math.random() * 10);
  }
  let c = Math.random() < 0.5 ? a : a + ship.length - 1;
  let d = c == a ? b + ship.length - 1 : b;
  return { a, b, c, d };
}
function placeInRandom(ship) {
  let cords = createRandomCordsForShip(ship);
  while (this.gb.placeShip(ship, cords.a, cords.b, cords.c, cords.d) == false) {
    cords = createRandomCordsForShip(ship);
  }
  return cords;
}
function Player(gb, t, isAI = false) {
  return {
    turn: t,
    shipName: undefined,
    size: undefined,
    dir: undefined,
    shipsCount: { twoWide: 0, threeWide: 0, fourWide: 0, fiveWide: 0 },
    gb: gb,
    switchTurn(p) {
      this.turn = this.turn ? false : true;
      p.turn = p.turn ? false : true;
    },
    randomPlay: isAI ? makeRandomPlay : undefined,
    randomPlace: isAI ? placeInRandom : undefined,
  };
}
export { Player };
