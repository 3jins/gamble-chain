import Node from './Node';

export default class GamblingNode extends Node {
    constructor(userID) {
        super(userID);
    }

    joinGame = () => {
        this.chain.joinGame(this.userID);
    };

    suggestGameStart = () => {
        this.chain.suggestGameStart(this.userID);
    };

    betStakes = (stake) => {
        this.chain.betStakes(this.userID, stake);
    };
}
