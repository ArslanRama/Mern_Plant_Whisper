const router = require('express').Router();
const Plant = require('../models/Plant');
const multer = require('multer');
//!  Multer Settings
const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, 'public/images')
    },
    filename: (req, file, callback)=> {
        callback(null, Date.now() +'_'+ file.originalname)
    }
});

const upload = multer({storage});

router.post('/add', upload.single('plantPic'),(req, res)=>{
    //! Data from Client
    console.log(req.body, req.file)
    const newPlant = new Plant({
        name: req.body.name,
        plantPic: 'public/images/'+ req.file.filename
    })
    newPlant.save((err, doc)=>{
        res.json('A new plant has been added!')
    })
})

//! delete the plant
const deletePlant = (req, res) => {
    const plantId = req.body.removePlantId;
    console.log(plantId);
    Plant.findByIdAndDelete(plantId, (err, doc) => {
      console.log("Item is successfully deleted:", doc);
    });
  };
router.post("/delete/:id", deletePlant);

router.get('/all', (req, res)=>{
    Plant.find((err, plants)=>{
        res.json(plants)
    })
})

module.exports = router;