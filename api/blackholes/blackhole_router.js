const router = require("express").Router();
const Blackholes = require('./blackhole_model');


// "/" is "/api/blackholes"  see server.js


router.get("/", (req,res,next)=>{
    Blackholes.getAll()
    .then(blackholes => {
        res.status(200).json(blackholes)
    })
    .catch(next)
})
router.get("/:id",(req,res,next)=>{
    Blackholes.getById(req.params.id)
    .then(blackhole =>{
        res.json(blackhole);
    })
    .catch(next)
})

router.post("/",(req,res,next)=>{
    Blackholes.insert(req.body).then(blackhole=>{
        if (blackhole){
            res.json(blackhole)
        }else{
            res.status(404).json({message: "Black hole not found"})
        }
    })
    .catch(next)
})

//router.put("",()=>{})

router.delete("/:id",(req,res,next)=>{
    Blackholes.remove(req.params.id).then(result=>{
        if(result){
            res.json({message: "Succesfully removed black hole"})
        }else{
        res.status(404).json({message: "Black hole not found"})
    }
})
.catch(next)

})

module.exports = router