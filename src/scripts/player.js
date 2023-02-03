function makeRandomPlay(p){
    let cords=createRandomNonHitCords(this);
    p.gb.receiveAttack(cords.cordX,cords.cordY);
    return cords;
}
function createRandomNonHitCords(that){
    let cordX=Math.floor(Math.random() * 10);
    let cordY=Math.floor(Math.random() * 10);
    while(that.gb.hitCords.some(cords => cords[0] == cordX && cords[1] == cordY)){
        cordX=Math.floor(Math.random() * 10);
        cordY=Math.floor(Math.random() * 10);
    }
    return {cordX,cordY};
}
function placeInRandom(ship){
    let cordA=Math.floor(Math.random() * 10);
    let cordB=Math.floor(Math.random() * 10);
    let cordC=(Math.random() < 0.5) ? cordA : cordA+ship.length-1;
    let cordD=(cordC==cordA) ? cordB+ship.length-1 : cordB;
    while(this.gb.placeShip(ship,cordA,cordB,cordC,cordD)==false || (cordA+ship.length-1>10 || cordB+ship.length-1>10)){
        cordA=Math.floor(Math.random() * 10);
        cordB=Math.floor(Math.random() * 10);
        cordC=Math.random() < 0.5 ? cordA : cordA+ship.length-1;
        cordD=cordC==cordA ? cordB+ship.length-1 : cordB;
    }
    return {cordA,cordB,cordC,cordD};
}
function Player(gb,t,isAI=false){
    return {
        turn: t,
        shipName: undefined,
        size: undefined,
        dir: undefined,
        shipsCount: {twoWide:0,threeWide:0,fourWide:0,fiveWide:0},
        gb: gb,
        switchTurn(p){
            this.turn=(this.turn)?false:true;
            p.turn=(p.turn)?false:true;
        },
        randomPlay: (isAI)?makeRandomPlay:undefined,
        randomPlace: (isAI)?placeInRandom:undefined,
    };
}
export {Player};