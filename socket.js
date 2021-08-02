const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
});

module.exports = { server, io };
