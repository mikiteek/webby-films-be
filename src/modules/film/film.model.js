const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const {Schema, ObjectId} = mongoose;

const filmSchema = new Schema({
  title: String,
  releaseYear: Number,
  format: String,
  stars: [{ type: String }],
});

filmSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Film", filmSchema);