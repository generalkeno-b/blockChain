const SHA256 = require('crypto-js/sha256');
class Block
{
    constructor(index, timestamp, data, previous_hash = ' ')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous_hash = previous_hash;
        this.hash = ' ';
    }
    calculateHash()
    {
        return SHA256(this.index + this.previous_hash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class blockChain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock()
    {
        return new Block(0, '10/10/2022', "genesis block", 0);
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];

    }
    addBlock(newBlock)
    {
        newBlock.previous_hash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
let b = new blockChain();
b.addBlock(new Block(1, "12/10/2022", {amount : 4}));
b.addBlock(new Block(2, "13/10/2022", {amount : 5}));
console.log(JSON.stringify(b, null, 4))