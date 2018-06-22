'use strict';
import Block from './Block';
import BlockChain from './BlockChain';
import RSAKey from './utils/RSAKey';
import AESKey from './utils/AESKey';

export default class Node {
    constructor(userID, difficulty) {
        this.userID = userID;
        this.chain = new BlockChain(difficulty);
        this.chain.createGenesisBlock();
        this.rsaKey = new RSAKey();
        this.aesKey = new AESKey();
    }

    makeGameRoom = () => {
        this.chain.addBlock(new Block);
    };

    joinGame = () => {
        this.chain.joinGame(this.userID);
    };

    betStakes = (stake) => {
        this.chain.betStakes(this.userID, stake);
    }
}
