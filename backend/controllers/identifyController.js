const Plant = require('../models/plant');

const identifyPlant = async (req, res) => {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const answers = req.body.answers || {};

    // Pick a random plant from DB
    const plants = await Plant.find();
    if (plants.length === 0) {
      return res.status(404).json({ error: 'No plants in database' });
    }
    const randomPlant = plants[Math.floor(Math.random() * plants.length)];

    // Adjust healthStatus based on answers
    let healthStatus = 'healthy';
    if (answers.symptoms && answers.symptoms.length > 0) {
      healthStatus = 'warning';
    }
    const frequencyCheck = (answers.wateringFrequency || '').toLowerCase();
    if (frequencyCheck.includes('daily') && !frequencyCheck.includes('outdoor')) {
      healthStatus = 'warning';
    }

    const identifiedPlant = {
      ...randomPlant.toObject(),
      healthStatus,
      nextWatering: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
    };

    res.json(identifiedPlant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  identifyPlant
};
