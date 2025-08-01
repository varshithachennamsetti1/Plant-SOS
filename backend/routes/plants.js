const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getAllPlants, getPlantById, createPlant } = require('../controllers/plantController');

// Add error handling middleware for multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

router.get('/', getAllPlants);
router.get('/:id', getPlantById);
router.post('/', upload.single('image'), multerErrorHandler, createPlant);

module.exports = router;
