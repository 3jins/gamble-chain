import Node from './Node';
import {compareArray} from './utils/ArrayUtills';
import {nodeStore as nodes} from './test/CentralNodeStore';

export default class GamblingNode extends Node {
    constructor(userID) {
        super(userID);
    }

    /* Find the optimum game block.
     * params: none
     * return: block index
     *
     * -- logic --
     * 1. Find a block that the least number of people are participating.
     * 2. If there are multiple blocks that have same number of participants, choose the block made earlier.
     * 3. If every block is full(has 10 participants), return -1.
     */
    findGame = () => {
        const blockChain = this.chain;
        const chain = blockChain.chain;
        const chainLength = chain.length;
        let leastNumParticipants = 0;
        let leastCrowdedGameBlockIdx = 0;

        for (let i = 1; i < chainLength; i++) {
            if (leastCrowdedGameBlockIdx > chain[i].getNumParticipants)
                leastNumParticipants = chain[i].getNumParticipants;
            leastCrowdedGameBlockIdx = i;
        }

        if (leastNumParticipants >= 9) return -1;
        return leastCrowdedGameBlockIdx;
    };

    joinGame = () => {
        const blockChain = this.chain;
        const chain = blockChain.chain;
        const gameIdx = this.findGame();
        if (gameIdx < 0) {
            console.log("Every gameblock is full.");
            return;
        }
        blockChain.currentGameBlock = chain[gameIdx];
        blockChain.currentGameBlock.addTransaction("participants", this.userID);
        console.log(this.userID + " joined a game block. (game index: " + gameIdx + ")");
    };

    checkUnanimityGameStart = () => {
        const blockChain = this.chain;
        const gameStartPolls = blockChain.currentGameBlock.transactions.gameStartPolls;
        const participants = blockChain.currentGameBlock.transactions.participants;

        return participants.length >= 2 && compareArray(gameStartPolls, participants, false);
    };

    suggestGameStart = () => {
        const blockChain = this.chain;
        blockChain.currentGameBlock.addTransaction("gameStartPolls", this.userID);
        console.log(this.userID + " suggested start the game.");
        if (this.checkUnanimityGameStart()) {
            console.log("Every node in this gameblock agreed to start the game.");
            const gameBlockMiner = blockChain.currentGameBlock.miner;
            nodes[gameBlockMiner].dispenseCards(blockChain.currentGameBlock);
        }
    };

    /* Add a betting record to the game block. */
    betStakes = (stake) => {
        const blockChain = this.chain;
        if (blockChain.currentGameBlock === null) return false;

        const bettingRecord = {};
        bettingRecord[this.userID] = stake;
        blockChain.currentGameBlock.addTransaction("bettingHistory", bettingRecord);

        console.log(this.userID + " bet! ($" + stake + ")");
    };
}
