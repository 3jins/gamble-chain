'use strict';
import Node from './Node';
import {checkTimeSpent} from "./utils/testBenches";

const nodeA = new Node('A', 3);
const nodeB = new Node('B', 3);

checkTimeSpent(
    () => nodeA.makeGameRoom(),
    nodeA.userID,
    "create a new game block"
).then(() => {
    checkTimeSpent(
        () => nodeB.join(),
        nodeB.userID,
        "join a game"
    );
});





