'use strict';
import Block from './Block';
import {arrayDiff} from './utils/ArrayUtills';
import nodes from './test/CentralNodeStore';

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
            if (leastCrowdedGameBlockIdx > this.chain[i].getNumParticipants)
                leastNumParticipants = this.chain[i].getNumParticipants;
            leastCrowdedGameBlockIdx = i;
        }

        if (leastNumParticipants >= 9) return -1;
        return leastCrowdedGameBlockIdx;
    };

    joinGame = (userID) => {
        const gameIdx = this.findGame();
        if (gameIdx < 0) {
            console.log("Every gameblock is full.");
            return;
        }
        this.currentGameBlock = this.chain[gameIdx];
        console.log(userID + " joined a game block. (game index: " + gameIdx + ")");
    };

    checkUnanimityGameStart = () => {
        const gameStartPolls = this.currentGameBlock.transactions.gameStartPolls;
        const participants = this.currentGameBlock.transactions.participants;

        return participants.length >= 2 && gameStartPolls === participants;
    };

    suggestGameStart = (userID) => {
        this.currentGameBlock.addTransaction("gameStartPolls", userID);
        console.log(userID + " suggested start the game.");
        if (this.checkUnanimityGameStart()) {
            console.log("Every node in this gameblock agreed to start the game.");
            const gameBlockMiner = this.currentGameBlock.miner;
            nodes[gameBlockMiner].dispenseCards(this.currentGameBlock);
        }
    };

    dispenseCards = (currentGameBlock) => {
        const participants = currentGameBlock.participants;
        const numParticipants = participants.length;
        const cardDispense = {};
        const remainDeck = this.currentGameBlock.getLatestDeckHistory();
        const cards = [];

        for (let i = 0; i < numParticipants; i++) {
            while (cards.length < 2) {
                let cardCandidate = Math.floor(Math.random() * 100 % 20 + 1);
                if (cardCandidate in remainDeck) {
                    cards.push(cardCandidate);
                }
            }
            this.currentGameBlock = this.getSpecificBlock(gameIdx);
            this.currentGameBlock.addTransaction("deckHistory", arrayDiff(remainDeck, cards));
            cardDispense[participants[i]] = cards;
            this.currentGameBlock.addTransaction("cardDispenseHistory", cardDispense);
        }

        let msg = "Cards are dispensed to ";
        for(let i = 0; i < numParticipants; i++) {
            msg += participants[i];
            if(i < numParticipants) {
                msg += ", ";
            }
        }
        console.log(msg);
    };

    /* Add a betting record to the game block. */
    betStakes = (userID, stake) => {
        if (this.currentGameBlock === null) return false;

        const bettingRecord = {};
        bettingRecord[userID] = stake;
        this.currentGameBlock.addTransaction("bettingHistory", bettingRecord);

        console.log(userID + " bet! ($" + stake + ")");
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
