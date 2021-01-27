const Film = require("./film.model");
const {validateAddFilm, validateGetByTitleFilms, validateGetByStarFilms} = require("../../utils/validateFilm");
const {validateObjectId} = require("../../utils/validateObjectId");
const {BadRequestError, NotFoundError} = require("../error/errors");

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

  removeFilm = async (req, res, next) => {
    try {
      const {params: {id}} = req;
      const valid = validateObjectId(id);
      if (!valid) {
        return res.status(400).json(BadRequestError);
      }
      const filmRemoved = await Film.findByIdAndRemove(id);
      if (!filmRemoved) {
        return res.status(204).json(NotFoundError);
      }
      return res.status(200).json(filmRemoved);
    }
    catch (error) {
      next(error);
    }
  }

  getFilmInfo = async (req, res, next) => {
    try {
      const {params: {id}} = req;
      const valid = validateObjectId(id);
      if (!valid) {
        return res.status(400).json(BadRequestError);
      }
      const film = await Film.findById(id);
      if (!film) {
        return res.status(404).json(NotFoundError);
      }
      return res.status(200).json(film);
    }
    catch (error) {
      next(error);
    }
  }

  getSortedListFilms = async (req, res, next) => {
    try {
      const films = await Film.find({}, null, {sort: {title: "asc"}});
      return res.status(200).json(films);
    }
    catch (error) {
      next(error);
    }
  }

  getFilmsByTitle = async (req, res, next) => {
    try {
      const {query, query: {title}} = req;
      const error = validateGetByTitleFilms(query);
      if (error) {
        return res.status(400).json(error.details);
      }
      const querySearch = title ? {title: {"$regex": title, "$options": "i"}}: {};
      const films = await Film.find(querySearch, null, {sort: {title: "asc"}});
      if (!films.length) {
        return res.status(404).json(NotFoundError);
      }
      return res.status(200).json(films);
    }
    catch (error) {
      next(error);
    }
  }

  getFilmByStar = async (req, res, next) => {
    try {
      const {query, query: {star}} = req;
      const error = validateGetByStarFilms(query);
      if (error) {
        return res.status(400).json(error.details);
      }
      const querySearch = star ? {stars: {"$regex": star, "$options": "i"}}: {};
      const films = await Film.find(querySearch, null, {sort: {title: "asc"}});
      if (!films.length) {
        return res.status(404).json(NotFoundError);
      }
      return res.status(200).json(films);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new FilmController();