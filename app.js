require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const Web3 = require('web3');
const AWSWebsocketProvider = require('@aws/web3-ws-provider');
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
const endpoint = process.env.AMB_WS_ENDPOINT;
const web3 = new Web3(new AWSWebsocketProvider(endpoint, { clientConfig: { credentials: credentials }}));

const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
  if (err) console.error(err);
});

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname) + '/public/html/index.html');
});

const handleTx = require('./utils/handleTx').handleTx;
subscription.on('data', (txHash) => {
  setTimeout(async () => {
    try {
      let tx = await web3.eth.getTransaction(txHash);
      if (tx >= await web3.eth.getGasPrice()) {
        const type = handleTx(tx);
        if(type !== null) {
          io.emit('newTx', tx, type);
        }
      }
    }
    catch (err) {
      console.error(err);
    }
  });
});



io.on('connection', (socket) => {
  console.log('user has connected to web server');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('Web server started at port 3000; http://localhost:3000/');
});