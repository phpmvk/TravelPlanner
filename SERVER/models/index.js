const url = require("./config");
const mongoose = require("mongoose");

mongoose.connect(url);

module.exports = mongoose;
