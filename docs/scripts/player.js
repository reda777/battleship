function makeRandomPlay(p, againCoords) {
  if (againCoords == null) {
    let cords = createRandomNonHitCords();
    while (p.gb.receiveAttack(cords.cordX, cords.cordY) == false) {
      cords = createRandomNonHitCords();
    }
    return cords;
  } else {
    let cords = againCoords;
    let beta = shuffleArray([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);
    for (let i = 0; i < 4; i++) {
      if (
        cords.cordX + beta[i][0] <= 9 &&
        cords.cordY + beta[i][1] <= 9 &&
        cords.cordX + beta[i][0] >= 0 &&
        cords.cordY + beta[i][1] >= 0 &&
        p.gb.receiveAttack(
          cords.cordX + beta[i][0],
          cords.cordY + beta[i][1]
        ) == true
      ) {
        return {
          cordX: cords.cordX + beta[i][0],
          cordY: cords.cordY + beta[i][1],
        };
      }
    }
    return null;
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
