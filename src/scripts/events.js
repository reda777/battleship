import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { fillGameBoard } from "./siteDOM.js";
import { startGame } from "./main.js";

function createEvents(){
    const pvpBtn=document.querySelector(".pvpBtn");
    const pveBtn=document.querySelector(".pveBtn");
    const restartBtn=document.querySelector(".restartBtn");
    const nextBtn=document.querySelector(".nextBtn");
    pvpBtn.addEventListener("click",()=>{
        startGame();
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
    });
    
    restartBtn.addEventListener("click",()=>{
        startGame();
        pvpBtn.classList.toggle("hideBtn");
        pveBtn.classList.toggle("hideBtn");
        restartBtn.classList.toggle("hideBtn");
        nextBtn.classList.toggle("hideBtn");
    });
}
createEvents();

export {createEvents};