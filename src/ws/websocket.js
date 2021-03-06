const WebSocket = require('ws');
const ws_port = process.env.WS_PORT || 3030;
const moment = require('moment');

const socketServer = new WebSocket.Server({
    port: ws_port 
});

socketServer.on("listening", () => {
    console.log(`Listening WS  : ws://localhost:${ws_port}`);
});

const bemvindo = {
    username: "Bot",
    message : "Hello all",
    time: null
};

const messages = [];

socketServer.on('connection', (socketClient) => {
    console.log('connected');
    console.log('Number of clients: ', socketServer.clients.size);

    bemvindo.time = moment().format('DD/MM/YYY HH:mm:ss');

    socketClient.send(JSON.stringify([bemvindo]));

    socketClient.on('message', (message) => {

        messageData = (JSON.parse(message)).pop();
        messageData.time = moment().format('DD/MM/YYY HH:mm:ss');
        messages.push(
            messageData
        );

        socketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify([messageData]));
            }
        });
    });

    socketClient.on('close', (socketClient) => {
        console.log('Bye Client');
    });

});

module.exports = socketServer;