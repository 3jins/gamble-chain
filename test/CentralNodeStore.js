'use strict';
import MiningNode from '../MiningNode';
import GamblingNode from '../GamblingNode';

const difficulty = 3;
const miningNodeA = new MiningNode('mA', difficulty);
const gamblingNodeA = new GamblingNode('gA');
const gamblingNodeB = new GamblingNode('gB');

const nodeStore = {
    'mA': miningNodeA,
    'gA': gamblingNodeA,
    'gB': gamblingNodeB,
};

export {nodeStore};
