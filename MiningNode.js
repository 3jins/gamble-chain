import Node from './Node';
import Block from './Block';
import BlockChain from './BlockChain';
import {arrayDiff} from './utils/ArrayUtills';
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
        const participants = currentGameBlock.transactions.participants;
        const numParticipants = participants.length;
        const cardDispense = {};
        const remainDeck = this.chain.currentGameBlock.getLatestDeckHistory();
        const cards = [];

        for (let i = 0; i < numParticipants; i++) {
            while (cards.length < 2) {
                let cardCandidate = Math.floor(Math.random() * 100 % 20 + 1);
                if (cardCandidate in remainDeck) {
                    cards.push(cardCandidate);
                }
            }
            currentGameBlock.addTransaction("deckHistory", arrayDiff(remainDeck, cards));
            cardDispense[participants[i]] = cards;
            currentGameBlock.addTransaction("cardDispenseHistory", cardDispense);
        }

        let msg = "Cards are dispensed to ";
        for(let i = 0; i < numParticipants; i++) {
            msg += participants[i];
            if(i < numParticipants) {
                msg += ", ";
            }
        }
        console.log(msg);
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
