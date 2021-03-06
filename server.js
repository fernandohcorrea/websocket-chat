const loadenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routerAPI = require('./src/routes/api.js');
const socketServer = require('./src/ws/websocket');

const port = process.env.PORT || 8181;


const WebSocket = require('ws');
const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api', routerAPI);

app.listen(port, () => {
    console.log(`Listening HTTP: http://localhost:${port}`);
});

