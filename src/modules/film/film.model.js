const mongoose = require("mongoose");
const {Schema} = mongoose;

const filmSchema = new Schema({
  title: String,
  releaseYear: Number,
  format: String,
  stars: [{ type: String }],
});

module.exports = mongoose.model("Film", filmSchema);