const express = require("express");
const router = require("./router");
const cors = require("cors");

const PORT = 3001;

const app = new express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () =>
  console.log(`server is listenning on http://localhost:${PORT}`)
);
