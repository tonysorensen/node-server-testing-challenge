const db = require('../data/db-config')

function getAll(){
    return db('blackholes')
}

module.exports = {getAll}