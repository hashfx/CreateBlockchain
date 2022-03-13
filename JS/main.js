const {Blockchain, Transaction, Block} = require('./blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('7b5c51cf28e17d9c3789c6bd6af575ed005d26987d29b82dce50dbdb3cb1c563');  // get private key
const myWalletAddress = myKey.getPublic('hex');  // get public key


let myCoin = new Blockchain();
/*
myCoin.addBlock(new Block(1, "07/03/2022", { amount: 10 }));
myCoin.addBlock(new Block(2, "07/03/2022", { amount: 100 }));
*/


const tx1 = new Transaction(myWalletAddress, 'public key', 10);  // create transaction
tx1.signTransaction(myKey);  // sign transaction with private key
myCoin.addTransaction(tx1);  // add transaction to blockchain

console.log('\nStarting the miner...');
myCoin.minePendingTransactions(myWalletAddress);  // mine pending transactions
console.log('\nBalance of my wallet is: ', myCoin.getBalanceOfAddress(myWalletAddress));  // display balance of wallet


/*
myCoin.addTransaction(new Transaction('address1', 'address2', 100));  // send 100 coins from address1 to address2
myCoin.addTransaction(new Transaction('address2', 'address1', 50));  // send 50 coins from address2 to address1

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



