"""
BlockChain:
    System of recording information, impossible to change or hack, distributed across entire network, hashed blocks

BlockChain Coin:
    transaction1(t1): A sends 2 coins to B
    transaction2(t2): C sends 4 coins to D
    transaction3(t3): E sends 8 coins to E

    block_syntax (for current program):
        [hash_of_previous_block, transaction1, transaction2, transaction3..., current_block]
    block1(b1): ("String", t1, t2, t3) -> hash(b1),
        b2: ("hash(b1)", t4, t5, t6) -> hash(b2),
        b3: ("hash(b2)", t7, t8) -> hash(b3)

    Change in one block would change its hash, which would change hash of the other blocks too,
    therefore changing is not possible in the blockchain.

"""


import hashlib

class Coin:
    def __init__(self, prev_block_hash, transaction_list):
        self.prev_block_hash = prev_block_hash  # hashcode of previous block
        self.transaction_list = transaction_list  # list of transactions

        self.block_data = "-".join(transaction_list) + "-" + prev_block_hash  # converts transaction list to string
        self.block_hash = hashlib.sha256(self.block_data.encode()).hexdigest()  # generates SHA256 hashcode of block

# transactions list
t1 = "A sends 2 Coin to B"
t2 = "C sends 2.5 Coin to D"
t3 = "E sends 4.1 Coin to F"
t4 = "G sends 8.9 Coin to H"
t5 = "I sends 1.8 Coin to J"
t6 = "K sends 11 Coin to L"

# blocks
first_block = Coin("Initial String", [t1, t2])
print("First Block: ", first_block.block_hash)
print("First Block Data: ", first_block.block_data)

second_block = Coin(first_block.block_hash, [t3, t4, t5])
print("Second Block: ", second_block.block_hash)
print("Second Block Data: ", second_block.block_data)

