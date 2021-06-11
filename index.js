const server = require("./api/server.js");

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.json({ message: "Life, the Universe, and Everything" });
});

server.listen(PORT, () => {
  console.log(`\n*** Server running on port ${PORT} ***\n`);
});
