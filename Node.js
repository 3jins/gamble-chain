'use strict';
import RSAKey from './utils/RSAKey';
import AESKey from './utils/AESKey';
import {nodeStore as nodes} from "./test/CentralNodeStore";

export default class Node {
    constructor(userID, difficulty) {
        this.userID = userID;
        this.chain = null;
        this.rsaKey = new RSAKey();
        // this.aesKey = new AESKey();
    }

    propagateNewTransaction = () => {
        const currentGameBlock = this.chain.currentGameBlock;
        const nodeIDList = currentGameBlock.transactions.participants;
        const numNode = nodeIDList.length;
        const nodeList = [];

        for (let i = 0; i < numNode; i++) {
            nodeList.push(nodes[nodeIDList[i]]);
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
