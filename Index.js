'use strict';
import Node from './Node';
import readLine from 'readline';

const node = new Node('A');
const rl = readLine.createInterface( process.stdin, process.stdout );
let executionLoop = true;

const promptInput = (prompt, handler) => {
    rl.question(prompt, input => {
        if (handler(input) !== false)
            promptInput(prompt, handler);
        else
            rl.close();
    });
};

while (executionLoop) {
    promptInput('gamble chain > ', input => {
        switch(input) {
            case 'make':
                node.makeGameRoom();
                break;
            case 'join':
                node.join();
                break;
            case 'exit':
                executionLoop = false;
                break;
            default:
                console.log("There is no command \'" + input + "\'");
        }
    });
}