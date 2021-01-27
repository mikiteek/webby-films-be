const Film = require("./film.model");
const {validateAddFilm} = require("../../utils/validateFilm");
const {BadRequestError} = require("../error/errors");

class FilmController {
  addFilm = async (req, res, next) => {
    try {
      const {body} = req;
      const error = validateAddFilm(body);
      if (error) {
        return res.status(400).json(error.details);
      }
      const film = new Film(body);
      await film.save();
      return res.status(201).json(film);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new FilmController();