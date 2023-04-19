const mongoose = require("./index");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  StartActivity: Date,
  EndActivity: Date,
  DepCity: String,
  ArrCity: String,
  Price: Number,
  ActivityType: String,
  AdditionalInfo: String,
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
