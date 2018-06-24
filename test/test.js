'use strict';
import {nodeStore as nodes} from "./CentralNodeStore";
import {checkTimeSpent} from "../utils/TestBenches";

// const nodeList = [miningNodeA, gA, gB];

checkTimeSpent(
    () => nodes.mA.makeGameRoom(),
    nodes.mA.userID,
    "create a genesis block and a new game block"
).then(() => {
    nodes.mA.propagateNewBlock();
}).then(() => {
    nodes.gA.joinGame();
}).then(() => {
    nodes.gA.propagateNewTransaction();
}).then(() => {
    nodes.gB.joinGame();
}).then(() => {
    nodes.gB.propagateNewTransaction();
}).then(() => {
    nodes.gA.betStakes("1000");
}).then(() => {
    nodes.gA.propagateNewTransaction();
}).then(() => {
    console.log(nodes.gB.chain.chain.length);
    for (let i = 0; i < nodes.gB.chain.chain.length; i++) {
        console.log(nodes.gB.chain.chain[i]);
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
