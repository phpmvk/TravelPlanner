const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const http = require('http');

const PORT = process.env.PORT || 3001;

const app = new express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server is listenning on http://localhost:${PORT}`);
});

module.exports = { server, app };
