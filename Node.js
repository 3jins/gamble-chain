'use strict';
import Block from './Block';
import BlockChain from './BlockChain';

export default class Node {
    constructor(userID, difficulty) {
        this.userID = userID;
        this.chain = new BlockChain(difficulty);
        this.chain.createGenesisBlock();
    }

    makeGameRoom = () => {
        this.chain.addBlock(new Block);
    };

    joinGame = () => {
        this.chain.joinGame(this.userID);
    };


}
