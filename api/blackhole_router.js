const router = require("express").Router();
const Blackholes = require('./blackhole_model');

router.get("/", (req,res,next)=>{
    Blackholes.getAll()
    .then(blackholes => {
        res.status(200).json(blackholes)
    })
    .catch(next)
})

module.exports = router