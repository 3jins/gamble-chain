'use strict';
import Block from './Block';
import BlockChain from './BlockChain';
import readln from 'readline';
const rl = readln.createInterface( process.stdin, process.stdout );

const chain = new BlockChain();
let executionLoop = true;

const promptInput = (prompt, handler) => {
    rl.question(prompt, input => {
        if (handler(input) !== false)
            promptInput(prompt, handler);
        else
            rl.close();
    });
};

const mine = () => {
    chain.addBlock(new Block);
};

const createTransaction = (transaction) => {
    chain.addTr
};


/* main procedure from here */

chain.createGenesisBlock();

while (executionLoop) {
    promptInput('gamble chain > ', input => {
        switch(input) {
            case 'mine':
                mine();
                break;
            case 'createTransaction':
                break;
            case 'exit':
                executionLoop = false;
                break;
            default:
                console.log("There is no command \'" + input + "\'");
        }
    });
}