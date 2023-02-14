function array2D(n){
    let arr=[];
    for(let i=0;i<n;i++) arr[i]=[];
    return arr;
}
function Gameboard(d=10){
    return {
        shipsCount: {twoWide:3,threeWide:1,fourWide:0,fiveWide:1}, 
        dim: d,
        board: array2D(d),
        hitCords: [],
        checkEmptyCoords(cordA,cordB,cordC,cordD){
            if(cordA==cordC){
                let i=cordB;
                while(i<=cordD){
                    if(this.board[cordA][i]!=undefined) return false;
                    i+=1;
                }

            }else if(cordB==cordD){
                let i=cordA;
                while(i<=cordC){
                    if(this.board[i][cordB]!=undefined) return false;
                    i+=1;
                }
            }
            return true;
        },
        placeShip(ship,cordA,cordB,cordC,cordD){
            if(this.checkEmptyCoords(cordA,cordB,cordC,cordD)){
                if(cordA==cordC){
                    let i=cordB;
                    while(i<=cordD){
                        this.board[cordA][i]=ship;
                        i+=1;
                    }
                    return true;
                }else if(cordB==cordD){
                    let i=cordA;
                    while(i<=cordC){
                        this.board[i][cordB]=ship;
                        i+=1;
                    }
                    return true;
                }
            }else{
                return false;
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
        checkAllShipsSunk(){
            for(let i=0;i<this.board.length;i++){
                for(let j=0;j<this.board[i].length;j++){
                    if(this.board[i][j]!=undefined && this.board[i][j].isSunk()==false){
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
export {Gameboard};