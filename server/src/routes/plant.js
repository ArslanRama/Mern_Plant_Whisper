const router = require('express').Router();
const Plant = require('../models/Plant');
const multer = require('multer');
//!  Multer Settings
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/images')
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() +'_'+ file.originalname)
    }
});
const upload = multer({storage});

router.post('/add', upload.single('plantPic'),(req, res)=>{
    //! Data from Client
    console.log(req.body, req.file)
    const newPlant = new Plant({
        name: req.body.name,
        plantPic: '/images/'+ req.file.filename
    })
    newPlant.save((err, doc)=>{
        res.json('A new plant has been added!')
    })
})

router.get('/all', (req, res)=>{
    Plant.find((err, plants)=>{
        res.json(plants)
    })
})

module.exports = router;