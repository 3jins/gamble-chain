'use strict';
import Block from './Block';
import {arrayDiff} from './utils/ArrayUtills';

export default class BlockChain {
    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.pendingTransactions = [];
        this.currentGameBlock = null;
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
        newBlock.previousBlockHash = latestBlock.blockHash;
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
        const chainLength = this.chain.length;
        let leastNumParticipants = 0;
        let leastCrowdedGameBlockIdx = 0;

        for (let i = 1; i < chainLength; i++) {
            if(leastCrowdedGameBlockIdx > this.chain[i].getNumParticipants)
                leastNumParticipants = this.chain[i].getNumParticipants;
                leastCrowdedGameBlockIdx = i;
        }

        if(leastNumParticipants >= 9) return -1;
        return leastCrowdedGameBlockIdx;
    };

    /*
     * 1. Join a game: save game block
     * 2. Get cards
     */
    joinGame = (userID) => {
        const gameIdx = this.findGame();
        const cardDispense = {};
        if (gameIdx < 0) {
            console.log("Every gameblock is full. Why don\'t you make a new game block and be a room master?")
            return;
        }
        this.currentGameBlock = this.chain[gameIdx];

        const remainDeck = this.currentGameBlock.getLatestDeckHistory();
        const cards = [];
        while (cards.length < 2) {
            let cardCandidate = Math.floor(Math.random() * 100 % 20 + 1);
            if (cardCandidate in remainDeck) {
                cards.push(cardCandidate);
            }
        }
        this.currentGameBlock = this.getSpecificBlock(gameIdx);
        this.currentGameBlock.addTransaction("deckHistory", arrayDiff(remainDeck, cards));
        cardDispense[userID] = cards;
        this.currentGameBlock.addTransaction("cardDispenseHistory", cardDispense);
    };

    /* Add a betting record to the game block. */
    betStakes = (userID, stake) => {
        if(this.currentGameBlock === null) return false;

        const bettingRecord = {};
        bettingRecord[userID] = stake;
        this.currentGameBlock.addTransaction("bettingHistory", bettingRecord);
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
