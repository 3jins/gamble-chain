'use strict';
import Block from './Block';
import BlockChain from './BlockChain';
import RSAKey from './utils/RSAKey';
import AESKey from './utils/AESKey';

export default class Node {
    constructor(userID, difficulty) {
        this.userID = userID;
        this.chain = null;
        this.rsaKey = new RSAKey();
        // this.aesKey = new AESKey();
    }
}
