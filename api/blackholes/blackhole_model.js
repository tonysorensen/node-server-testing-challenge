const db = require("../../data/dbConfig");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db("blackholes");
}
function getById(id) {
  return null;
}

async function insert(blackhole) {
  const [id] = await db("blackholes").insert(blackhole, ["id", "name"]);
  return db("blackholes").where("id", id).first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}
