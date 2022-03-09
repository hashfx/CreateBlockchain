/*
About Data:
Transaction is created using class Transaction; and is recorded in class Block;
which contains the data of block, it's hash, and the mined hash.

The blocks are created on certain interval that's why a pendingTransaction method is maintained
to store pending transactions temporarily in an array

Wallet Account Balance is not stored on the blockchain and to get current balance, we go through all
the transactions to calculate the balance
*/



const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {  // what does transaction contain
        this.fromAddress = fromAddress;  // sender
        this.toAddress = toAddress;  // receiver
        this.amount = amount;  // amount of coins
    }
}

class Block {
    constructor(timestamp, transaction, prevHash = '') {
        this.timestamp = timestamp;  // time of creation
        this.transaction = transaction;  // details of transaction in array
        this.prevHash = prevHash;  // hash of previous block
        this.hash = this.calculateHash();  // hash of current block
        this.nonce = 0;  // nonce of block
    }

    calculateHash() {
        // generates hash of block
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
    }

    mineBlock(difficulty){  // difficulty is the number of zeros in the beginning of the hash
        // creates a block with nonce difficulty
        // generate a hash with certain amount of zeros
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;  // increment nonce
            this.hash = this.calculateHash();  // recalculate hash
        }
        console.log(this.nonce + "Block mined: " + this.hash);  // display hash
    }
}

class Blockchain {
    constructor() {  // initializes blockchain
        this.chain = [this.createGenesisBlock()];  // creates genesis block
        this.difficulty = 2;  // difficulty of mining, may need later for functions
        this.pendingTransactions = [];  // pending transactions array
    }

    createGenesisBlock() {  // first block of blockchain
        // {index: 0, timestamp: 0, data: 'Genesis Block', prevHash: ''}
        return new Block("01/01/2022", 'Genesis block', '0');
    }
    getLatestBlock() {  // returns latest block
        return this.chain[this.chain.length - 1];
    }

    /* old method of adding block without consensus and reward
    addBlock(newBlock) {  // adds a new block to the blockchain
        newBlock.prevHash = this.getLatestBlock().hash;  // sets previous hash of new block to hash of latest block
        // newBlock.hash = newBlock.calculateHash();  // sets hash of new block
        newBlock.mineBlock(this.difficulty);  // mines new block with nonce protocol
        this.chain.push(newBlock);  // pushes new block to blockchain
    }
    */

    minePendingTransactions(miningRewardAddress) {  // wallet address of miner to send reward after successful mining
        // creates a new block with pending transactions to be mined
        let block = new Block(Date.now(), this.pendingTransactions);  // timestamp, pending transaction to be mined
        block.mineBlock(this.difficulty);  // mines block with nonce protocol
        
        console.log('Block successfully mined!');  // display message
        this.chain.push(block);  // adds block to blockchain

        // reset pending transactions array and transfer reward to miner
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)  // null fromAddress: being sent by system, miningRewardAddress, miningReward
        ];
    }

    // create new transactions and add to pending transactions array
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);  // push transaction to pending transactions array
    }

    // get balance of an address
    getBalanceOfAddress(address) {
        let balance = 0;  // balance of address
        for(const block of this.chain) {  // iterate through blockchain
            for(const trans of block.transaction) {  // iterate through transactions in block
                if(trans.fromAddress === address) {  // if balanced is transferred to toAddress account
                    balance -= trans.amount;  // reduce balance
                }
                if(trans.toAddress === address) {  // if transaction is received from fromAddress account
                    balance += trans.amount;  // increase balance
                }
            }
        }
        return balance;  // return balance
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
// myCoin.addBlock(new Block(1, "07/03/2022", { amount: 10 }));
// myCoin.addBlock(new Block(2, "07/03/2022", { amount: 100 }));

myCoin.createTransaction(new Transaction('address1', 'address2', 100));  // send 100 coins from address1 to address2
myCoin.createTransaction(new Transaction('address2', 'address1', 50));  // send 50 coins from address2 to address1

console.log('\n Starting Mining...');
myCoin.minePendingTransactions('minerAddress');  // wallet address of miner to send reward after successful mining

console.log('\nBalance of minerAddress: ', myCoin.getBalanceOfAddress('minerAddress'));  // display balance of miner

// balance is transferred only after successful mining of next block
console.log('\n Starting 2 Mining...');
myCoin.minePendingTransactions('minerAddress');  // wallet address of miner to send reward after successful mining

// #FIXME - balance is not transferred after successful mining of next block: returns NaN
console.log('\nBalance of minerAddress: ', myCoin.getBalanceOfAddress('minerAddress'));  // display balance of miner

/* 

// checking validity of blockchain by tempering it's data

myCoin.chain[1].data = { amount: 50 };  // changed amount of block 1
console.log('Blockchain Valid: ', myCoin.isChainValid());  // false

*/
// console.log(JSON.stringify(myCoin, null, 4));



