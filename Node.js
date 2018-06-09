'use strict';
import Block from './Block';
import BlockChain from './BlockChain';

export default class Node {
    constructor(userID) {
        this.userID = userID;
        this.chain = new BlockChain();
        this.chain.createGenesisBlock();
    }

    makeGameRoom = () => {
        chain.addBlock(new Block);
    };

    join = () => {
        chain.joinGame(this.userID);
    };


}


