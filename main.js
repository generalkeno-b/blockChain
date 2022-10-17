
const SHA256 = require('crypto-js/sha256');

function weightedRandom(items, weights) {
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
    constructor(ID)
    {
        this.ID = ID;
    }
}
class transaction
{
    constructor(to, from, propertyID, timestamp)
    {
        this.to = to;
        this.from = from;
        this.propertyID = propertyID;
        this.timestamp = timestamp;
    }
}
class Block
{
    constructor(timestamp, transactions, validtorNode, previous_hash = ' ')
    {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previous_hash = previous_hash;
        this.hash = SHA256(this.previous_hash + this.timestamp).toString();
        this.validatedBy = validtorNode;
    }
    calculateHash()
    {
        return SHA256(this.previous_hash + this.timestamp + JSON.stringify(this.transactions)).toString();
    }
    merkleRootHash()
    {
        
        let n = this.transactions.length; 
        let v = [];
        for(let i=0;i<n;i++)
        {
            v[i]=this.transactions[i].propertyID;
        }
        while(n!==1)
        {
            if(n%2 !== 0)
            {
                v[n]=v[n-1];
    
                n++;
            }
            let c=0;
            for(let i=0;i<n;i+=2)
            {
                v[c++]=""+v[i]+v[i+1];
            }
            n=c;
        }
        return (SHA256(v[0]).toString());
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
        return new Block('17/10/2022', [], 0, 0);
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];

    }
    chooseNode(names, stakes)
    {
        return weightedRandom(names, stakes).item;
    }
    completePendingTransactions()
    {
        
        let names = [];
        let stakes = [];
        for(let i = 0;i < inp.length;i++)
        {
            names[i] = inp[i].name;
            stakes[i] = inp[i].returnStake();
        }
        let validatorNode= this.chooseNode(names, stakes);
        if(this.pendingTransactions.length >= 3)
        {
            let block = new Block(Date.now(), this.pendingTransactions, validatorNode);
            console.log("validated by : ");
            console.log(block.validatedBy);
            block.previous_hash = this.chain[this.chain.length -1].hash;
            this.chain.push(block);
        }
        else
            this.chain[this.chain.length -1].transactions.push(this.pendingTransactions);

    }
    createTransaction(transaction)
    {
        
        let flag = 0;
        let i = 0;
        for(i = 0; i < transaction.from.properties.length; i++)
           if(transaction.from.properties[i].ID === transaction.propertyID)
               flag = 1;
        if(flag)
        {
            this.pendingTransactions.push(transaction);
            transaction.to.properties.push({ID:transaction.propertyID});
            transaction.from.properties = transaction.from.properties.splice(i,1)
        }
        else 
            console.log("Transaction " + transaction.propertyID + " not possible");
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
    showTransactions()
    {
        for(let i = 1; i < this.chain.length-1; i++)
        {
            const currBlock = this.chain[i];
            for(let j = 0; j < currBlock.transactions.length; j++)
            {
                if (currBlock.transactions[j].from)
                console.log("transfered : " + currBlock.transactions[j].propertyID + " from : " + currBlock.transactions[j].from.name + " to : " + currBlock.transactions[j].to.name)
            }
        }
    }
}
class User
{
    constructor(name, properties, blockchain)
    {
        this.name = name;
        this.properties = properties;
        this.blockchain = blockchain;
    }
    returnStake()
    {
        return properties.length;
    }
}
// RUNNING PROGRAM STARTS HERE
// inp is new user data that we get from input
let inp = [];
// properties is array of all prop. that each user has
let properties = [];

let b = new blockChain();

properties.push(new property("4540"));
properties.push(new property("4541"));
inp[0] = new User("Bumar", properties,b);

// properties needs to be cleared for each user
properties = [];
properties.push(new property("4542"));
properties.push(new property("4543"));
inp[1] = new User("Seth", properties,b);

properties = [];
properties.push(new property("4544"));
properties.push(new property("4545"));
inp[2] = new User("Bnmol", properties,b);

properties = [];
properties.push(new property("4546"));
properties.push(new property("4547"));
inp[3] = new User("Zyan", properties);

properties = [];
properties.push(new property("4548"));
properties.push(new property("4549"));
properties.push(new property("4550"));
inp[4] = new User("Bishra", properties,b);

properties = [];
properties.push(new property("4551"));
inp[5] = new User("Dhey", properties,b);

//  transactions
b.createTransaction(new transaction(inp[1], inp[0], "4540", new Date().getTime));
b.createTransaction(new transaction(inp[4], inp[3], "4547", new Date().getTime));
b.createTransaction(new transaction(inp[1], inp[4], "4547", new Date().getTime));
b.createTransaction(new transaction(inp[3], inp[0], "4541", new Date().getTime));
console.log("Transactions starting")
b.completePendingTransactions();
//print merkle root hash
console.log(b.chain[b.chain.length - 1].merkleRootHash())

b.createTransaction(new transaction(inp[2], inp[0], "4540", new Date().getTime));
b.createTransaction(new transaction(inp[0], inp[1], "4547", new Date().getTime));
b.createTransaction(new transaction(inp[5], inp[0], "4547", new Date().getTime));
b.createTransaction(new transaction(inp[1], inp[4], "4549", new Date().getTime));
console.log("Transactions starting")
b.completePendingTransactions();
//print merkle root hash
console.log(b.chain[b.chain.length - 1].merkleRootHash())

b.showTransactions();
//console.log(b)

