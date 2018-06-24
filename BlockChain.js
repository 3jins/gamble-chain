'use strict';
import Block from './Block';

export default class BlockChain {
    constructor(difficulty) {
        this.chain = [];
        this.difficulty = difficulty;
        this.pendingTransactions = [];
        this.currentGameBlock = null;
        // this.miningReward = 100;
    }

    createGenesisBlock = (userID) => {
        this.chain.push(new Block(userID, "Genesis Block"));
    };

    getLatestBlock = () => {
        if (this.chain.length === 0) return null;
        return this.chain[this.chain.length - 1];
    };

    getSpecificBlock = (blockIdx) => {
        return this.chain[blockIdx];
    };

    addBlock = (newBlock) => {
        const latestBlock = this.getLatestBlock();
        if (latestBlock === null) return;
        newBlock.previousBlockHash = latestBlock.blockHash;
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    };

    renewTransaction = (newTransactions) => {
        const latestBlock = this.getLatestBlock();
        if (latestBlock === null) return;
        latestBlock.replaceTransaction(newTransactions);
    };

    isChainValid = () => {
        let currentIdx = this.chain.length;
        while (currentIdx > 1) {
            let currentBlock = this.chain[--currentIdx];
            let zeros = "";
            for (let i = 0; i < this.difficulty; i++) zeros += "0";

            /* blockHash test */
            if (currentBlock.blockHash !== currentBlock.calculateHash()) return false;

            /* blockHash validity test */
            if (currentBlock.blockHash.substring(0, this.difficulty) !== zeros) return false;

            /* chain connection test */
            if (currentBlock.previousBlockHash !== this.chain[currentIdx - 1].blockHash) return false;
        }
        return true;
    };
}
