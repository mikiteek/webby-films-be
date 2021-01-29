const mongoose = require("mongoose");
const Film = require("../modules/film/film.model");
const filmsData = require("../db/films");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, options);
    console.log(`Mongoose has connected to DB`);
    const countFilms = await Film.countDocuments();
    if (countFilms < 2) {
      await Film.insertMany(filmsData);
    }
  }
  catch (e) {
    console.log(e);
    process.exit(1);
  }
}

module.exports = databaseConnect;