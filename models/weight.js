const mongoose = require('mongoose');

const { Schema } = mongoose;

const WeightSchema = new Schema({
  weight: String,
  reps: Number,
  created: { type: Date, default: Date.now },
});

const Weight = mongoose.model('Weight', WeightSchema);

module.exports = Weight;
