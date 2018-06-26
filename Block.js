'use strict';
import calcHash from 'crypto-js/sha256';
import {nodeStore as nodes} from './test/CentralNodeStore';

export default class Block {
    constructor(miner, initialTransaction = '', previousHash = '') {
        this.miner = miner;
        this.transactions = {
            'initialTransaction': initialTransaction,
            'participants': [],
            'gameStartPolls': [],
            'cardDispenseHistory': [],
            'bettingHistory': [],
        };
        this.timestamp = new Date();
        this.previousBlockHash = previousHash;
        this.nonce = 0;
        this.blockHash = this.calculateBlockHash();
    }

    verifyMinerSignature = () => {
        const minerObj = nodes[this.miner.value];
        return minerObj.rsaKey.verify(this.miner.signature, this.miner.value, minerObj.rsaKey.getPublicKey());
    };

    decryptCardDispenseHistory = (idx) => {
        const dispenseCards = this.transactions.cardDispenseHistory;
        const userID = dispenseCards.keys()[idx];
        return this.rsaKey.decrypt(dispenseCards[idx][userID]).split(',').map((item) => Number(item));
    };

    verifyParticipants = (idx) => {
        const participant = this.transactions.participants[idx];
        const participantObj = nodes[participant.value];
        return participantObj.rsaKey.verify(participant.signature, participant.value, participantObj.rsaKey.getPublicKey());
    };

    verifyGameStartPolls = (idx) => {
        const gameStartProposer = this.transactions.gameStartPolls[idx];
        const gameStartProposerObj = nodes[gameStartProposer.value];
        return gameStartProposerObj.rsaKey.verify(gameStartProposer.signature, gameStartProposer.value, gameStartProposerObj.rsaKey.getPublicKey());
    };

    verifyBettingHistory = () => {
        const bettingRecord = this.transactions.bettingHistory[idx];
        const gamblerObj = nodes[bettingRecord.value];
        return gamblerObj.rsaKey.verify(bettingRecord.signature, bettingRecord.value, gamblerObj.rsaKey.getPublicKey());
    };

    getNumParticipants = () => {
        return this.transactions.cardDispense.length;
    };

    addTransaction = (type, data) => {
        this.transactions[type].push(data);
    };

    replaceTransaction = (newTransactions) => {
        this.transactions = newTransactions;
    };

    calculateBlockHash = () => {
        return calcHash(this.timestamp + JSON.stringify(this.transaction) + this.previousBlockHash + this.nonce).toString();
    };

    mine = (difficulty) => {
        let zeros = "";
        for (let i = 0; i < difficulty; i++) zeros += "0";

        while(true) {
            const hash = this.calculateBlockHash();
            if (hash.substring(0, difficulty) === zeros) {
                this.blockHash = hash;
                break;
            }
            this.nonce++;
        }

        console.log("Mining completed!");
        console.log("New block\'s nonce: " + this.nonce);
        console.log("New block\'s blockHash: " + this.blockHash);
    };
}