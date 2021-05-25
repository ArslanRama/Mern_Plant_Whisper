const router = require('express').Router();
const Plant = require('../models/Plant');
const multer = require('multer');
//!  Multer Settings
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname)
    }
});

const upload = multer({ storage });
//! add one plant to DB
router.post('/add', upload.single('plantPic'), (req, res) => {
    //! Data from Client
    console.log(req.body, req.file)
    const newPlant = new Plant({
        name: req.body.name,
        plantOrigin: req.body.plantOrigin,
        plantPic: '/images/' + req.file.filename,
        // todo: this id should come from session or user login or req.body
        added_by: '60acff09ae55b6da5a7800cf'
    })
    newPlant.save((err, doc) => {
        console.log(doc);
        res.json('Congratulations! You have added your plant to our gallery!')
    })
})
//! find all plants
router.get('/all', (req, res) => {
    Plant.find((err, plants) => {
        console.log(plants)
        res.json(plants)
    }).populate('added_by')
})

router.get('/detail/:id', (req, res) => {
    Plant.findById(req.params.id, (err, doc) => {
        res.json(doc)
    })
})

//! update one plant data
router.post('/update', (req, res) => {
    Plant.findByIdAndUpdate(req.body.id, req.body, (req, res) => {
        // todo
    })
})

//! delete the plant
const deletePlant = (req, res) => {
    const plantId = req.body.removePlantId;
    console.log(plantId);
    Plant.findByIdAndDelete(plantId, (err, doc) => {
        console.log("The picture is successfully deleted:", doc);
    });
};
router.post("/delete/:id", deletePlant);

router.get('/all', (req, res) => {
    Plant.find((err, plants) => {
        res.json(plants)
    })
})

module.exports = router;