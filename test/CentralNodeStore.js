'use strict';
import MiningNode from '../MiningNode';
import GamblingNode from '../GamblingNode';

const difficulty = 3;
const miningNodeA = new MiningNode('mA', difficulty);
const gamblingNodeA = new GamblingNode('gA');
const gamblingNodeB = new GamblingNode('gB');

const makeNodeStore = (numMnodes, numGnodes) => {
    const nodeStore = {};
    for(let i=0; i<numMnodes; i++) {
        const nodeName = 'm' + i;
        nodeStore[nodeName] = new MiningNode(nodeName, difficulty);
    }
    for(let i=0; i<numGnodes; i++) {
        const nodeName = 'g' + i;
        nodeStore[nodeName] = new GamblingNode(nodeName, difficulty);
    }

    return nodeStore;
};

const nodeStore = makeNodeStore();
console.log(nodeStore);

// export {nodeStore};
//
// 'use strict';
// import MiningNode from '../MiningNode';
// import GamblingNode from '../GamblingNode';
//
// const difficulty = 3;
// const miningNodeA = new MiningNode('mA', difficulty);
// const gamblingNodeA = new GamblingNode('gA');
// const gamblingNodeB = new GamblingNode('gB');
//
//
//
// const nodeStore = {
//     'mA': miningNodeA,
//     'gA': gamblingNodeA,
//     'gB': gamblingNodeB,
// };
//
// export {nodeStore};
//
