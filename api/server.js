// implement your server here
const express = require('express');
const server = express();

server.use(express.json());

// require your posts router and connect it here
const postRouter = require('./posts/posts-router');

// Routes
server.use('/api/posts', postRouter);

module.exports = server;