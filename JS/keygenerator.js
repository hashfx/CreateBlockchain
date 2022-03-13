/*

Public Key:  04081a82a393a4bf102174001be4df1509c3604db20532a6ce637eb43ec9a1b962bc775ec8f0b048cff1b484f024d42b09669ebd9ede9c4b967ef8165619ef62a4

Private Key:  7b5c51cf28e17d9c3789c6bd6af575ed005d26987d29b82dce50dbdb3cb1c563

*/


const EC = require('elliptic').ec;

const ec = new EC('secp256k1');  // instance of elliptic curve

const key = ec.genKeyPair();  // generate a key pair
const publicKey = key.getPublic('hex');  // get public key
const privateKey = key.getPrivate('hex');  // get private key

console.log('\nPublic Key: ', publicKey);  // display public key
console.log('\nPrivate Key: ', privateKey);  // display private key


