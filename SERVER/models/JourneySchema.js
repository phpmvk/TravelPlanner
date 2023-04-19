const mongoose = require("./index");
const { Schema } = mongoose;

const JourneySchema = new Schema({
  StartJourney: Date,
  EndJourney: Date,
  DepCity: String,
  ArrCity: String,
  Price: Number,
  TransportType: String,
});

const Journey = mongoose.model("Journey", JourneySchema);

module.exports = Journey;
