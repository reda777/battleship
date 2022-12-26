function makeRandomPlay(p){
    let cords=createRandomCords(this);
    p.gb.receiveAttack(cords.cordX,cords.cordY);
    return cords;
}
function createRandomCords(that){
    let cordX=Math.floor(Math.random() * 10);
    let cordY=Math.floor(Math.random() * 10);
    while(that.gb.hitCords.some(cords => cords[0] == cordX && cords[1] == cordY)){
        cordX=Math.floor(Math.random() * 10);
        cordY=Math.floor(Math.random() * 10);
    }
    return {cordX,cordY};
}
function Player(gb,t,isAI=false){
    return {
        turn: t,
        gb: gb,
        switchTurn(p){
            this.turn=(this.turn)?false:true;
            p.turn=(p.turn)?false:true;
        },
        randomPlay: (isAI)?makeRandomPlay:undefined,
    }
}
export {Player};