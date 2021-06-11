const express = require("express");
const cors = require("cors");
const Blackholes = require("./blackholes/blackhole_model");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res, next) => {
  Blackholes.getAll()
    .then((blackholes) => {
      res.status(200).json(blackholes);
    })
    .catch(next);
});
server.get("/:id", (req, res, next) => {
  Blackholes.getById(req.params.id)
    .then((blackhole) => {
      res.json(blackhole);
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  Blackholes.insert(req.body)
    .then((blackhole) => {
      if (blackhole) {
        res.json(blackhole);
      } else {
        res.status(404).json({ message: "Black hole not found" });
      }
    })
    .catch(next);
});

server.delete("/:id", (req, res, next) => {
  Blackholes.remove(req.params.id)
    .then((result) => {
      if (result) {
        res.json({ message: "Successfully removed black hole" });
      } else {
        res.status(404).json({ message: "Black hole not found" });
      }
    })
    .catch(next);
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
