function array2D(n) {
  let arr = [];
  for (let i = 0; i < n; i++) arr[i] = [];
  return arr;
}
function Gameboard(d = 10) {
  return {
    shipsCount: { twoWide: 2, threeWide: 2, fourWide: 1, fiveWide: 1 },
    dim: d,
    board: array2D(d),
    hitCords: [],
    checkHitCords(x, y) {
      const hitCords = this.hitCords;
      for (let i = 0; i < hitCords.length; i++) {
        if (hitCords[i][0] == x && hitCords[i][1] == y) return true;
      }
      return false;
    },
    checkEmptyCoords(cordA, cordB, cordC, cordD) {
      if (cordA == cordC) {
        let i = cordB;
        while (i <= cordD) {
          if (this.board[cordA][i] != undefined) return false;
          i += 1;
        }
      } else if (cordB == cordD) {
        let i = cordA;
        while (i <= cordC) {
          if (this.board[i][cordB] != undefined) return false;
          i += 1;
        }
      }
      return true;
    },
    placeShip(ship, cordA, cordB, cordC, cordD) {
      if (this.checkEmptyCoords(cordA, cordB, cordC, cordD)) {
        if (cordA == cordC) {
          let i = cordB;
          while (i <= cordD) {
            this.board[cordA][i] = ship;
            i += 1;
          }
          return true;
        } else if (cordB == cordD) {
          let i = cordA;
          while (i <= cordC) {
            this.board[i][cordB] = ship;
            i += 1;
          }
          return true;
        }
      } else {
        return false;
      }
    },
    receiveAttack(cordX, cordY) {
      let cordArr = [cordX, cordY];
      let square = this.board[cordX][cordY];
      //check if coords already hit
      if (this.checkHitCords(cordX, cordY)) return false;
      if (square != undefined) {
        square.hit();
        this.hitCords.push(cordArr);
        return true;
      } else {
        this.hitCords.push(cordArr);
        return true;
      }
    },
    checkAllShipsSunk() {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (
            this.board[i][j] != undefined &&
            this.board[i][j].isSunk() == false
          ) {
            return false;
          }
        }
      }
      return true;
    },
  };
}
export { Gameboard };
