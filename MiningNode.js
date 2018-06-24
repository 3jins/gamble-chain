import Node from './Node';
import Block from './Block';
import BlockChain from './BlockChain';
import {nodeStore as nodes} from "./test/CentralNodeStore";

export default class MiningNode extends Node {
    constructor(userID, difficulty) {
        super(userID);
        this.chain = new BlockChain(difficulty);
    }

    makeGameRoom = () => {
        if(this.chain.getLatestBlock() === null) {  // There is no block in chain
            (async () => await this.chain.createGenesisBlock())()
                .then(() => this.chain.addBlock(new Block(this.userID)));
        }
        else {  // There is at least one block in chain
            this.chain.addBlock(new Block(this.userID));
        }
    };

    dispenseCards = (currentGameBlock) => {
        this.chain.dispenseCards(currentGameBlock);
    };

    propagateNewBlock = () => {
        for(const nodeID in nodes) {
            if(!nodes.hasOwnProperty(nodeID)) continue;
            if(nodes[nodeID].receiveNewBlock(this.chain.getLatestBlock()) === -1) {
                nodes[nodeID].receiveChain(this.chain);
            }
        }
    };
}
