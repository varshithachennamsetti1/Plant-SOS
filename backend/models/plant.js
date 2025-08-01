const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String },
  category: { type: String },
  image: { type: String },
  wateringFrequency: { type: String, required: true },
  sunlight: { type: String },
  temperature: { type: String },
  isFlowering: { type: Boolean },
  nextWatering: { type: Date },
  healthStatus: { type: String, enum: ['healthy', 'warning', 'unhealthy'] },
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
