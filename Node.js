'use strict';
import RSAKey from './utils/RSAKey';
import AESKey from './utils/AESKey';

export default class Node {
    constructor(userID, difficulty) {
        this.userID = userID;
        this.chain = null;
        this.rsaKey = new RSAKey();
        // this.aesKey = new AESKey();
    }

    propagateNewTransaction = (nodes) => {
        const currentGameBlock = this.chain.currentGameBlock;
        const cardDispenseHistory = currentGameBlock.transactions.cardDispenseHistory;
        const numNode = cardDispenseHistory.length;
        const nodeList = [];

        for (let i = 0; i < numNode; i++) {
            const nodeID = Object.keys(cardDispenseHistory[i])[0];
            nodeList.push(nodes[nodeID]);
        }
        for (let i = 0; i < numNode; i++) {
            nodeList[i].receiveNewTransaction(this.chain.getLatestBlock().transactions);
        }
    };

    receiveChain = (chain) => {
        if(this.chain === chain) return;
        this.chain = chain;
    };

    receiveNewBlock = (block) => {
        if(this.chain === null) return -1;
        if(this.chain.getLatestBlock() === block) return -2;
        this.chain.addBlock(block);
    };

    receiveNewTransaction = (newTransactions) => {
        if(this.chain.getLatestBlock().transactions === newTransactions) return;
        this.chain.renewTransaction(newTransactions);
    };
}
