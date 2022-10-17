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
    property(ID)
    {
        this.ID = ID;
    }
}
class transaction
{
    transaction(to, from, propertyID)
    {
        this.to = to;
        this.from = from;
        this.propertyID = propertyID;
    }
}
class Block
{
    constructor(timestamp, transactions, validtorNode, previous_hash = ' ')
    {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previous_hash = previous_hash;
        this.hash = ' ';
        this.validatedBy = validtorNode;
    }
    calculateHash()
    {
        return SHA256(this.previous_hash + this.timestamp + JSON.stringify(this.transactions)).toString();
    }
    merkleRootHash()
    {
        transactions = this.transactions;
        n = transactions.length; 
        let v = [];
        for(let i=0;i<n;i++)
        {
            v[i]=transactions[i];
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
        return SHA256(v[0]);
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
        return new Block('10/10/2022', "genesis block", 0, 0);
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
        //console.log("chosen node is : ")
        //console.log(this.chooseNode(inp));
        let names = [];
        let stakes = [];
        for(let i = 0;i < inp.length;i++)
        {
            names[i] = inp[i].name;
            stakes[i] = inp[i].returnStake();
        }
        let validatorBlock = this.chooseNode(names, stakes);
        let block = new Block(Date.now(), this.pendingTransactions, validatorBlock);
        setTimeout(function() {
            console.log("validated by : ");
            console.log(block.validatedBy);
        }, 7000);
        this.chain.push(block);
    }
    createTransaction(transaction)
    {
        this.pendingTransactions.push(transaction)
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
    constructor(name, properties, blockchain = '')
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
let inp = [];
let properties = []
properties.push(new property("4540"));
properties.push(new property("4541"));
inp[0] = new User("Bumar", properties);
properties = [];
properties.push(new property("4542"));
properties.push(new property("4543"));
inp[1] = new User("Seth", properties);
properties = [];
properties.push(new property("4544"));
properties.push(new property("4545"));
inp[2] = new User("Bnmol", properties);
properties = [];
properties.push(new property("4546"));
properties.push(new property("4547"));
inp[3] = new User("Zyan", properties);
properties = [];
properties.push(new property("4548"));
properties.push(new property("4549"));
properties.push(new property("4550"));
inp[4] = new User("Bishra", properties);
properties = [];
properties.push(new property("4551"));
inp[5] = new User("Dhey", properties);
let b = new blockChain();
//b.addBlock(new Block(1, "12/10/2022", {amount : 4}));
//b.addBlock(new Block(2, "13/10/2022", {amount : 5}));
inp[0].blockchain = b;
inp[1].blockchain = b;
b.createTransaction(new transaction(inp[0], inp[1], "4540"));
b.createTransaction(new transaction(inp[3], inp[4], "4548"));
console.log("Transactions starting")
b.completePendingTransactions();
//console.log(JSON.stringify(b, null, 6))