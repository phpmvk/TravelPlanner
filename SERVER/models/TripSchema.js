const mongoose = require("./index");
const { Schema } = mongoose;

const TripSchema = new Schema({
  Name: String,
  User: String,
  DepCity: String,
  ArrCity: String,
  Budget: Number,
  Duration: Number,
  Activities: [{ type: Schema.Types.Mixed }],
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
