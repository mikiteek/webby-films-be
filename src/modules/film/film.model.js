const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");
const {Schema} = mongoose;

const filmSchema = new Schema({
  title: String,
  releaseYear: Number,
  format: String,
  stars: [{ type: String }],
});

filmSchema.plugin(mongoosePagination);

async function findByTitle(queryString, options) {
  const query = queryString
    ? {title: {"$regex": queryString, "$options": "i"}}
    : {};
  return this.paginate(query, options);
}

filmSchema.statics.findByQuery = findByTitle;

module.exports = mongoose.model("Film", filmSchema);