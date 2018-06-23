import Node from './Node';
import Block from './Block';
import BlockChain from './BlockChain';

export default class MiningNode extends Node {
    constructor(userID, difficulty) {
        super(userID);
        this.chain = new BlockChain(difficulty);
    }

    makeGameRoom = () => {
        this.chain.addBlock(new Block);
    };
}