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

    /* Propagate the updated chain to all nodes
     *
     * 1. Query to the central server and find all nodes
     * 2. Establish a TCP Connection to each node and send the chain to each of them.
     *  2-1. Messages should be signed by private key of the propagating node.
     *  2-2. Mark a lock to centralized server before the propagation, so avoid the collision, and unmark when the propagation is finished.
     */
    propagateChain = () => {
        // Refer here: https://gist.github.com/tedmiston/5935757
    };
    propagateChainTemp = (nodeList) => {
        const numNode = nodeList.length;
        for(let i = 0; i < numNode; i++) {
            nodeList[i].receiveChainTemp(this.chain);
        }
    };

    /* Wait messages in a separate thread.
     * When a new message arrives, update the chain property.
     */
    receiveChain = () => {};
    receiveChainTemp = (chain) => {
        if(this.chain === chain) return;
        this.chain = chain;
    }
}
