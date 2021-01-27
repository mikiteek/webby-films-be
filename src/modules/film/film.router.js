const {Router} = require("express");

const filmRouter = Router();
const filmController = require("./film.controller");
const uploadFiles = require("../../utils/uploadFiles");

filmRouter.post(
  "/",
  filmController.addFilm,
);

filmRouter.delete(
  "/:id",
  filmController.removeFilm,
);

filmRouter.get(
  "/",
  filmController.getSortedListFilms,
);

filmRouter.get(
  "/search",
  filmController.getFilmsByQuery,
);

filmRouter.get(
  "/:id",
  filmController.getFilmInfo,
);

filmRouter.post(
  "/upload",
  // uploadFiles.single("films"),
  filmController.uploadFilmsFromFile,
);

module.exports = filmRouter;