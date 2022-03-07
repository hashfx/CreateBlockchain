const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;  // block number
        this.timestamp = timestamp;  // time of creation
        this.data = data;  // details of transaction
        this.prevHash = prevHash;  // hash of previous block
        this.hash = this.calculateHash();  // hash of current block
    }

    calculateHash() {
        // generates hash of block
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {  // initializes blockchain
        this.chain = [this.createGenesisBlock()];  // creates genesis block
        
    }

    createGenesisBlock() {  // first block of blockchain
        // {index: 0, timestamp: 0, data: 'Genesis Block', prevHash: ''}
        return new Block(0, "01/01/2022", 'Genesis block', '0');
    }
    getLatestBlock() {  // returns latest block
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {  // adds a new block to the blockchain
        newBlock.prevHash = this.getLatestBlock().hash;  // sets previous hash of new block to hash of latest block
        newBlock.hash = newBlock.calculateHash();  // sets hash of new block
        this.chain.push(newBlock);  // pushes new block to blockchain
    }

    isChainValid() {  // checks if blockchain is valid: consensus
        // loop over each block or entire blockchain
        // loop started at index 1 because index 0 is genesis block
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];  // current block
            const previousBlock = this.chain[i - 1];  // previous block

            // check if hash of current block is valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {  // recalculates hash of current block
                return false;  // invalid block/chain
            }

            // check if current block points to correct previous block
            if (currentBlock.prevHash !== previousBlock.hash) {
                return false;  // invalid block/chain
            }
        }
        return true;  // valid block/chain
    }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, "07/03/2022", { amount: 10 }));
myCoin.addBlock(new Block(2, "07/03/2022", { amount: 100 }));

/* 

// checking validity of blockchain by tempering it's data

myCoin.chain[1].data = { amount: 50 };  // changed amount of block 1
console.log('Blockchain Valid: ', myCoin.isChainValid());  // false

*/
// console.log(JSON.stringify(myCoin, null, 4));

