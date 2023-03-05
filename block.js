const {GENESIS_DATA} = require('./config');
const {cryptoHash} = require('./crypto-hash');


class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
    static genesis(){
        return new this({
            timestamp: 1,
            prevHash: '0x000',
            hash: '0x123',
            data: []
        });
    }
    static mineBlock({prevBlock, data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        return new this(
            {
                timestamp,
                prevHash,
                data,
                hash: cryptoHash(timestamp, prevHash, data)
            }
        )
    }
}

module.exports = Block;