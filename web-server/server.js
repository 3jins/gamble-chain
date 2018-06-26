import express from 'express';
import path from 'path';

const app = express();
const port = 80;
const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
app.get('/*', (req,res) => {
    res.sendFile(path.resolve(publicPath, "./index.html"));
});

app.listen(port, () => {
    console.log('Express listening on port', port);
});
