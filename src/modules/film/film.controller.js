const {promises: fsPromises} = require("fs");
const Film = require("./film.model");
const {validateAddFilm, validateGetFilmByQuery, validateAddFilmsFromFile} = require("../../utils/validateFilm");
const {validateObjectId} = require("../../utils/validateObjectId");
const {defineQuerySearch, readFromTxtFiles, filmsToCorrectTypeFromTxt, readFromJsonFiles} = require("./film.service");
const {BadRequestError, NotFoundError, AlreadyExistError} = require("../error/errors");

class FilmController {
  addFilm = async (req, res, next) => {
    try {
      const {body} = req;
      const error = validateAddFilm(body);
      if (error) {
        return res.status(400).json(error.details);
      }
      const isFilmExist = await Film.findOne(body);
      if (isFilmExist) {
        return res.status(409).json(AlreadyExistError);
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

  getFilmsByQuery = async (req, res, next) => {
    try {
      const {query, query: {title, star}} = req;
      const error = validateGetFilmByQuery(query);
      if (error) {
        return res.status(400).json(error.details);
      }
      const querySearch = defineQuerySearch(title, star)
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

  uploadFilmsFromFile = async (req, res, next) => {
    try {
      const {file} = req;
      let filmsFromFile;
      if (file.path.substr(-5, 5) === ".json") {
        filmsFromFile = await readFromJsonFiles(file.path);
      }
      else if (file.path.substr(-4, 4) === ".txt") {
        filmsFromFile = await readFromTxtFiles(file.path);
      }
      else {
        await fsPromises.unlink(file.path);
        return res.status(400).json({message: "Only .txt and json files"});
      }
      if (!filmsFromFile) {
        await fsPromises.unlink(file.path);
        return res.status(400).json({message: "Bad file"});
      }
      const films = (file.path.substr(-5, 5) === ".json") ? filmsFromFile :filmsToCorrectTypeFromTxt(filmsFromFile);
      const error = validateAddFilmsFromFile(films);
      if (error) {
        await fsPromises.unlink(file.path);
        return res.status(400).json(error.details);
      }
      const addedFilms = await Film.insertMany(films);
      await fsPromises.unlink(file.path);
      return res.status(201).json(addedFilms);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new FilmController();