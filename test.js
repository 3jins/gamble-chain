'use strict';
import MiningNode from './MiningNode';
import GamblingNode from './GamblingNode';
import {checkTimeSpent} from "./utils/TestBenches";

const difficulty = 3;
const miningNodeA = new MiningNode('mA', difficulty);
const gamblingNodeA = new GamblingNode('gA');
const gamblingNodeB = new GamblingNode('gB');
const nodeList = [miningNodeA, gamblingNodeA, gamblingNodeB];

checkTimeSpent(
    () => miningNodeA.makeGameRoom(),
    miningNodeA.userID,
    "create a genesis block"
).then(() => {
    checkTimeSpent(
        () => miningNodeA.makeGameRoom(),
        miningNodeA.userID,
        "create a new game block"
    )
}).then(() => {
    miningNodeA.propagateChainTemp(nodeList);
}).then(() => {
    gamblingNodeA.joinGame();
}).then(() => {
    gamblingNodeA.propagateChainTemp(nodeList);
}).then(() => {
    gamblingNodeB.joinGame();
}).then(() => {
    gamblingNodeB.propagateChainTemp(nodeList);
}).then(() => {
    console.log(gamblingNodeB.chain.chain.length);
    for(let i=0; i<gamblingNodeB.chain.chain.length; i++) {
        console.log(gamblingNodeB.chain.chain[i]);
    }
});

// import RSAKeyGenerator from "./utils/RSAKey";
//
// const rsaKey = new RSAKeyGenerator();
// const a = rsaKey.encrypt("abc");
// console.log(a);
// const b = rsaKey.getKeyPair();
// console.log(b);

// const c = rsaKey.getPublicKey();
// console.log(c);
