import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { fillGameBoard } from "./siteDOM.js";
function startGame(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    //create ships (manually for now)
    let carrier=Ship(5);
    let battleship=Ship(4);
    let cruiser=Ship(3);
    let destroyer=Ship(2);
    //place ships
    gb1.placeShip(carrier,4,9,9,9);

    gb1.placeShip(battleship,0,2,0,5);

    gb1.placeShip(cruiser,3,0,3,1);
    gb1.placeShip(cruiser,5,2,7,2);

    gb1.placeShip(destroyer,5,5,5,6);
    gb1.placeShip(destroyer,0,0,1,0);
    gb1.placeShip(destroyer,0,7,1,7);
    //player 2
    gb2.placeShip(carrier,9,4,9,9);

    gb2.placeShip(battleship,2,0,5,0);

    gb2.placeShip(cruiser,1,3,2,3);
    gb2.placeShip(cruiser,2,5,2,7);

    gb2.placeShip(destroyer,5,5,6,5);
    gb2.placeShip(destroyer,0,0,0,1);
    gb2.placeShip(destroyer,7,0,7,1);

    fillGameBoard(gb1);
}
export {startGame};