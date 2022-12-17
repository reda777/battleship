import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import {startGameBtnEvent} from "./events.js";

(function gameLoop(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    //create ships (manually for now)
    let carrier=Ship(5);
    let battleship=Ship(4);
    let cruiser1=Ship(3);
    let cruiser2=Ship(3);
    let destroyer1=Ship(2);
    let destroyer2=Ship(2);
    let destroyer3=Ship(2);
    //create ships (manually for now)
    let carrier1=Ship(5);
    let battleship1=Ship(4);
    let cruiser3=Ship(3);
    let cruiser4=Ship(3);
    let destroyer4=Ship(2);
    let destroyer5=Ship(2);
    let destroyer6=Ship(2);
    //player 1
    gb1.placeShip(carrier,4,9,9,9);

    gb1.placeShip(battleship,0,2,0,5);

    gb1.placeShip(cruiser1,3,0,3,2);
    gb1.placeShip(cruiser2,5,2,7,2);

    gb1.placeShip(destroyer1,5,5,5,6);
    gb1.placeShip(destroyer2,0,0,1,0);
    gb1.placeShip(destroyer3,0,7,1,7);
    //player 2
    gb2.placeShip(carrier1,9,4,9,9);

    gb2.placeShip(battleship1,2,0,5,0);

    gb2.placeShip(cruiser3,1,3,3,3);
    gb2.placeShip(cruiser4,2,5,2,7);

    gb2.placeShip(destroyer4,5,5,6,5);
    gb2.placeShip(destroyer5,0,0,0,1);
    gb2.placeShip(destroyer6,7,0,7,1);

    startGameBtnEvent(gb1,gb2);
    

})();