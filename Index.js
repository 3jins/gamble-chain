'use strict';
import Node from './Node';
import readLine from 'readline';

const node = new Node('A', 3);
const rl = readLine.createInterface( process.stdin, process.stdout );

const promptInput = (prompt, handler) => {
    rl.question(prompt, input => {
        if(handler(input) !== false)
            promptInput(prompt, handler);
        else
            rl.close();
    });
};

promptInput('gamble chain > ', input => {
    switch(input) {
        case 'make':
            node.makeGameRoom();
            break;
        case 'join':
            node.joinGame();
            break;
        case 'exit':
            return false;
        default:
            console.log("There is no command \'" + input + "\'");
    }
    return true;
});
