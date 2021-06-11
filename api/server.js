const express = require("express");
const cors = require("cors");
const blackholeRouter = require("./blackhole_router");
const server = express();

server.use(express.json());
server.use(cors());



server.get("/", (req, res) => {
  res.json({ message: "Life, the Universe, and Everything" })
});


server.use("/api/blackholes", blackholeRouter);
server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
