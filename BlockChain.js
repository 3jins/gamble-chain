'use strict';
import Block from './Block';
import arrayDiff from './utils/arrayUtills';

export default class BlockChain {
    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.pendingTransactions = [];
        this.currentGameBlock;
        //this.miningReward = 100;  // Maybe it won't needed in this system.
    }

    createGenesisBlock = () => {
        return new Block("Genesis Block");
    };

    getLatestBlock = () => {
        return this.chain[this.chain.length - 1];
    };

    getSpecificBlock = (blockIdx) => {
        return this.chain[blockIdx];
    };

    addBlock = (newBlock) => {
        const latestBlock = this.getLatestBlock();
        newBlock.previousHash = latestBlock.hash;
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    };

    /* Find the optimum game block.
     * params: none
     * return: block index
     *
     * -- logic --
     * 1. Find a block that the least number of people are participating.
     * 2. If there are multiple blocks that have same number of participants, choose the block made earlier.
     * 3. If every block is full(has 10 participants), return -1.
     */
    findGame = () => {

    };

    /*
     * 1. Join a game: save game block
     * 2. Get cards
     */
    joinGame = (userID) => {
        
    };

    betStakes = () => {

    };

    isChainValid = () => {
        let currentIdx = this.chain.length;
        while(currentIdx > 1) {
            let currentBlock = this.chain[--currentIdx];
            let zeros = "";
            for (let i = 0; i < this.difficulty; i++) zeros += "0";

            /* hash test */
            if(currentBlock.hash !== currentBlock.calculateHash()) return false;

            /* hash validity test */
            if(currentBlock.hash.substring(0, this.difficulty) !== zeros) return false;

            /* chain connection test */
            if(currentBlock.previousHash !== this.chain[currentIdx - 1].hash) return false;
        }
        return true;
    };
}