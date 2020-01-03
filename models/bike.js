const mongoose = require("mongoose");

const { Schema } = mongoose;

// schema for recording bike info
const BikeSchema = new Schema({
  distance: String,
  minutes: Number,
  seconds: Number,
  created: { type: Date, default: Date.now }
});

const Bike = mongoose.model("Bike", BikeSchema);

module.exports = Bike;
