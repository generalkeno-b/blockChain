Blockchain Project by Group 52
Assigned Consensus Algorithm = PoS (Proof of Stake)

Group Information:

Aditya Seth - 2020A8PS2151H
Aditya Kumar - 2020A3PS0624H
Anmol Goyal - 2020A3PS2139H

---------------------------------------
** Flow of Code**
In the starting of the code, we have implemented the PoS consensus by declaring the function "weightedRandom".
This function is used to find out the stake of the user and subsequently decide who becomes the validator.
Function takes input of items and their weights and the algorith returns the chosen item (after taking weightedRandom) and its index.


Property class is defined
Transaction class is defined
Block class is defined 
 calculateHash function is used to calculate the hash value for the block.
 merkleRootHash function is used to calculate the value of root of merkle using timestamp and transaction data.

Blockchain class is defined
    A genesis block is created using the function createGenesisBlock.
    createTransaction function is used to store the new transactions in a list i.e pendingTransactions.
    completePendingTransactions function is defined and used to process the transaction within it.
    showTransactions functions has been used to display all the transactions done in the block.
    
User class is defined which stores the user data.
    returnStake function is used to get the number of properties with user which helps to get the stake of user in blockchain.

------------------------------------------------------------
** Running the code**

inp array is used to store the object of class User, which has the properties with that user.

We have defined the users and properties with the respective users in the code and initialised the blockchain with it.
 inp[0].blockchain = b;
This adds the defined user in the existing blockchain.
Provided the input for different transactions to be done and stored in a block.
Merkle root hash is printed for all the transactions above the statements.
Second root hash shows that it changes when new transactions are done.
later we traverse the blockchain to find the transaction history of property with ID = 4547.

-------------------------------------------------------------
** OUTPUT **
 The transaction which is not possible shows error and other transactions get executed.
 We get merkle root hash values for transactions in the same block but we get two different value, because new transaction has been done.

Further we get the complete transaction history of a block. 


-------------------------------------------------------------