const SHA256 = require('crypto-js/sha256');
export default function weightedRandom(items, weights) {
    if (items.length !== weights.length) {
      throw new Error('Items and weights must be of the same size');
    }
  
    if (!items.length) {
      throw new Error('Items must not be empty');
    }
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i += 1) {
      cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      if (cumulativeWeights[itemIndex] >= randomNumber) {
        return {
          item: items[itemIndex],
          index: itemIndex,
        };
      }
    }
  }
class property
{
    property(size, ID)
    {
        this.size = size;
        this.ID = ID;
    }
}
class transaction
{
    transaction(toName, fromName, property)
    {
        this.toName = toName;
        this.fromName = fromName;
        this.property = property;
    }
}
class Block
{
    constructor(timestamp, transactions, previous_hash = ' ')
    {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previous_hash = previous_hash;
        this.hash = ' ';
    }
    calculateHash()
    {
        returnSHA256(this.previous_hash + this.timestamp + JSON.stringify(this.transactions)).toString();
    }
}
class blockChain
{
    constructor()
    {
        this.pendingTransactions = [];
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock()
    {
        return new Block('10/10/2022', "genesis block", 0);
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];

    }
    chooseNode(users)
    {
        return users(weightedRandom(users.address, users.returnStake())).address;
    }
    completePendingTransactions()
    {
        console.log("chosen node is : ")
        console.log(this.chooseNode(inp));
        let block = new Block(Date.now(), this.pendingTransactions);
    }
    isChainValid()
    {
        for(let i = 1; i < this.chain.length; i++)
        {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if(currBlock.hash !== currBlock.calculateHash)
                return false;
            if(currBlock.previous_hash !== prevBlock.hash)
                return false;
            return true;
        }
    }
}
class User
{
    constructor(name, property)
    {
        this.name = name;
        this.property = property;
    }
    returnStake()
    {
        return property.size();
    }
    broadcastBlock(block)
    {
        console.log
    }
}
let inp = [];
inp[0] = new User("Bumar", new property(2, ["6969", "A7PS"]));
inp[1] = new User("Seth", new property(2, ["4542", "4541"]));
let b = new blockChain();
//b.addBlock(new Block(1, "12/10/2022", {amount : 4}));
//b.addBlock(new Block(2, "13/10/2022", {amount : 5}));
console.log(JSON.stringify(b, null, 4))