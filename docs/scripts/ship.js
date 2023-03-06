function Ship(length) {
  return {
    length: length,
    hits: 0,
    sunk: false,
    hit() {
      this.hits += this.hits == this.length ? 0 : 1;
    },
    isSunk() {
      return this.length - this.hits == 0;
    },
  };
}
export { Ship };
