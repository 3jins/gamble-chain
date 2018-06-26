import express from 'express';
import path from 'path';

import {nodeStore as nodes, makeNodeStore} from "../test/CentralNodeStore";

const app = express();
const port = 80;
const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
app.get('/select-node', (req, res) => {
    const numMnode = req.param('numMnode');
    const numGnode = req.param('numGnode');
    makeNodeStore(numMnode, numGnode);
    console.log(nodes);
    res.sendFile(path.resolve(publicPath, "./select-node.html"), {});
});
app.get('/*', (req,res) => {
    res.sendFile(path.resolve(publicPath, "./index.html"));
});

app.listen(port, () => {
    console.log('Express listening on port', port);
});
