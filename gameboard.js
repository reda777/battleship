function array2D(n){
    let arr=[];
    for(let i=0;i<n;i++) arr[i]=[];
    return arr;
}
function gbFactory(){
    return {
        board: array2D(10),
        hitCords: [],
        placeShip(ship,cordA,cordB,cordC,cordD){
            if(cordA==cordC){
                let i=cordB;
                while(i<=cordD){
                    this.board[cordA][i]=ship;
                    i+=1;
                }

            }else if(cordB==cordD){
                let i=cordA;
                while(i<=cordC){
                    this.board[i][cordB]=ship;
                    i+=1;
                }
            }
        },
        receiveAttack(cordX,cordY){
            let cordArr=[cordX,cordY];
            let square=this.board[cordX][cordY];
            for(let i=0;i<this.hitCords.length;i++){
                if(this.hitCords[i][0]==cordX && this.hitCords[i][1]==cordY)
                    return false;
            }
            if(square!=undefined){
                square.hit();
                this.hitCords.push(cordArr);
                return true;
            }else{
                this.hitCords.push(cordArr);
                return true;
            }
        },
    }
}
module.exports={gbFactory};