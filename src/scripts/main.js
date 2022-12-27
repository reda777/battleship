import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import {startGameBtnEvent} from "./events.js";

(function gameLoop(){
    let gb1=Gameboard();
    let gb2=Gameboard();
    let p1=Player(gb1,true);
    let p2=Player(gb2,false);
    
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
    p1.gb.placeShip(carrier,4,9,8,9);

    p1.gb.placeShip(battleship,0,2,0,5);

    p1.gb.placeShip(cruiser1,3,0,3,2);
    p1.gb.placeShip(cruiser2,5,2,7,2);

    p1.gb.placeShip(destroyer1,5,5,5,6);
    p1.gb.placeShip(destroyer2,0,0,1,0);
    p1.gb.placeShip(destroyer3,0,7,1,7);
    //player 2
    p2.gb.placeShip(carrier1,9,4,9,8);

    p2.gb.placeShip(battleship1,2,0,5,0);

    p2.gb.placeShip(cruiser3,1,3,3,3);
    p2.gb.placeShip(cruiser4,2,5,2,7);

    p2.gb.placeShip(destroyer4,5,5,6,5);
    p2.gb.placeShip(destroyer5,0,0,0,1);
    p2.gb.placeShip(destroyer6,7,0,7,1);

    startGameBtnEvent(p1,p2);
    

})();