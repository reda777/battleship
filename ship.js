function shipFactory(length){
    return {
        length : length,
        hits: 0,
        sunk: false,
        hit(){
            this.hits+=1;
        },
        isSunk(){
            return this.length-this.hits==0;
        },
    }
}
module.exports={shipFactory};