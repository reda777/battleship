function Player(t,isAI=false){
    return {
        turn: t,
        switchTurn(p){
            this.turn=(this.turn)?false:true;
            p.turn=(p.turn)?false:true;
        },
        sendAttack(gameBoard,cordX,cordY){
            return gameBoard.receiveAttack(cordX,cordY);
        },
    }
}
export {Player};