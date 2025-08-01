const Plant = require('../models/plant');

const getAllPlants = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { scientificName: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) {
      filter.category = category;
    }
    const plants = await Plant.find(filter);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPlant = async (req, res) => {
  try {
    const {
      name,
      scientificName,
      category,
      image,
      wateringFrequency,
      sunlight,
      temperature,
      isFlowering,
      nextWatering,
      healthStatus
    } = req.body;

    const newPlant = new Plant({
      name,
      scientificName,
      category,
      image,
      wateringFrequency,
      sunlight,
      temperature,
      isFlowering,
      nextWatering,
      healthStatus
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllPlants,
  getPlantById,
  createPlant
};
