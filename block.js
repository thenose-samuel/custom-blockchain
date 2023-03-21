const {GENESIS_DATA, difficulty} = require('./config');
const {cryptoHash} = require('./crypto-hash');


class Block{
    constructor({timestamp, prevHash, hash, data, nonce, difficulty}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock, data}){
        let hash, timestamp;
        const prevHash = prevBlock.hash;

        let nonce = 0;
        let difficulty = GENESIS_DATA.difficulty;
        do{
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
       
        return new this(
            {
                timestamp,
                prevHash,
                data,
                hash: cryptoHash(timestamp, prevHash, data, nonce, difficulty),
                difficulty,
                nonce
            }
        )
    }
}

module.exports = Block;