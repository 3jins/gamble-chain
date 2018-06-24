import Node from './Node';
import Block from './Block';
import BlockChain from './BlockChain';

export default class MiningNode extends Node {
    constructor(userID, difficulty) {
        super(userID);
        this.chain = new BlockChain(difficulty);
    }

    makeGameRoom = () => {
        if(this.chain.getLatestBlock() === null) {  // There is no block in chain
            (async () => await this.chain.createGenesisBlock())()
                .then(() => this.chain.addBlock(new Block));
        }
        else {  // There is at least one block in chain
            this.chain.addBlock(new Block);
        }
    };

    propagateNewBlock = (nodeList) => {
        const numNode = nodeList.length;
        for(let i = 0; i < numNode; i++) {
            if(nodeList[i].receiveNewBlock(this.chain.getLatestBlock()) === -1) {
                nodeList[i].receiveChain(this.chain);
            }
        }
    };
}
